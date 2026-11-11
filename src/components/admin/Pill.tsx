import { STATUS_LABEL, type Status } from "@/lib/status";

export const Pill = ({ st }: { st: Status }) => <span className={`pill p-${st}`}>{STATUS_LABEL[st]}</span>;
