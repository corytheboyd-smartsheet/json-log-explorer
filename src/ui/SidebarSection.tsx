import React from "react";
import { useStore } from "../lib/store/useStore";

export const SidebarSection: React.FC<
  React.PropsWithChildren & { title: string }
> = ({ title, children }) => {
  const sidebarCollapsed = useStore((state) => state.sidebarCollapsed);
  const collapsed = useStore((state) => Boolean(state.sectionCollapsed[title]));
  const setCollapsed = useStore((state) => state.setSectionCollapsed);

  return (
    <div className="space-y-1">
      <div className="font-bold items-center bg-gray-500 text-gray-100 flex w-full px-2">
        <div className="flex-grow">{title}</div>
        {!sidebarCollapsed && (
          <div>
            <button onClick={() => setCollapsed(title, !collapsed)}>
              {collapsed ? "➕" : "➖"}
            </button>
          </div>
        )}
      </div>
      {(sidebarCollapsed || !collapsed) && (
        <div className="px-2 pt-2">{children}</div>
      )}
    </div>
  );
};
