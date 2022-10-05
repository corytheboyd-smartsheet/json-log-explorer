import React from "react";
import { LogList } from "./component/LogList";
import { SelectedLogView } from "./component/SelectedLogView";
import { Sidebar } from "./component/Sidebar";

function App() {
  return (
    <div className="h-screen w-screen bg-gray-800 flex">
      <Sidebar />
      <LogList />
      <SelectedLogView />
    </div>
  );
}

export default App;
