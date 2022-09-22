import React from 'react';
import './App.css';
import create from "zustand";

type JsonPrimitive =
  | string
  | number
  | boolean;
type JsonArray = Array<JsonPrimitive | JsonArray | JsonObject>
type JsonObject = Map<string, JsonPrimitive | JsonObject | JsonArray>
type JsonLike = JsonPrimitive | JsonArray | JsonObject;

type AppStore = {
  logs: JsonObject[];
  paths: Set<string>;
  appendLog: (log: JsonObject) => void;
}

const getPaths = (object: JsonLike, parts: string[] = []): string[] => {
  const paths: string[] = [];

  if (object instanceof Map) {
    for(const key of object.keys()) {
      paths.push([...parts, key].join('.'));

      const value = object.get(key)
      if (value) {
        paths.concat(getPaths(value, [...parts, key]))
      }
    }
  } else if (object instanceof Array) {

  } else {
    return paths;
  }

  return paths;
}

const useStore = create<AppStore>((set, get) => ({
  logs: [],
  paths: new Set(),
  appendLog: (log) => {
    const { logs, paths } = get();

    getPaths(log).forEach((path) => paths.add(path))

    set({
      paths: paths,
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
  console.debug('message', event.data)
  try {
    const data = new Map(Object.entries(JSON.parse(event.data))) as JsonObject
    console.log('data', data)
    useStore.getState().appendLog(data)
  } catch (e) {
    // nothing
  }
}

function App() {
  const { logs, paths } = useStore();

  return (
    <div className="App">
      <code>{JSON.stringify(paths)}</code>
      <hr/>
      {logs.map((log, index) => (
        <code key={index}>{JSON.stringify(log.get('custom_event'))}</code>
      ))}
    </div>
  );
}

export default App;
