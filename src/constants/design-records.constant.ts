export const DESIGN_STATUS = [
  "pending",
  "in_progress",
  "review",
  "approved",
  "rejected",
  "completed",
] as const;

export type DesignStatus =
  typeof DESIGN_STATUS[number];