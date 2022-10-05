import React, { useState } from "react";
import { useStore } from "../lib/store";

export const SidebarSection: React.FC<
  React.PropsWithChildren & { title: string }
> = ({ title, children }) => {
  const collapsed = useStore((state) => Boolean(state.sectionCollapsed[title]));
  const setCollapsed = useStore((state) => state.setSectionCollapsed);

  return (
    <div className="space-y-1">
      <div className="mb-5 font-bold items-center bg-gray-500 text-gray-100 flex w-full px-2">
        <div className="flex-grow">{title}</div>
        <div>
          <button onClick={() => setCollapsed(title, !collapsed)}>
            {collapsed ? "➕" : "➖"}
          </button>
        </div>
      </div>
      {!collapsed && <div className="px-2">{children}</div>}
    </div>
  );
};
