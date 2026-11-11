import type { ReactNode } from "react";
import { ADM_TABS } from "./tabs";

/** Page header inside the admin shell: title + description from ADM_TABS, optional actions, optional toast. */
export default function AdminTop({ path, actions, toast }: { path: string; actions?: ReactNode; toast?: string }) {
  const tab = ADM_TABS.find((t) => t[0] === path) ?? ADM_TABS[0];
  return (
    <>
      <header className="adm-top">
        <div>
          <h1>{tab[1]}</h1>
          <p>{tab[2]}</p>
        </div>
        {actions}
      </header>
      {toast ? (
        <p className="adm-toast" role="status">
          {toast}
        </p>
      ) : null}
    </>
  );
}
