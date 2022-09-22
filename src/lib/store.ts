import { JsonObject } from "./jsonTypes";
import create from "zustand";
import { getPaths } from "./getPaths";
import { createMapFromObject } from "./createMapFromObject";

type Log = {
  raw: Object;
  data: JsonObject;
}

type AppStore = {
  logs: Log[];
  rawLogs: Object[];
  paths: Set<string>;
  selectedPaths: Set<string>;
  addLog: (raw: Object) => void;
  addSelectedPath: (path: string) => void;
  removeSelectedPath: (path: string) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  logs: [],
  rawLogs: [],
  paths: new Set(),
  selectedPaths: new Set(),
  addLog: (raw) => {
    const { logs, paths } = get();

    const map = createMapFromObject(raw);

    const newPaths = new Set(paths);
    getPaths(map).forEach((path) => newPaths.add(path))

    const log = {
      raw: raw,
      data: map,
    }

    set({
      paths: newPaths,
      logs: [log, ...logs]
    });
  },
  addSelectedPath: (path) => {
    const { selectedPaths } = get();

    const newPaths = new Set(Array.from(selectedPaths))
    newPaths.add(path)

    set({ selectedPaths: newPaths })
  },
  removeSelectedPath: (path) => {
    const { selectedPaths } = get();

    const newPaths = new Set(Array.from(selectedPaths))
    newPaths.delete(path)

    set({ selectedPaths: newPaths })
  }
}));
