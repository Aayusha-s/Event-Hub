import mongoose, { Model, Schema, Types } from "mongoose";

export type ActivityType = "booking" | "review" | "comment" | "like" | "saved_event" | "created_event" | "profile_update" | "follow" | "photo";
export interface IActivity { user: Types.ObjectId; type: ActivityType; subject?: Types.ObjectId; subjectModel?: "Event" | "User" | "Photo" | "Review" | "Comment"; title: string; description?: string; link?: string; createdAt: Date; }
const schema = new Schema<IActivity>({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, type: { type: String, enum: ["booking", "review", "comment", "like", "saved_event", "created_event", "profile_update", "follow", "photo"], required: true },
	subject: { type: Schema.Types.ObjectId, refPath: "subjectModel" }, subjectModel: { type: String, enum: ["Event", "User", "Photo", "Review", "Comment"] },
	title: { type: String, required: true, trim: true, maxlength: 250 }, description: { type: String, trim: true, maxlength: 1000 }, link: { type: String, trim: true, maxlength: 500 },
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });
schema.index({ user: 1, createdAt: -1 });
export const Activity: Model<IActivity> = (mongoose.models.Activity as Model<IActivity> | undefined) ?? mongoose.model<IActivity>("Activity", schema);
export default Activity;
