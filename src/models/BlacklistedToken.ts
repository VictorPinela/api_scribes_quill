import { Schema, model, Document, Types } from "mongoose";

export interface IBlacklistedToken extends Document {
  token: string;
  expiresAt: Date;
  userId: Types.ObjectId;
}

const BlacklistedTokenSchema = new Schema<IBlacklistedToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index para auto-delete
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
