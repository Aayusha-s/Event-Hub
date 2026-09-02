import mongoose, { Model, Schema, Types } from "mongoose";
export interface IMeetup {
  organizer: Types.ObjectId;
  title: string;
  description?: string;
  venue: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  images: string[];
  status: "draft" | "published" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
const schema = new Schema<IMeetup>(
  {
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 5000 },
    venue: { type: String, required: true, trim: true, maxlength: 300 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 1 },
    images: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "draft",
    },
  },
  { timestamps: true, versionKey: false },
);
schema.index({ status: 1, startDate: 1 });
export const Meetup: Model<IMeetup> =
  (mongoose.models.Meetup as Model<IMeetup> | undefined) ??
  mongoose.model<IMeetup>("Meetup", schema);
export default Meetup;
