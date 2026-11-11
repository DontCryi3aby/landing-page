import ProjectsEditor from "@/components/admin/ProjectsEditor";
import { readSite } from "@/lib/site";

export default async function Page() {
  return <ProjectsEditor site={await readSite()} />;
}
