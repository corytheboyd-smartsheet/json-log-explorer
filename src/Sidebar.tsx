import { PathList } from "./PathList";
import React, { useCallback } from "react";
import { useStore } from "./lib/store";
import { ExclusionList } from "./ExclusionList";
import { SidebarButton } from "./ui/SidebarButton";

export const Sidebar: React.FC = () => {
  const clearLogs = useStore((store) => store.clearLogs);
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  const setSidebarCollapsed = useStore((store) => store.setSidebarCollapsed);

  const handleClearLogs = useCallback(() => {
    clearLogs();
  }, [clearLogs]);

  const handleCollapseSidebar = useCallback(() => {
    setSidebarCollapsed(true);
  }, [setSidebarCollapsed]);

  const handleShowSidebar = useCallback(() => {
    setSidebarCollapsed(false);
  }, [setSidebarCollapsed]);

  return (
    <div className="h-screen flex flex-col flex-shrink-0 space-y-3 bg-gray-100 overflow-scroll">
      {sidebarCollapsed && (
        <div className="bg-gray-500 h-screen p-1 flex flex-col space-y-2">
          <SidebarButton
            buttonClassNames="bg-amber-500"
            onClick={handleShowSidebar}
          >
            👉
          </SidebarButton>
          <SidebarButton
            buttonClassNames="bg-red-400"
            onClick={handleClearLogs}
          >
            🔥
          </SidebarButton>
        </div>
      )}

      {!sidebarCollapsed && (
        <div className="w-96 px-3 my-5 space-y-3">
          <div>
            <div className="flex flex-col w-full space-y-1 text-sm">
              <SidebarButton
                buttonClassNames="bg-red-500"
                onClick={handleClearLogs}
              >
                Delete All Logs 🔥
              </SidebarButton>
              <SidebarButton
                buttonClassNames="bg-amber-500"
                onClick={handleCollapseSidebar}
              >
                Collapse Sidebar 🤏
              </SidebarButton>
            </div>
          </div>
          <div>
            <ExclusionList />
          </div>
          <div>
            <PathList />
          </div>
        </div>
      )}
    </div>
  );
};
