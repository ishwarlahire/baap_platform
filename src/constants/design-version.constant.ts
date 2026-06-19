export const DESIGN_VERSION_STATUS = [
  "draft",
  "submitted",
  "approved",
  "rejected",
] as const;

export type DesignVersionStatus =
  typeof DESIGN_VERSION_STATUS[number];