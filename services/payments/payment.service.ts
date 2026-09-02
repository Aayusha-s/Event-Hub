import { createHmac, randomUUID } from "crypto";
import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Payment, { IPayment } from "@/models/Payment";
import { bookingService } from "@/services/bookings/booking.service";
import { HttpError } from "@/utils/api/httpError";

export interface InitiatePaymentInput {
  bookingId: string;
  paymentMethod: IPayment["paymentMethod"];
}
const logPayment = (stage: string, fields: Record<string, unknown>) => {
  if (process.env.NODE_ENV !== "production")
    console.info(`[eSewa] ${stage}`, fields);
};
const normalizedAmount = (value: number | string) =>
  Number(Number(value).toFixed(2));
export const initiatePayment = async (
  userId: Types.ObjectId | string,
  input: InitiatePaymentInput,
) => {
  await dbConnect();
  const user = new Types.ObjectId(userId);
  if (!Types.ObjectId.isValid(input.bookingId))
    throw new HttpError(400, "bookingId is invalid.", "VALIDATION_ERROR");
  const booking = await Booking.findById(input.bookingId).exec();
  if (!booking) throw new HttpError(404, "Booking not found.", "NOT_FOUND");
  if (booking.user.toString() !== user.toString())
    throw new HttpError(403, "Forbidden.", "FORBIDDEN");
  if (booking.status !== "pending")
    throw new HttpError(
      409,
      "This booking cannot be paid.",
      "BOOKING_NOT_PENDING",
    );
  const existing = await Payment.findOne({
    booking: booking._id,
    paymentStatus: "pending",
  }).exec();
  if (existing) await existing.deleteOne();
  const payment = await Payment.create({
    user,
    event: booking.event,
    booking: booking._id,
    amount: booking.totalAmount,
    paymentMethod: input.paymentMethod,
    paymentStatus: "pending",
  });
  const callbackUrl = new URL(
    "/api/payments/esewa/callback",
    process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  );
  callbackUrl.searchParams.set("paymentId", payment._id.toString());
  callbackUrl.searchParams.set("eventId", booking.event.toString());
  const code = process.env.ESEWA_PRODUCT_CODE?.trim(),
    key = process.env.ESEWA_SECRET_KEY?.trim();
  if (!code || !key)
    throw new HttpError(
      503,
      "eSewa UAT sandbox is not configured. Set ESEWA_PRODUCT_CODE and ESEWA_SECRET_KEY.",
      "PAYMENT_NOT_CONFIGURED",
    );
  const transactionUuid = randomUUID(),
    total = booking.totalAmount.toFixed(2),
    signature = createHmac("sha256", key)
      .update(
        `total_amount=${total},transaction_uuid=${transactionUuid},product_code=${code}`,
      )
      .digest("base64");
  payment.transactionId = transactionUuid;
  payment.metadata = { productCode: code };
  await payment.save();
  logPayment("payment created", {
    bookingId: booking._id.toString(),
    paymentId: payment._id.toString(),
    transactionUuid,
    amount: total,
    productCode: code,
    callbackUrl: callbackUrl.toString(),
  });
  return {
    paymentId: payment._id.toString(),
    paymentMethod: "esewa" as const,
    paymentUrl:
      process.env.ESEWA_PAYMENT_URL?.trim() ||
      "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
    formData: {
      amount: total,
      tax_amount: "0",
      total_amount: total,
      transaction_uuid: transactionUuid,
      product_code: code,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: callbackUrl.toString(),
      failure_url: callbackUrl.toString(),
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    },
  };
};
export type EsewaCallback = {
  status?: string;
  transaction_uuid?: string;
  transaction_code?: string;
  total_amount?: string | number;
  product_code?: string;
  signed_field_names?: string;
  signature?: string;
  [key: string]: unknown;
};
const decodeCallback = (data: string): EsewaCallback => {
  const normalized = data.replace(/ /g, "+").trim();
  if (!normalized) throw new Error("Empty eSewa callback payload.");
  if (normalized.startsWith("{"))
    return JSON.parse(normalized) as EsewaCallback;
  try {
    return JSON.parse(
      Buffer.from(normalized, "base64").toString("utf8"),
    ) as EsewaCallback;
  } catch {
    return JSON.parse(normalized) as EsewaCallback;
  }
};

export const verifyPayment = async (
  paymentId: string,
  esewaData?: string,
  legacyTransactionUuid?: string,
) => {
  await dbConnect();
  const payment = await Payment.findById(paymentId).exec();
  if (!payment)
    throw new HttpError(404, "Payment record not found.", "NOT_FOUND");
  if (payment.paymentStatus === "paid") return payment;
  let callback: EsewaCallback | undefined;
  if (esewaData) {
    try {
      callback = decodeCallback(esewaData);
    } catch {
      throw new HttpError(
        400,
        "eSewa callback data is invalid.",
        "VALIDATION_ERROR",
      );
    }
  }
  if (legacyTransactionUuid && payment.transactionId !== legacyTransactionUuid)
    throw new HttpError(
      409,
      "eSewa transaction does not match this payment.",
      "PAYMENT_PENDING",
    );
  const key = process.env.ESEWA_SECRET_KEY?.trim();
  const productCode = String(payment.metadata?.productCode ?? "");
  const signed = callback?.signed_field_names
    ?.split(",")
    .map((name) => `${name}=${callback?.[name as keyof EsewaCallback] ?? ""}`)
    .join(",");
  const signature =
    key && signed
      ? createHmac("sha256", key).update(signed).digest("base64")
      : "";
  logPayment("callback received", {
    paymentId,
    hasData: !!esewaData,
    status: callback?.status,
    transactionUuid: callback?.transaction_uuid ?? legacyTransactionUuid,
    amount: callback?.total_amount,
    productCode: callback?.product_code,
    signedFields: callback?.signed_field_names,
  });
  if (!callback)
    logPayment("callback fallback", {
      paymentId,
      reason:
        "No callback payload was provided. Falling back to transaction status verification.",
      transactionUuid: legacyTransactionUuid ?? payment.transactionId,
    });
  if (callback) {
    logPayment("callback signature", {
      paymentId,
      matched: signature === callback.signature,
    });
    if (
      !key ||
      !callback.signature ||
      signature !== callback.signature ||
      callback.status !== "COMPLETE" ||
      callback.transaction_uuid !== payment.transactionId ||
      callback.product_code !== productCode ||
      normalizedAmount(callback.total_amount ?? 0) !==
        normalizedAmount(payment.amount)
    )
      throw new HttpError(
        409,
        "eSewa callback validation failed.",
        "PAYMENT_PENDING",
      );
  }
  const configuredStatusUrl = process.env.ESEWA_STATUS_URL?.trim();
  const configuredPaymentUrl = process.env.ESEWA_PAYMENT_URL?.trim();
  const statusUrl =
    configuredStatusUrl ||
    (configuredPaymentUrl?.includes("rc-")
      ? "https://rc.esewa.com.np/api/epay/transaction/status/"
      : "https://esewa.com.np/api/epay/transaction/status/");
  const query = new URLSearchParams({
    product_code: productCode,
    total_amount: payment.amount.toFixed(2),
    transaction_uuid: payment.transactionId ?? "",
  });
  logPayment("status request", {
    paymentId,
    url: statusUrl,
    productCode,
    amount: payment.amount.toFixed(2),
    transactionUuid: payment.transactionId,
  });
  const response = await fetch(`${statusUrl}?${query.toString()}`, {
    cache: "no-store",
  });
  const status = (await response.json()) as {
    status?: string;
    ref_id?: string;
  };
  logPayment("status response", {
    paymentId,
    httpStatus: response.status,
    status: status.status,
    referenceId: status.ref_id,
  });
  if (!response.ok || status.status !== "COMPLETE")
    throw new HttpError(
      409,
      "eSewa has not confirmed this payment yet.",
      "PAYMENT_PENDING",
    );
  // Keep the UUID submitted to eSewa immutable.  It is the identifier used by
  // callback retries and status queries; the provider reference is supplemental.
  payment.metadata = {
    ...(payment.metadata ?? {}),
    providerReference: status.ref_id ?? callback?.transaction_code,
  };
  await payment.save();
  if (!payment.booking)
    throw new HttpError(409, "Payment has no booking.", "INVALID_PAYMENT");
  await bookingService.completeBooking(payment.booking, payment._id);
  logPayment("database updated", {
    paymentId,
    bookingId: payment.booking.toString(),
    paymentStatus: "paid",
    ticketStatus: "active",
  });
  return Payment.findById(payment._id).exec();
};
