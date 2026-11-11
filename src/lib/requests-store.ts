import { locked, readJson, writeJson } from "./json-store";

import { STATUS_ORDER, STATUS_LABEL, statusOf, type Status } from "./status";
export { STATUS_ORDER, STATUS_LABEL, statusOf, type Status };

export interface RequestItem {
  id: string;
  createdAt: string;
  lang: string;
  status: Status | "done";
  statusAt?: string;
  note?: string;
  noteAt?: string;
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

const FILE = "requests.json";

export async function listRequests(): Promise<RequestItem[]> {
  const raw = await readJson<unknown>(FILE, []);
  const items: RequestItem[] = Array.isArray(raw) ? raw : [];
  return items.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

export const addRequest = (item: RequestItem) =>
  locked(async () => {
    const items = await listRequests();
    items.unshift(item);
    await writeJson(FILE, items.slice(0, 1000));
  });

export const updateRequest = (id: string, patch: Partial<Pick<RequestItem, "status" | "statusAt" | "note" | "noteAt">>) =>
  locked(async () => {
    const items = await listRequests();
    await writeJson(FILE, items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  });
