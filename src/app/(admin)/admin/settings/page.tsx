import SettingsEditor from "@/components/admin/SettingsEditor";
import { readSite } from "@/lib/site";

export default async function Page() {
  return <SettingsEditor site={await readSite()} />;
}
