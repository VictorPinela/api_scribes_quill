import { Schema, model, Document, Types } from "mongoose";
import { IBlacklistedToken } from "../types";

const BlacklistedTokenSchema = new Schema<IBlacklistedToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const BlacklistedToken = model<IBlacklistedToken>(
  "BlacklistedToken",
  BlacklistedTokenSchema
);
