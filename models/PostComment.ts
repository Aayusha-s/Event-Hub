import mongoose, { Model, Schema, Types } from "mongoose";
export interface IPostComment { post: Types.ObjectId; author: Types.ObjectId; parent?: Types.ObjectId; text: string; likes: Types.ObjectId[]; createdAt: Date; updatedAt: Date; }
const schema = new Schema<IPostComment>({ post: { type: Schema.Types.ObjectId, ref: "CommunityPost", required: true, index: true }, author: { type: Schema.Types.ObjectId, ref: "User", required: true }, parent: { type: Schema.Types.ObjectId, ref: "PostComment" }, text: { type: String, required: true, trim: true, maxlength: 4000 }, likes: [{ type: Schema.Types.ObjectId, ref: "User" }] }, { timestamps: true, versionKey: false });
schema.index({ post: 1, createdAt: -1 });
export const PostComment: Model<IPostComment> = (mongoose.models.PostComment as Model<IPostComment> | undefined) ?? mongoose.model<IPostComment>("PostComment", schema);
export default PostComment;
