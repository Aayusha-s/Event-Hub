import mongoose, { Model, Schema, Types } from "mongoose";
interface IMeetupRSVP {
  meetup: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: Date;
}
const schema = new Schema<IMeetupRSVP>(
  {
    meetup: { type: Schema.Types.ObjectId, ref: "Meetup", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);
schema.index({ meetup: 1, user: 1 }, { unique: true });
export const MeetupRSVP: Model<IMeetupRSVP> =
  (mongoose.models.MeetupRSVP as Model<IMeetupRSVP> | undefined) ??
  mongoose.model<IMeetupRSVP>("MeetupRSVP", schema);
export default MeetupRSVP;
