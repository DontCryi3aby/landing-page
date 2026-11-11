import ContentEditor from "@/components/admin/ContentEditor";
import { readSite } from "@/lib/site";

export default async function Page() {
  return <ContentEditor site={await readSite()} />;
}
