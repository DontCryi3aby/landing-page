import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { ArrowIcon } from "@/components/icons";
import { Brand, Kick } from "@/components/ui";
import { adminEnabled, isAdminAuth } from "@/lib/admin";
import { IMG } from "@/lib/content";
import { sans, serif } from "@/lib/fonts";
import { listRequests, statusOf } from "@/lib/requests-store";
import "../../globals.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Quản trị – XT Technical Services",
  robots: { index: false, follow: false },
  icons: { icon: IMG.logo },
};
export const viewport: Viewport = { themeColor: "#102B46", colorScheme: "dark" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = adminEnabled() && isAdminAuth((await headers()).get("authorization"));
  const newCount = authed ? (await listRequests()).filter((q) => statusOf(q) === "new").length : 0;

  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {authed ? (
          <div className="adm">
            <aside className="adm-side">
              <Brand to="/admin" label="Quản trị" />
              <AdminNav newCount={newCount} />
              <Link className="adm-view" href="/">
                Xem website <ArrowIcon />
              </Link>
            </aside>
            <div className="adm-main">{children}</div>
          </div>
        ) : (
          <section className="sec" style={{ paddingTop: 200 }}>
            <div className="wrap">
              <div className="head">
                <Kick>Quản trị</Kick>
                <h1 className="h2">Chỉ người quản trị website mới vào được trang này</h1>
                <p className="body">
                  {adminEnabled()
                    ? "Bạn cần đăng nhập bằng tài khoản quản trị để quản lý nội dung và yêu cầu liên hệ."
                    : "Trang quản trị chưa được bật. Đặt biến môi trường ADMIN_PASSWORD trên server rồi khởi động lại."}
                </p>
              </div>
              <Link className="btn" href="/">
                Về trang chủ
              </Link>
            </div>
          </section>
        )}
      </body>
    </html>
  );
}
