import React from "react";
import "./socket";
import { LogList } from "./LogList";
import numeral from "numeral";
import { useStore } from "./lib/store";
import { SelectedLogView } from "./SelectedLogView";
import { Sidebar } from "./Sidebar";

function App() {
  const selectedLog = useStore((store) => store.selectedLog);

  return (
    <div className="h-screen w-screen bg-gray-800 flex">
      <Sidebar />
      <LogList />
      <SelectedLogView />
    </div>
  );
}

export default App;
