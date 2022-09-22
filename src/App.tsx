import React from 'react';
import './App.css';
import create from "zustand";
import { JsonObject } from "./lib/jsonTypes";
import { getPaths } from "./lib/getPaths";
import { createMapFromObject } from "./lib/createMapFromObject";

type AppStore = {
  logs: JsonObject[];
  paths: Set<string>;
  appendLog: (log: JsonObject) => void;
}

const useStore = create<AppStore>((set, get) => ({
  logs: [],
  paths: new Set(),
  appendLog: (log) => {
    console.log('log', log)

    const { logs, paths } = get();

    const newPaths = new Set(paths);
    getPaths(log).forEach((path) => newPaths.add(path))
    console.log('newPaths', newPaths)

    set({
      paths: newPaths,
      logs: logs.concat(log)
    });
  }
}));

const socket = new WebSocket('ws://localhost:3100')
socket.onopen = (event) => {
  console.log('open', event)
}
socket.onclose = (event) => {
  console.log('close', event)
}
socket.onmessage = (event) => {
  try {
    const data = createMapFromObject(JSON.parse(event.data))
    useStore.getState().appendLog(data)
  } catch (e) {
    // nothing
  }
}

function App() {
  const { logs, paths } = useStore();

  return (
    <div className="App">
      <code>{JSON.stringify(Array.from(paths))}</code>
      <hr/>
      {logs.map((log, index) => (
        <code key={index}>{JSON.stringify(log.get('custom_event'))}</code>
      ))}
    </div>
  );
}

export default App;
