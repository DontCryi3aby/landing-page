import { SERVICES } from "./content";

/** Editable sections in /admin/content. `toggle` sections can be hidden from the site. */
export interface EditField { path: string; label: string; multi?: boolean }
export interface EditSection { key: string; name: string; toggle?: boolean; note?: string; fields: EditField[] }

const F = (path: string, label: string, multi = false): EditField => ({ path, label, multi });

export const EDIT: EditSection[] = [
  { key: "hero", name: "Trang chủ · Đầu trang", fields: [F("home.kicker", "Dòng nhãn nhỏ"), F("home.title", "Tiêu đề lớn"), F("home.lead", "Câu giới thiệu", true)] },
  { key: "home.ch1", toggle: true, name: "Trang chủ · Dịch vụ", fields: [F("home.ch1.kicker", "Nhãn"), F("home.ch1.title", "Tiêu đề"), F("home.ch1.body", "Mô tả", true)] },
  { key: "home.ch2", toggle: true, name: "Trang chủ · Quy trình", fields: [F("home.ch2.kicker", "Nhãn"), F("home.ch2.title", "Tiêu đề"), F("home.ch2.body", "Mô tả", true)] },
  { key: "home.ch3", toggle: true, name: "Trang chủ · Dự án", fields: [F("home.ch3.kicker", "Nhãn"), F("home.ch3.title", "Tiêu đề"), F("home.ch3.body", "Mô tả", true)] },
  { key: "cta", name: "Khối kêu gọi cuối trang", fields: [F("cta.kicker", "Nhãn"), F("cta.title", "Tiêu đề"), F("cta.text", "Mô tả", true)] },
  { key: "services", name: "Trang Dịch vụ", fields: [F("servicesPage.title", "Tiêu đề"), F("servicesPage.lead", "Mô tả", true)] },
  ...SERVICES.map((s) => ({
    key: `svc.${s.slug}`,
    name: `Trang ${s.vi.name}`,
    fields: [F(`svc.${s.slug}.name`, "Tên dịch vụ"), F(`svc.${s.slug}.title`, "Tiêu đề"), F(`svc.${s.slug}.lead`, "Mô tả", true)],
  })),
  { key: "services.mech", toggle: true, name: "Dịch vụ · Thiết bị cơ khí", fields: [F("servicesPage.mech", "Tiêu đề"), F("servicesPage.mechText", "Mô tả", true)] },
  { key: "projects", name: "Trang Dự án", fields: [F("projects.title", "Tiêu đề"), F("projects.lead", "Mô tả", true)] },
  { key: "projects.refs", toggle: true, name: "Dự án · Bảng tham chiếu", fields: [F("projects.refsTitle", "Tiêu đề bảng")], note: "Các dòng trong bảng được sửa ở mục Dự án." },
  { key: "about", name: "Về chúng tôi · Giới thiệu", fields: [F("about.title", "Tiêu đề trang"), F("about.whoTitle", "Tiêu đề phần giới thiệu"), F("about.p1", "Đoạn 1", true), F("about.p2", "Đoạn 2", true)] },
  { key: "about.mv", toggle: true, name: "Về chúng tôi · Sứ mệnh và tầm nhìn", fields: [F("about.mission.1", "Sứ mệnh", true), F("about.vision.1", "Tầm nhìn", true)] },
  { key: "about.certs", toggle: true, name: "Về chúng tôi · Chứng chỉ", fields: [F("about.certsTitle", "Tiêu đề"), F("about.certsBody", "Mô tả", true)] },
  { key: "about.team", toggle: true, name: "Về chúng tôi · Đội ngũ", fields: [F("about.teamTitle", "Tiêu đề")] },
  { key: "about.letter", toggle: true, name: "Về chúng tôi · Lời Tổng Giám đốc", fields: [F("about.letter", "Trích dẫn", true), F("about.letterBy", "Người ký")] },
  { key: "about.values", toggle: true, name: "Về chúng tôi · Giá trị cốt lõi", fields: [F("about.valuesTitle", "Tiêu đề")] },
  { key: "home.clients", toggle: true, name: "Khách hàng (trang chủ và Dự án)", fields: [F("about.clientsTitle", "Tiêu đề")] },
  { key: "about.why", toggle: true, name: "Về chúng tôi · Vì sao chọn XT", fields: [F("about.whyTitle", "Tiêu đề")] },
  { key: "contact", name: "Trang Liên hệ", fields: [F("contact.title", "Tiêu đề"), F("contact.lead", "Mô tả", true), F("contact.thanksText", "Lời cảm ơn sau khi gửi", true)] },
  { key: "footer", name: "Chân trang", fields: [F("footer.tag", "Giới thiệu ngắn", true)] },
];

export const EDIT_PATHS = new Set(EDIT.flatMap((s) => s.fields.map((f) => f.path)));
export const TOGGLE_KEYS = new Set(EDIT.filter((s) => s.toggle).map((s) => s.key));
