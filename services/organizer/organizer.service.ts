import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Organizer from "@/models/Organizer";
import User from "@/models/User";
import { HttpError } from "@/utils/api/httpError";
import { createNotification } from "@/services/notifications/notification.service";

export interface RegisterOrganizerInput {
	orgType: "individual" | "community" | "business" | "nonprofit" | "agency";
	organizationName: string;
	description?: string;
	website?: string;
	formData?: Record<string, unknown>;
}



const DEMO_AUTO_APPROVE = true;

export const createOrganizerProfile = async (ownerId: Types.ObjectId | string, input: RegisterOrganizerInput) => {
	await dbConnect();
	const ownerObjId = new Types.ObjectId(ownerId);

	const existing = await Organizer.findOne({ owner: ownerObjId }).exec();
	if (existing) {
		if (existing.approvalStatus === "approved") {
			await User.findByIdAndUpdate(ownerObjId, { $set: { role: "organizer" } }).exec();
		}
		return existing;
	}

	const organizer = await Organizer.create({
		owner: ownerObjId,
		orgType: input.orgType,
		organizationName: input.organizationName,
		description: input.description,
		website: input.website,
		formData: input.formData ?? {},
		approvalStatus: DEMO_AUTO_APPROVE ? "approved" : "pending",
	});

	if (DEMO_AUTO_APPROVE) {
		await User.findByIdAndUpdate(ownerObjId, { $set: { role: "organizer" } }).exec();
	}

	createNotification(
		ownerObjId,
		"organizer_update",
		DEMO_AUTO_APPROVE ? "Organizer Application Approved" : "Organizer Application Submitted",
		DEMO_AUTO_APPROVE
			? "Your organizer application has been approved. You now have organizer access."
			: "Your organizer application was submitted and is pending admin approval."
	).catch(console.error);

	return organizer;
};

export const getOrganizerProfile = async (ownerId: Types.ObjectId | string) => {
	await dbConnect();
	return Organizer.findOne({ owner: new Types.ObjectId(ownerId) }).populate("owner", "name email phone").exec();
};

export const listOrganizerApplications = async (page = 1, pageSize = 20, status?: string) => {
	await dbConnect();
	const match: Record<string, unknown> = {};
	if (status) match.approvalStatus = status;

	const skip = (page - 1) * pageSize;
	const [items, total] = await Promise.all([
		Organizer.find(match).populate("owner", "name email phone").sort({ createdAt: -1 }).skip(skip).limit(pageSize).exec(),
		Organizer.countDocuments(match),
	]);

	return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
};

export const updateOrganizerApprovalStatus = async (
	organizerId: Types.ObjectId | string,
	approvalStatus: "approved" | "rejected"
) => {
	await dbConnect();
	const organizer = await Organizer.findByIdAndUpdate(organizerId, { $set: { approvalStatus } }, { new: true }).exec();
	if (!organizer) throw new HttpError(404, "Organizer application not found.", "NOT_FOUND");

	if (approvalStatus === "approved") {
		await User.findByIdAndUpdate(organizer.owner, { $set: { role: "organizer" } }).exec();
	}

	createNotification(
		organizer.owner,
		"organizer_update",
		`Organizer Application ${approvalStatus === "approved" ? "Approved" : "Rejected"}`,
		`Your organizer application status has been updated to ${approvalStatus}.`
	).catch(console.error);

	return organizer;
};
