import { Button } from "../ui/Button";
import React, { useCallback } from "react";
import { useStore } from "../lib/store";
import { SidebarSection } from "../ui/SidebarSection";

export const GlobalActions: React.FC = () => {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  const clearLogs = useStore((store) => store.clearLogs);
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
    <SidebarSection title={sidebarCollapsed ? "" : "JSON Log Explorer"}>
      <div className="space-y-2">
        {sidebarCollapsed && (
          <>
            <Button
              buttonClassNames="bg-amber-500"
              onClick={handleShowSidebar}
            >
              👉
            </Button>
            <Button
              buttonClassNames="bg-red-400"
              onClick={handleClearLogs}
            >
              🔥
            </Button>
          </>
        )}

        {!sidebarCollapsed && (
          <>
            <Button
              buttonClassNames="bg-red-500"
              onClick={handleClearLogs}
            >
              Delete All Logs 🔥
            </Button>
            <Button
              buttonClassNames="bg-amber-500"
              onClick={handleCollapseSidebar}
            >
              Collapse Sidebar 🤏
            </Button>
          </>
        )}
      </div>
    </SidebarSection>
  );
};
