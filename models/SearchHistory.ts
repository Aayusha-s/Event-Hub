import mongoose, { Model, Schema, Types } from "mongoose";

interface ISearchHistory { user: Types.ObjectId; query: string; createdAt: Date; }
const schema = new Schema<ISearchHistory>({ user: { type: Schema.Types.ObjectId, ref: "User", required: true }, query: { type: String, required: true, trim: true, maxlength: 100 } }, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });
schema.index({ user: 1, createdAt: -1 });
export const SearchHistory: Model<ISearchHistory> = (mongoose.models.SearchHistory as Model<ISearchHistory> | undefined) ?? mongoose.model<ISearchHistory>("SearchHistory", schema);
export default SearchHistory;
