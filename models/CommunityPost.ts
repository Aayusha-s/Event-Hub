import mongoose, { Model, Schema, Types } from "mongoose";

export interface ICommunityPost { author: Types.ObjectId; content: string; images: string[]; mentions: Types.ObjectId[]; likes: Types.ObjectId[]; saves: Types.ObjectId[]; shares: number; createdAt: Date; updatedAt: Date; }
const schema = new Schema<ICommunityPost>({ author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, content: { type: String, required: true, trim: true, maxlength: 10000 }, images: [{ type: String, trim: true, maxlength: 500 }], mentions: [{ type: Schema.Types.ObjectId, ref: "User" }], likes: [{ type: Schema.Types.ObjectId, ref: "User" }], saves: [{ type: Schema.Types.ObjectId, ref: "User" }], shares: { type: Number, default: 0, min: 0 } }, { timestamps: true, versionKey: false });
schema.index({ createdAt: -1 });
export const CommunityPost: Model<ICommunityPost> = (mongoose.models.CommunityPost as Model<ICommunityPost> | undefined) ?? mongoose.model<ICommunityPost>("CommunityPost", schema);
export default CommunityPost;
