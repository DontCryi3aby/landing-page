export function fmtDate(iso?: string | null, short = false) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(
      "vi-VN",
      short ? { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" } : { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }
    );
  } catch {
    return String(iso);
  }
}
