import mongoose, { Model, Schema, Types } from "mongoose";

export interface IFollow { follower: Types.ObjectId; following: Types.ObjectId; createdAt: Date; }
const schema = new Schema<IFollow>({
	follower: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
	following: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });
schema.index({ follower: 1, following: 1 }, { unique: true });
schema.index({ following: 1, createdAt: -1 });
export const Follow: Model<IFollow> = (mongoose.models.Follow as Model<IFollow> | undefined) ?? mongoose.model<IFollow>("Follow", schema);
export default Follow;
