import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Payment from "@/models/Payment";
import Booking from "@/models/Booking";
import {
  verifyPayment,
  type EsewaCallback,
} from "@/services/payments/payment.service";
import dbConnect from "@/lib/mongodb";

const logPayment = (stage: string, fields: Record<string, unknown>) => {
  if (process.env.NODE_ENV !== "production")
    console.info(`[eSewa] ${stage}`, fields);
};

const decodeBase64Json = (value: string) => {
  const normalized = value.replace(/ /g, "+").trim();
  if (!normalized) return undefined;
  try {
    const decoded = Buffer.from(normalized, "base64").toString("utf8").trim();
    if (!decoded) return undefined;
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return undefined;
  }
};

const toRecord = (
  source: URLSearchParams | FormData | Record<string, unknown>,
) => {
  if (source instanceof URLSearchParams)
    return Object.fromEntries(source.entries()) as Record<string, unknown>;
  if (source instanceof FormData)
    return Object.fromEntries(source.entries()) as Record<string, unknown>;
  return source;
};

const getString = (sources: Record<string, unknown>[], keys: string[]) => {
  for (const source of sources) {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }
  return undefined;
};

const normalizeCallbackPayload = (sources: Record<string, unknown>[]) => {
  const payload: EsewaCallback = {};
  const status = getString(sources, [
    "status",
    "payment_status",
    "transaction_status",
  ]);
  const transactionUuid = getString(sources, [
    "transaction_uuid",
    "transactionUuid",
    "transaction_id",
    "transactionId",
    "oid",
    "pidx",
  ]);
  const transactionCode = getString(sources, [
    "transaction_code",
    "transactionCode",
    "ref_id",
    "tref",
    "tid",
  ]);
  const totalAmount = getString(sources, ["total_amount", "amount", "amt"]);
  const productCode = getString(sources, [
    "product_code",
    "productCode",
    "pid",
  ]);
  const signedFieldNames = getString(sources, [
    "signed_field_names",
    "signedFieldNames",
  ]);
  const signature = getString(sources, ["signature"]);

  if (status) payload.status = status;
  if (transactionUuid) payload.transaction_uuid = transactionUuid;
  if (transactionCode) payload.transaction_code = transactionCode;
  if (totalAmount) payload.total_amount = totalAmount;
  if (productCode) payload.product_code = productCode;
  if (signedFieldNames) payload.signed_field_names = signedFieldNames;
  if (signature) payload.signature = signature;

  return payload;
};

const complete = async (request: Request) => {
  let returnEventId: string | undefined;
  try {
    const url = new URL(request.url);
    const queryParams = toRecord(url.searchParams);
    const bodySources: Record<string, unknown>[] = [];
    let rawText = "";

    if (request.method === "POST") {
      try {
        bodySources.push(toRecord(await request.clone().formData()));
      } catch {
        // Ignore non-form payloads and fall back to raw text parsing.
      }

      try {
        rawText = await request.clone().text();
      } catch {
        rawText = "";
      }

      const trimmed = rawText.trim();
      if (trimmed) {
        const decodedJson = decodeBase64Json(trimmed);
        if (decodedJson) {
          bodySources.push(decodedJson);
        } else {
          try {
            bodySources.push(JSON.parse(trimmed) as Record<string, unknown>);
          } catch {
            const queryLike = toRecord(new URLSearchParams(trimmed));
            if (Object.keys(queryLike).length > 0) bodySources.push(queryLike);
            else bodySources.push({ data: trimmed });
          }
        }
      }
    }

    const sources = [queryParams, ...bodySources];
    const dataCandidate = getString(sources, [
      "data",
      "payload",
      "callback",
      "esewaData",
    ]);
    const decodedData = dataCandidate
      ? (decodeBase64Json(dataCandidate) ??
        (() => {
          try {
            return JSON.parse(dataCandidate) as Record<string, unknown>;
          } catch {
            return undefined;
          }
        })())
      : undefined;
    const callbackPayload = normalizeCallbackPayload(
      decodedData ? [queryParams, ...bodySources, decodedData] : sources,
    );
    const paymentId = getString(sources, [
      "paymentId",
      "payment_id",
      "payment",
    ]);
    const transactionUuid =
      callbackPayload.transaction_uuid ??
      getString(sources, [
        "transaction_uuid",
        "transactionUuid",
        "transaction_id",
        "transactionId",
        "oid",
        "pidx",
      ]);
    const serializedCallback =
      Object.keys(callbackPayload).length > 0
        ? Buffer.from(JSON.stringify(callbackPayload)).toString("base64")
        : undefined;

    logPayment("callback request", {
      method: request.method,
      path: url.pathname,
      queryKeys: [...url.searchParams.keys()],
      bodyKeys: bodySources.flatMap((source) => Object.keys(source)),
      paymentId,
      transactionUuid,
      hasCallbackData: Boolean(serializedCallback),
    });

    await dbConnect();
    const payment =
      paymentId && Types.ObjectId.isValid(paymentId)
        ? await Payment.findById(paymentId).exec()
        : transactionUuid
          ? await Payment.findOne({ transactionId: transactionUuid }).exec()
          : null;
    if (!payment) throw new Error("Payment record was not found.");
    if (!payment.booking) throw new Error("Payment has no associated booking.");
    const booking = await Booking.findById(payment.booking)
      .select("event")
      .lean()
      .exec();
    if (!booking?.event) throw new Error("Booking has no associated event.");
    const eventId = booking.event.toString();
    returnEventId = eventId;

    logPayment("callback payment resolved", {
      paymentId: payment._id.toString(),
      bookingId: payment.booking?.toString(),
      eventId,
      transactionUuid: transactionUuid ?? payment.transactionId,
    });
    await verifyPayment(
      payment._id.toString(),
      serializedCallback,
      transactionUuid ?? undefined,
    );
    return NextResponse.redirect(
      new URL(
        `/booknow?eventId=${eventId}&paymentId=${payment._id}&settled=1`,
        request.url,
      ),
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Payment verification failed.";
    logPayment("callback failed", { error: errorMsg });
    const params = new URLSearchParams({ paymentError: errorMsg });
    if (returnEventId) params.set("eventId", returnEventId);
    return NextResponse.redirect(
      new URL(`/booknow?${params.toString()}`, request.url),
    );
  }
};

export async function POST(request: Request) {
  return complete(request);
}

export async function GET(request: Request) {
  return complete(request);
}
