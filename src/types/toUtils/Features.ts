import { Schema, Document } from "mongoose";

interface FeaturesInterface extends Document {
  name: string;
  description: string;
}

const FeaturesSchema = new Schema<FeaturesInterface>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    _id: false,
  }
);

interface FeaturesPerLevelInterface extends Document {
  level: number;
  features: FeaturesInterface[];
}

const FeaturesPerLevelSchema = new Schema<FeaturesPerLevelInterface>(
  {
    level: { type: Number, required: true },
    features: { type: [FeaturesSchema], required: true },
  },
  {
    _id: false,
  }
);

export const Features = {
  FeaturesSchema,
  FeaturesPerLevelSchema,
};

export type Features = {
  FeaturesInterface: FeaturesInterface;
  FeaturesPerLevelInterface: FeaturesPerLevelInterface;
};
