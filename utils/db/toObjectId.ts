import { Types } from "mongoose";

export const toObjectId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return new Types.ObjectId(id);
};
