import { promises as fs } from "node:fs";
import path from "node:path";

export interface RequestItem {
  id: string;
  createdAt: string;
  lang: string;
  status: "new" | "done";
  name: string;
  company: string;
  email: string;
  phone?: string;
  discipline: string;
  disciplineKey: string;
  headcount?: string;
  location?: string;
  start?: string;
  message: string;
}

const DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DIR, "requests.json");

// Serialize writes within this process so concurrent submissions don't clobber each other.
let queue: Promise<unknown> = Promise.resolve();
const locked = <T>(fn: () => Promise<T>): Promise<T> => {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
};

export async function listRequests(): Promise<RequestItem[]> {
  try {
    const raw = JSON.parse(await fs.readFile(FILE, "utf8"));
    const items: RequestItem[] = Array.isArray(raw) ? raw : [];
    return items.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  } catch {
    return [];
  }
}

async function write(items: RequestItem[]) {
  await fs.mkdir(DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(items, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

export const addRequest = (item: RequestItem) =>
  locked(async () => {
    const items = await listRequests();
    items.unshift(item);
    await write(items.slice(0, 1000));
  });

export const toggleRequestStatus = (id: string) =>
  locked(async () => {
    const items = await listRequests();
    await write(items.map((it) => (it.id === id ? { ...it, status: it.status === "done" ? "new" : "done" } : it)));
  });
