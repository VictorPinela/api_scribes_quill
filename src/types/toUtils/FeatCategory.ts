type FeatCategories = "geral" | "origem" | "estilo de combate" | "dom épico";

const enumFeatCategory: FeatCategories[] = [
  "geral",
  "origem",
  "estilo de combate",
  "dom épico",
];

export const FeatCategory = {
  enumFeatCategory,
};

export type FeatCategory = {
  FeatCategories: FeatCategories;
};
