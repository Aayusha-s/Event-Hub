import mongoose, { Model, Schema, Types } from "mongoose";

export interface ISavedEvent {
  user: Types.ObjectId;
  event: Types.ObjectId;
  createdAt: Date;
}
const schema = new Schema<ISavedEvent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);
schema.index({ user: 1, event: 1 }, { unique: true });
schema.index({ event: 1, createdAt: -1 });
export const SavedEvent: Model<ISavedEvent> =
  (mongoose.models.SavedEvent as Model<ISavedEvent> | undefined) ??
  mongoose.model<ISavedEvent>("SavedEvent", schema);
export default SavedEvent;
