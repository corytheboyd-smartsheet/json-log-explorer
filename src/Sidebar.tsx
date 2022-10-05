import { PathList } from "./PathList";
import React from "react";
import { useStore } from "./lib/store";
import { ExclusionList } from "./ExclusionList";
import { GlobalActions } from "./GlobalActions";

export const Sidebar: React.FC = () => {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);

  return (
    <div className="h-screen flex flex-col flex-shrink-0 space-y-3 bg-gray-100 overflow-scroll w-96 px-2 py-3">
      <GlobalActions />

      {!sidebarCollapsed && (
        <>
          <ExclusionList />
          <PathList />
        </>
      )}
    </div>
  );
};
