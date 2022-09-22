import React from 'react';
import create from "zustand";
import { JsonObject } from "./lib/jsonTypes";
import { getPaths } from "./lib/getPaths";
import { createMapFromObject } from "./lib/createMapFromObject";

type AppStore = {
  logs: JsonObject[];
  paths: Set<string>;
  selectedPaths: Set<string>;
  appendLog: (log: JsonObject) => void;
}

const useStore = create<AppStore>((set, get) => ({
  logs: [],
  paths: new Set(),
  selectedPaths: new Set(),
  appendLog: (log) => {
    const { logs, paths } = get();

    const newPaths = new Set(paths);
    getPaths(log).forEach((path) => newPaths.add(path))

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
    <div className="bg-amber-50 h-screen w-screen">
      <div className="flex">
        <div className="bg-red-200 h-screen">
          <ul>
            {Array.from(paths).map(path => (
              <li key={path}>{path}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-200 flex flex-col w-screen">
          {logs.map((log, index) => (
            <div className="bg-green-200 odd:bg-orange-200" key={index}>
              <code>{JSON.stringify(Object.fromEntries(Array.from(log)))}</code>
            </div>
          ))}
        </div>
      </div>

      <hr/>
    </div>
  );
}

export default App;

// const object = {
//   "dd": {
//     "trace_id": "3463073768481979146",
//     "span_id": "3504612468142539690"
//   },
//   "ddsource": [
//     "ruby"
//   ],
//   "audit": false,
//   "lvl": "INFO",
//   "ts": 1663797107.346173,
//   "rails_console": false,
//   "context": {
//     "priority": "low",
//     "request_id": "5a63e4a6-ba32-4361-934e-565eaaa321ac",
//     "skip_indexing": false,
//     "skip_notifications": false
//   },
//   "custom_event": {
//     "event": "fail_svc_filemover!",
//     "message": "status changed from `waiting_for_svc_filemover_move` to `failed_svc_filemover_move`",
//     "from_state": "waiting_for_svc_filemover_move",
//     "to_state": "failed_svc_filemover_move",
//     "attachment_key": "7kjs9gps3q56gbfsgfrjsz",
//     "version_id": 59,
//     "identifier": "attachment.status_machine",
//     "groups": [
//       "attachment:ingest"
//     ]
//   }
// }
// console.debug('OBJECT', object)
// const map = createMapFromObject(object)
// console.debug('MAP', map)
// const paths = getPaths(map)
// console.debug('PATHS', paths)
