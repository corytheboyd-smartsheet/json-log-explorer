import { PathList } from "./PathList";
import React from "react";
import { useStore } from "./lib/store";
import { ExclusionList } from "./ExclusionList";
import { GlobalActions } from "./GlobalActions";

export const Sidebar: React.FC = () => {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);

  return (
    <div className="h-screen flex flex-col flex-shrink-0 bg-gray-100 overflow-scroll w-96">
      <div className="space-y-5 flex-grow">
        <GlobalActions />
        {!sidebarCollapsed && (
          <>
            <ExclusionList />
            <PathList />
          </>
        )}
      </div>

      <div className="text-xs text-center text-gray-400 py-10">
        Made with 🤌 by Cory Boyd
      </div>
    </div>
  );
};
