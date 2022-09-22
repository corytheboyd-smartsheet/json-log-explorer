import React from "react";
import './socket'
import { LogList } from "./LogList";
import { PathList } from "./PathList";

function App() {
  return (
    <div className="bg-amber-50 h-screen w-screen">
      <div className="flex">
        <div className="h-screen bg-red-200">
          <PathList />
        </div>
        <div className="bg-blue-200 flex-grow flex flex-col overflow-hidden">
          <LogList />
        </div>
      </div>
    </div>
  );
}

export default App;
