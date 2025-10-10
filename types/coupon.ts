// Coupon/Invitation Code related types

export interface CouponDTO {
  id: string;
  codeId: string;
  state: "active" | "pending" | "expired" | "revoked" | "claimed";
  usageType: "single_use" | "multiple_use" | "unlimited";
  expiresIn: "1_day" | "7_days" | "14_days" | "30_days" | "never";
  expiresAt: string | null;
  teacherId: string;
  redeemedBy: string | null;
  redeemedCount: number;
  createdAt: string;
  lastUpdated: string;
}

export interface CouponInput {
  usageType: "single_use" | "multiple_use" | "unlimited";
  expiresIn: "1_day" | "7_days" | "14_days" | "30_days" | "never";
}