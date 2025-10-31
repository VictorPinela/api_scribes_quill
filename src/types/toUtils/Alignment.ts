type Alignments = "lb" | "ln" | "lm" | "nb" | "nn" | "nm" | "cb" | "cn" | "cm";

const enumAlignments: Alignments[] = [
  "lb",
  "ln",
  "lm",
  "nb",
  "nn",
  "nm",
  "cb",
  "cn",
  "cm",
];

export const Alignment = {
  enumAlignments,
};

export type Alignment = {
  Alignments: Alignments;
};
