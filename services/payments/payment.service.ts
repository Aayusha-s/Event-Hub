import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Payment, { IPayment } from "@/models/Payment";
import Ticket from "@/models/Ticket";
import Event from "@/models/Event";
import User from "@/models/User";
import { HttpError } from "@/utils/api/httpError";
import { createNotification } from "@/services/notifications/notification.service";
import { sendPaymentConfirmationEmail } from "@/services/email/email.service";

export interface InitiatePaymentInput {
	ticketId: string;
	paymentMethod: IPayment["paymentMethod"];
	amount: number;
}

export const initiatePayment = async (userId: Types.ObjectId | string, input: InitiatePaymentInput) => {
	await dbConnect();
	const userObjId = new Types.ObjectId(userId);
	const ticketObjId = new Types.ObjectId(input.ticketId);

	const ticket = await Ticket.findById(ticketObjId).exec();
	if (!ticket) throw new HttpError(404, "Ticket not found.", "NOT_FOUND");
	if (ticket.user.toString() !== userObjId.toString()) throw new HttpError(403, "Forbidden.", "FORBIDDEN");
	if (ticket.paymentStatus === "paid") throw new HttpError(409, "Ticket has already been paid for.", "ALREADY_PAID");

	const existingPayment = await Payment.findOne({ ticket: ticketObjId, paymentStatus: "paid" });
	if (existingPayment) throw new HttpError(409, "A completed payment already exists for this ticket.", "DUPLICATE_PAYMENT");

	const payment = await Payment.create({
		user: userObjId,
		event: ticket.event,
		ticket: ticketObjId,
		amount: input.amount,
		paymentMethod: input.paymentMethod,
		paymentStatus: "pending",
	});

	// Handle method-specific mock/payload initialization
	if (input.paymentMethod === "khalti") {
		payment.pidx = `khalti_pidx_${payment._id.toString()}`;
		await payment.save();
		return {
			paymentId: payment._id.toString(),
			paymentMethod: "khalti",
			pidx: payment.pidx,
			paymentUrl: `https://test-pay.khalti.com/?pidx=${payment.pidx}`,
		};
	} else if (input.paymentMethod === "stripe") {
		payment.stripePaymentIntentId = `pi_${payment._id.toString()}`;
		await payment.save();
		return {
			paymentId: payment._id.toString(),
			paymentMethod: "stripe",
			clientSecret: `${payment.stripePaymentIntentId}_secret_test`,
		};
	}

	return {
		paymentId: payment._id.toString(),
		paymentMethod: input.paymentMethod,
		status: "pending",
	};
};

export const verifyPayment = async (
	paymentId: string,
	transactionId?: string,
	pidx?: string,
	paymentIntentId?: string
) => {
	await dbConnect();
	const payment = await Payment.findById(paymentId).exec();
	if (!payment) throw new HttpError(404, "Payment record not found.", "NOT_FOUND");
	if (payment.paymentStatus === "paid") return payment;

	payment.paymentStatus = "paid";
	payment.transactionId = transactionId || pidx || paymentIntentId || `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
	await payment.save();

	// Update Ticket status
	if (payment.ticket) {
		const ticket = await Ticket.findById(payment.ticket).exec();
		if (ticket) {
			ticket.paymentStatus = "paid";
			await ticket.save();

			const [user, event] = await Promise.all([
				User.findById(ticket.user).exec(),
				Event.findById(ticket.event).exec(),
			]);

			if (user && event) {
				createNotification(
					user._id,
					"payment_success",
					"Payment Successful",
					`Your payment for ${event.title} ticket was verified.`
				).catch(console.error);

				sendPaymentConfirmationEmail(user.email, user.name, payment.amount, payment.transactionId).catch(console.error);
			}
		}
	}

	return payment;
};
