import { Schema, Document } from "mongoose";
import { Features } from "./Features";

interface SubClassInterface extends Document {
  name: string;
  featuresPerLevel: Features["FeaturesPerLevelInterface"][];
}

const SubClassSchema = new Schema<SubClassInterface>(
  {
    name: { type: String, required: true },
    featuresPerLevel: {
      type: [Features.FeaturesPerLevelSchema],
      required: true,
    },
  },
  {
    _id: false,
  }
);

export const SubClass = {
  SubClassSchema,
};

export type SubClass = {
  SubClassInterface: SubClassInterface;
};
