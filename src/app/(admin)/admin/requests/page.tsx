import RequestsBoard from "@/components/admin/RequestsBoard";
import { listRequests } from "@/lib/requests-store";

export default async function AdminRequests({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const [items, { id }] = await Promise.all([listRequests(), searchParams]);
  return <RequestsBoard items={items} initialSel={id ?? null} />;
}
