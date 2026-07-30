import { Types } from "mongoose";
import { bookTicket } from "@/services/tickets/ticket.service";
import { BookTicketInput } from "@/utils/tickets/validation";

export const bookingService = {
	createBooking: async (userId: Types.ObjectId | string, input: BookTicketInput) => {
		return bookTicket(new Types.ObjectId(userId), input);
	},
};
