import { JsonObject } from "./jsonTypes";
import create from "zustand";
import { getPaths } from "./getPaths";
import { createMapFromObject } from "./createMapFromObject";

export type Log = {
  raw: Object;
  data: JsonObject;
};

type AppStore = {
  logs: Log[];
  rawLogs: Object[];
  paths: Set<string>;
  selectedPaths: Set<string>;
  selectedLog: Log | null;
  sidebarCollapsed: boolean;
  pathSearchQuery: string;
  addLog: (raw: Object) => void;
  addSelectedPath: (path: string) => void;
  removeSelectedPath: (path: string) => void;
  clearSelectedPaths: () => void;
  clearLogs: () => void;
  setSelectedLog: (log: Log) => void;
  clearSelectedLog: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  setPathSearchQuery: (query: string) => void;
};

export const useStore = create<AppStore>((set, get) => ({
  logs: [],
  rawLogs: [],
  paths: new Set(),
  selectedPaths: new Set(),
  selectedLog: null,
  sidebarCollapsed: false,
  pathSearchQuery: "",
  addLog: (raw) => {
    const { logs, paths } = get();

    const map = createMapFromObject(raw);

    const newPaths = new Set(paths);
    getPaths(map).forEach((path) => newPaths.add(path));

    const log = {
      raw: raw,
      data: map,
    };

    set({
      paths: newPaths,
      logs: [log, ...logs],
    });
  },
  addSelectedPath: (path) => {
    const { selectedPaths } = get();

    const newPaths = new Set(Array.from(selectedPaths));
    newPaths.add(path);

    set({ selectedPaths: newPaths });
  },
  removeSelectedPath: (path) => {
    const { selectedPaths } = get();

    const newPaths = new Set(Array.from(selectedPaths));
    newPaths.delete(path);

    set({ selectedPaths: newPaths });
  },
  clearSelectedPaths: () => {
    set({ selectedPaths: new Set() });
  },
  clearLogs: () => {
    set({ logs: [], selectedLog: null });
  },
  setSelectedLog: (log) => set({ selectedLog: log }),
  clearSelectedLog: () => set({ selectedLog: null }),
  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
  setPathSearchQuery: (query) => set({ pathSearchQuery: query }),
}));
