export const STATUS_ORDER = ["new", "progress", "quoted", "closed"] as const;
export type Status = (typeof STATUS_ORDER)[number];
export const STATUS_LABEL: Record<Status, string> = { new: "Mới", progress: "Đang xử lý", quoted: "Đã báo giá", closed: "Đã đóng" };

/** Normalize legacy "done" and unknown values. */
export const statusOf = (q: { status?: string }): Status =>
  q.status === "done" ? "closed" : (STATUS_ORDER as readonly string[]).includes(q.status ?? "") ? (q.status as Status) : "new";
