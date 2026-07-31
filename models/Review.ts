import mongoose, { Model, Schema, Types } from "mongoose";

export interface IReview { user: Types.ObjectId; event: Types.ObjectId; rating: number; text: string; createdAt: Date; updatedAt: Date; }
const schema = new Schema<IReview>({ user: { type: Schema.Types.ObjectId, ref: "User", required: true }, event: { type: Schema.Types.ObjectId, ref: "Event", required: true }, rating: { type: Number, required: true, min: 1, max: 5 }, text: { type: String, required: true, trim: true, minlength: 1, maxlength: 2000 } }, { timestamps: true, versionKey: false });
schema.index({ user: 1, event: 1 }, { unique: true }); schema.index({ event: 1, createdAt: -1 });
export const Review: Model<IReview> = (mongoose.models.Review as Model<IReview> | undefined) ?? mongoose.model<IReview>("Review", schema);
export default Review;
