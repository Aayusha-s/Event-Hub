import mongoose, { Model, Schema, Types } from "mongoose";

export interface IComment { user: Types.ObjectId; event: Types.ObjectId; parent?: Types.ObjectId; text: string; likes: Types.ObjectId[]; dislikes: Types.ObjectId[]; createdAt: Date; updatedAt: Date; }
const schema = new Schema<IComment>({ user: { type: Schema.Types.ObjectId, ref: "User", required: true }, event: { type: Schema.Types.ObjectId, ref: "Event", required: true }, parent: { type: Schema.Types.ObjectId, ref: "Comment" }, text: { type: String, required: true, trim: true, minlength: 1, maxlength: 2000 }, likes: [{ type: Schema.Types.ObjectId, ref: "User" }], dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }] }, { timestamps: true, versionKey: false });
schema.index({ event: 1, parent: 1, createdAt: -1 });
export const Comment: Model<IComment> = (mongoose.models.Comment as Model<IComment> | undefined) ?? mongoose.model<IComment>("Comment", schema);
export default Comment;
