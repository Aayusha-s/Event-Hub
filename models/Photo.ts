import mongoose, { Model, Schema, Types } from "mongoose";

export interface IPhoto {
  user: Types.ObjectId;
  imageUrl: string;
  caption?: string;
  event?: Types.ObjectId;
  likes: Types.ObjectId[];
  comments: { user: Types.ObjectId; text: string; createdAt: Date }[];
  createdAt: Date;
}
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true, maxlength: 1000 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);
const schema = new Schema<IPhoto>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    imageUrl: { type: String, required: true, trim: true, maxlength: 500 },
    caption: { type: String, trim: true, maxlength: 1000 },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamps: { createdAt: true, updatedAt: true }, versionKey: false },
);
schema.index({ user: 1, createdAt: -1 });
export const Photo: Model<IPhoto> =
  (mongoose.models.Photo as Model<IPhoto> | undefined) ??
  mongoose.model<IPhoto>("Photo", schema);
export default Photo;
