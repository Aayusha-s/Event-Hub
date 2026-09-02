import mongoose, { Model, Schema, Types } from "mongoose";
export interface IUserSettings {
  user: Types.ObjectId;
  notifications: Record<string, boolean>;
  privacy: Record<string, boolean>;
  appearance: {
    theme: string;
    language: string;
    timeZone: string;
    dateFormat: string;
  };
  twoFactorEnabled: boolean;
}
const schema = new Schema<IUserSettings>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    notifications: { type: Schema.Types.Mixed, default: {} },
    privacy: { type: Schema.Types.Mixed, default: {} },
    appearance: {
      theme: { type: String, default: "system" },
      language: { type: String, default: "en" },
      timeZone: { type: String, default: "Asia/Kathmandu" },
      dateFormat: { type: String, default: "medium" },
    },
    twoFactorEnabled: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);
export const UserSettings: Model<IUserSettings> =
  (mongoose.models.UserSettings as Model<IUserSettings> | undefined) ??
  mongoose.model<IUserSettings>("UserSettings", schema);
export default UserSettings;
