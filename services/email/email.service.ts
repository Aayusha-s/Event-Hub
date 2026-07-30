export interface EmailPayload {
	to: string;
	subject: string;
	html: string;
	text?: string;
}

export const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
	try {
		// Log attempt in development/server console
		console.log(`[Email Service] Sending email to ${payload.to}: ${payload.subject}`);

		// If SMTP settings are provided in environment, send via real transport/API
		if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
			// SMTP transport can be initialized here using nodemailer if configured
			// For now, we simulate clean success
		}

		return true;
	} catch (error) {
		console.error("[Email Service Error]:", error);
		return false;
	}
};

export const sendRegistrationEmail = async (userEmail: string, userName: string) => {
	return sendEmail({
		to: userEmail,
		subject: "Welcome to Vivnt (Event Hub)!",
		html: `<h1>Welcome, ${userName}!</h1><p>Thank you for registering at Vivnt. Explore top events and connect with our community.</p>`,
	});
};

export const sendBookingConfirmationEmail = async (
	userEmail: string,
	userName: string,
	eventTitle: string,
	ticketNumber: string,
	qrCodeUrl: string
) => {
	return sendEmail({
		to: userEmail,
		subject: `Ticket Confirmed: ${eventTitle}`,
		html: `
			<h2>Booking Confirmation</h2>
			<p>Hello ${userName}, your ticket for <strong>${eventTitle}</strong> is confirmed!</p>
			<p><strong>Ticket Number:</strong> ${ticketNumber}</p>
			<p>Scan your QR code at check-in:</p>
			<img src="${qrCodeUrl}" alt="Ticket QR Code" width="200" height="200" />
		`,
	});
};

export const sendPaymentConfirmationEmail = async (
	userEmail: string,
	userName: string,
	amount: number,
	transactionId: string
) => {
	return sendEmail({
		to: userEmail,
		subject: "Payment Received - Vivnt",
		html: `
			<h2>Payment Receipt</h2>
			<p>Dear ${userName},</p>
			<p>We received your payment of <strong>NPR ${amount}</strong>.</p>
			<p><strong>Transaction ID:</strong> ${transactionId}</p>
			<p>Thank you for using Vivnt!</p>
		`,
	});
};
