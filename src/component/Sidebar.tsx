import { PathList } from "./PathList";
import React from "react";
import { useStore } from "../lib/store";
import { ExclusionList } from "./ExclusionList";
import { GlobalActions } from "./GlobalActions";
import classNames from "classnames";

export const Sidebar: React.FC = () => {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);

  return (
    <div
      className={classNames(
        "h-screen flex flex-col flex-shrink-0 overflow-scroll text-white bg-gray-700",
        "border-r-8 border-gray-800",
        { "py-2": sidebarCollapsed },
        { "w-96": !sidebarCollapsed }
      )}
    >
      <div className="space-y-5 flex-grow">
        <GlobalActions />

        {!sidebarCollapsed && (
          <>
            <ExclusionList />
            <PathList />
          </>
        )}
      </div>

      {!sidebarCollapsed && (
        <div className="text-xs text-center text-gray-400 py-10">
          Made with 🤌 by Cory Boyd
        </div>
      )}
    </div>
  );
};
