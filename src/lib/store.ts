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
  showContentColumn: boolean;
  setShowContentColumn: (value: boolean) => void;
  selectedPaths: Set<string>;
  addLog: (raw: Object) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  logs: [],
  rawLogs: [],
  paths: new Set(),
  showContentColumn: true,
  setShowContentColumn: (value) => set({ showContentColumn: value }),
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
  }
}));
