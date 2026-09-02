import mongoose, { Model, Schema, Types } from "mongoose";

export interface IPasswordResetToken {
  user: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date;
}
const schema = new Schema<IPasswordResetToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: true },
    usedAt: Date,
  },
  { timestamps: true, versionKey: false },
);
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const PasswordResetToken: Model<IPasswordResetToken> =
  (mongoose.models.PasswordResetToken as
    | Model<IPasswordResetToken>
    | undefined) ??
  mongoose.model<IPasswordResetToken>("PasswordResetToken", schema);
export default PasswordResetToken;
