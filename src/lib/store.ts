import { JsonObject } from "./jsonTypes";
import create from "zustand";
import { getPaths } from "./getPaths";
import { createMapFromObject } from "./createMapFromObject";

export type Log = {
  raw: Object;
  data: JsonObject;
};

export type Connection = {
  address: string;
  status: "initial" | "open" | "closed";
};

type AppStore = {
  logs: Log[];
  rawLogs: Object[];
  paths: Set<string>;
  selectedPaths: Set<string>;
  selectedLog: Log | null;
  sidebarCollapsed: boolean;
  pathSearchQuery: string;
  connections: Record<Connection["address"], Connection>;
  addLog: (raw: Object) => void;
  addSelectedPath: (path: string) => void;
  removeSelectedPath: (path: string) => void;
  clearSelectedPaths: () => void;
  clearLogs: () => void;
  setSelectedLog: (log: Log) => void;
  clearSelectedLog: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  setPathSearchQuery: (query: string) => void;
  addConnection: (connection: Connection) => void;
  removeConnection: (address: Connection["address"]) => void;
  updateConnection: (
    address: Connection["address"],
    changes: Omit<Partial<Connection>, "address">
  ) => void;
};

export const useStore = create<AppStore>((set, get) => ({
  logs: [],
  rawLogs: [],
  paths: new Set(),
  selectedPaths: new Set(),
  selectedLog: null,
  sidebarCollapsed: false,
  pathSearchQuery: "",
  connections: {
    "localhost:3100": {
      address: "localhost:3100",
      status: "closed",
    },
  },
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
  addConnection: (connection) => {
    const connections = get().connections;
    connections[connection.address] = connection;
    set({ connections });
  },
  removeConnection: (address) => {
    const connections = get().connections;
    delete connections[address];
    set({ connections });
  },
  updateConnection: (address, changes) => {
    const connections = get().connections;
    const current = connections[address];
    connections[address] = { ...current, ...changes };
    set({ connections });
  },
}));
