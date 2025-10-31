import { Schema, Types, model, Document } from "mongoose";

export interface BlacklistedTokenInterface extends Document {
  token: string;
  expiresAt: Date;
  userId: Types.ObjectId;
}

const BlacklistedTokenSchema = new Schema<BlacklistedTokenInterface>({
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

export const BlacklistedToken = model<BlacklistedTokenInterface>(
  "BlacklistedToken",
  BlacklistedTokenSchema
);
