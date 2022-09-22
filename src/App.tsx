import React, { useCallback } from "react";
import './socket'
import { LogList } from "./LogList";
import { PathList } from "./PathList";
import { useStore } from "./lib/store";

function App() {
  const clearSelectedPaths = useStore(store => store.clearSelectedPaths)
  const clearLogs = useStore(store => store.clearLogs)
  const isLogsEmpty = useStore(store => store.logs.length === 0)
  const isSelectedPathsEmpty = useStore(store => store.selectedPaths.size === 0)

  const handleClearSelectedPaths = useCallback(() => {
    clearSelectedPaths();
  }, [clearSelectedPaths])

  const handleClearLogs = useCallback(() => {
    clearLogs();
  }, [clearLogs])

  return (
    <div className="h-screen w-screen bg-gray-800">
      <div className="flex">
        <div className="h-screen flex flex-col space-y-3 bg-gray-100 shadow">
          <div>
            <div className="font-bold text-center">Actions</div>
            <div className="flex flex-col w-full px-3 space-y-1 text-sm">
              <button className="bg-red-500 rounded text-white" onClick={handleClearLogs}>Delete Logs</button>
              <button className="bg-blue-500 rounded text-white" onClick={handleClearSelectedPaths}>Unselect All Paths</button>
            </div>
          </div>
          <div>
            <PathList />
          </div>
        </div>
        <div className="p-1 text-gray-100 flex-grow flex flex-col overflow-hidden">
          {isLogsEmpty && (
            <div>
              <p className="text-lg text-amber-500">No logs yet, yo</p>
            </div>
          )}
          {isSelectedPathsEmpty && (
            <div>
              <p className="text-lg text-amber-500">Select some extracted paths to show values from logs</p>
            </div>
          )}
          {!isSelectedPathsEmpty && !isLogsEmpty && (
            <LogList />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
