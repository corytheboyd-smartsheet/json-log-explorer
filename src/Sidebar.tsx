import { PathList } from "./PathList";
import React, { useCallback } from "react";
import { useStore } from "./lib/store";

export const Sidebar: React.FC = () => {
  const clearSelectedPaths = useStore((store) => store.clearSelectedPaths);
  const clearLogs = useStore((store) => store.clearLogs);
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  const setSidebarCollapsed = useStore((store) => store.setSidebarCollapsed);

  const handleClearSelectedPaths = useCallback(() => {
    clearSelectedPaths();
  }, [clearSelectedPaths]);

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
    <div className="h-screen flex flex-col space-y-3 bg-gray-100 shadow overflow-scroll pb-10">
      {sidebarCollapsed && (
        <div className="bg-gray-500 h-screen p-1 flex flex-col space-y-2">
          <button
            className="bg-amber-500 rounded p-1 h-24"
            onClick={handleShowSidebar}
          >
            👉
          </button>
          <button
            className="bg-red-400 rounded p-1 h-24"
            onClick={handleClearLogs}
          >
            🔥
          </button>
        </div>
      )}

      {!sidebarCollapsed && (
        <>
          <div>
            <div className="font-bold text-center">Actions</div>
            <div className="flex flex-col w-full px-3 space-y-1 text-sm">
              <button
                className="bg-red-500 rounded text-white"
                onClick={handleClearLogs}
              >
                Delete Logs 🔥
              </button>
              <button
                className="bg-blue-500 rounded text-white"
                onClick={handleClearSelectedPaths}
              >
                Unselect All Paths
              </button>
              <button
                className="bg-amber-500 rounded text-white"
                onClick={handleCollapseSidebar}
              >
                Collapse 🤏
              </button>
            </div>
          </div>
          <div>
            <PathList />
          </div>
        </>
      )}
    </div>
  );
};
