import Link from "next/link";
import AdminTop from "@/components/admin/AdminTop";
import { Pill } from "@/components/admin/Pill";
import { fmtDate } from "@/components/admin/format";
import { listRequests } from "@/lib/requests-store";
import { STATUS_LABEL, STATUS_ORDER, statusOf } from "@/lib/status";
import { readSite, settingsOf } from "@/lib/site";

export default async function AdminOverview() {
  const [list, site] = await Promise.all([listRequests(), readSite()]);
  const cnt = (k: string) => list.filter((q) => statusOf(q) === k).length;

  const byD: Record<string, number> = {};
  list.forEach((q) => {
    const k = q.discipline || "Khác";
    byD[k] = (byD[k] || 0) + 1;
  });
  const keys = Object.keys(byD).sort((a, b) => byD[b] - byD[a]);
  const mx = keys.length ? byD[keys[0]] : 1;
  const hiddenN = Object.values(site.hidden).filter(Boolean).length;
  const editedN = Object.keys(site.text).length;

  return (
    <>
      <AdminTop path="/admin" />
      <div className="adm-body">
        <div className="adm-tiles">
          <div className="adm-tile">
            <span>Tổng yêu cầu</span>
            <b>{list.length}</b>
          </div>
          {STATUS_ORDER.map((k) => (
            <div className="adm-tile" key={k}>
              <span>{STATUS_LABEL[k]}</span>
              <b>{cnt(k)}</b>
            </div>
          ))}
        </div>

        <div className="adm-split">
          <section className="adm-card">
            <div className="adm-card-h">
              <h2>Yêu cầu mới nhất</h2>
              <Link href="/admin/requests">Xem tất cả</Link>
            </div>
            {list.length ? (
              list.slice(0, 5).map((q) => (
                <Link className="adm-li" href={`/admin/requests?id=${encodeURIComponent(q.id)}`} key={q.id}>
                  <span>
                    <b>{q.company || q.name}</b>
                    <small>
                      {q.discipline} · {fmtDate(q.createdAt)}
                    </small>
                  </span>
                  <Pill st={statusOf(q)} />
                </Link>
              ))
            ) : (
              <p className="adm-empty">Chưa có yêu cầu nào. Yêu cầu gửi từ trang Liên hệ sẽ hiện ở đây.</p>
            )}
          </section>

          <div className="adm-col">
            <section className="adm-card">
              <div className="adm-card-h">
                <h2>Theo chuyên ngành</h2>
              </div>
              <div className="adm-pad">
                {keys.length ? (
                  keys.map((k) => (
                    <div className="adm-bar" key={k}>
                      <div>
                        <span>{k}</span>
                        <b>{byD[k]}</b>
                      </div>
                      <i>
                        <s style={{ width: `${Math.round((byD[k] / mx) * 100)}%` }} />
                      </i>
                    </div>
                  ))
                ) : (
                  <p className="adm-empty" style={{ padding: 0 }}>
                    Chưa có dữ liệu.
                  </p>
                )}
              </div>
            </section>
            <section className="adm-card">
              <div className="adm-card-h">
                <h2>Nội dung website</h2>
                <Link href="/admin/content">Sửa nội dung</Link>
              </div>
              <div className="adm-pad">
                <dl className="adm-dl">
                  <div>
                    <dt>Phần đang ẩn</dt>
                    <dd>{hiddenN}</dd>
                  </div>
                  <div>
                    <dt>Đoạn chữ đã sửa</dt>
                    <dd>{editedN}</dd>
                  </div>
                  <div>
                    <dt>Cập nhật lần cuối</dt>
                    <dd>{site.updatedAt ? fmtDate(site.updatedAt) : "Chưa sửa lần nào"}</dd>
                  </div>
                  <div>
                    <dt>Email công khai</dt>
                    <dd>{settingsOf(site).email}</dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
