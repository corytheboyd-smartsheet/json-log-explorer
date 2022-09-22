import React, { useCallback } from "react";
import "./socket";
import { LogList } from "./LogList";
import { PathList } from "./PathList";
import { useStore } from "./lib/store";
import { SelectedLogView } from "./SelectedLogView";
import { Sidebar } from "./Sidebar";

function App() {
  const isLogsEmpty = useStore((store) => store.logs.length === 0);
  const isSelectedPathsEmpty = useStore(
    (store) => store.selectedPaths.size === 0
  );
  const selectedLog = useStore((store) => store.selectedLog);

  return (
    <div className="h-screen w-screen bg-gray-800">
      <div className="flex">
        <Sidebar />

        <div className="p-1 text-gray-100 flex-grow flex flex-col overflow-hidden">
          {isLogsEmpty && (
            <div>
              <p className="text-lg text-amber-500">No logs yet, yo</p>
            </div>
          )}
          {isSelectedPathsEmpty && (
            <div>
              <p className="text-lg text-amber-500">
                Select some extracted paths to show values from logs
              </p>
            </div>
          )}
          {!isSelectedPathsEmpty && !isLogsEmpty && <LogList />}
        </div>

        {selectedLog && <SelectedLogView />}
      </div>
    </div>
  );
}

export default App;
