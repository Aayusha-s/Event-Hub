import nodemailer from 'nodemailer';

export interface EmailPayload {
	to: string;
	subject: string;
	html: string;
	text?: string;
}

// Create transporter once and reuse
let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
	if (transporter) {
		return transporter;
	}

	// Verify environment variables are configured
	const smtpHost = process.env.SMTP_HOST;
	const smtpPort = process.env.SMTP_PORT;
	const smtpUser = process.env.SMTP_USER;
	const smtpPass = process.env.SMTP_PASS;
	const smtpFrom = process.env.SMTP_FROM;

	// Log configuration status (without exposing credentials)
	const isConfigured = Boolean(smtpHost && smtpPort && smtpUser && smtpPass && smtpFrom);
	if (!isConfigured) {
		console.warn('[Email Service] WARNING: SMTP not fully configured. Email sending disabled.');
		console.warn('[Email Service] Configuration check - SMTP_HOST:', !!smtpHost, 'SMTP_PORT:', !!smtpPort, 'SMTP_USER:', !!smtpUser, 'SMTP_PASS:', !!smtpPass, 'SMTP_FROM:', !!smtpFrom);
		return null;
	}

	// Initialize Nodemailer transporter with Gmail SMTP
	transporter = nodemailer.createTransport({
		host: smtpHost!,
		port: parseInt(smtpPort!, 10),
		secure: parseInt(smtpPort!, 10) === 465, // true for 465, false for other ports like 587
		auth: {
			user: smtpUser!,
			pass: smtpPass!, // Google App Password, not regular password
		},
	});

	return transporter;
};

export const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
	try {
		console.log(`[Email Service] Sending email to ${payload.to} with subject: "${payload.subject}"`);

		const transporter = getTransporter();
		if (!transporter) {
			console.error('[Email Service] SMTP transporter not configured. Cannot send email.');
			return false;
		}

		const smtpFrom = process.env.SMTP_FROM;
		if (!smtpFrom) {
			console.error('[Email Service] SMTP_FROM not configured.');
			return false;
		}

		// Send email
		const info = await transporter.sendMail({
			from: smtpFrom,
			to: payload.to,
			subject: payload.subject,
			text: payload.text || payload.html.replace(/<[^>]*>/g, ''), // strip HTML for text version
			html: payload.html,
		});

		console.log(`[Email Service] Email sent successfully. Message ID: ${info.messageId}`);
		return true;
	} catch (error) {
		console.error('[Email Service Error]:', error instanceof Error ? error.message : String(error));
		// Log full error in development for debugging
		if (process.env.NODE_ENV === 'development') {
			console.error('[Email Service] Full error:', error);
		}
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
