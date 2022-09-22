import React, { useCallback } from "react";
import './socket'
import { LogList } from "./LogList";
import { PathList } from "./PathList";
import { useStore } from "./lib/store";

function App() {
  const showContentColumn = useStore(store => store.showContentColumn)
  const setShowContentColumn = useStore(store => store.setShowContentColumn)

  const handleToggleShowContentColumn = useCallback(() => {
    setShowContentColumn(!showContentColumn);
  }, [setShowContentColumn, showContentColumn]);

  return (
    <div className="bg-amber-50 h-screen w-screen">
      <div className="flex">
        <div className="h-screen flex flex-col">
          <div className="bg-green-200">
            <div>
              <label htmlFor="showContentColumn">Show Content Column</label>
              <input id="showContentColumn" type="checkbox" onChange={handleToggleShowContentColumn} checked={showContentColumn} />
            </div>
          </div>
          <div className="h-full bg-red-200">
            <PathList />
          </div>
        </div>
        <div className="bg-blue-200 flex-grow flex flex-col overflow-hidden">
          <LogList />
        </div>
      </div>
    </div>
  );
}

export default App;
