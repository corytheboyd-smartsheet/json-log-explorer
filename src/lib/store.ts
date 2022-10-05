import { JsonObject } from "./jsonTypes";
import create from "zustand";
import { getPaths } from "./getPaths";
import { createMapFromObject } from "./createMapFromObject";
import { Socket } from "./Socket";

export type Log = {
  raw: Object;
  data: JsonObject;
};

export type Connection = {
  status: "initial" | "open" | "closed";
  socket: Socket;
};

type AppStore = {
  logs: Log[];
  rawLogs: Object[];
  paths: Set<string>;
  selectedPaths: Set<string>;
  selectedLog: Log | null;
  sidebarCollapsed: boolean;
  pathSearchQuery: string;
  connections: Record<Socket["address"], Connection>;
  addLog: (raw: Object) => void;
  addSelectedPath: (path: string) => void;
  removeSelectedPath: (path: string) => void;
  clearSelectedPaths: () => void;
  clearLogs: () => void;
  setSelectedLog: (log: Log) => void;
  clearSelectedLog: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  setPathSearchQuery: (query: string) => void;
  addConnection: (address: Socket["address"]) => void;
  removeConnection: (address: Socket["address"]) => void;
  updateConnection: (
    address: Socket["address"],
    changes: Omit<Partial<Socket>, "address" | "socket">
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
    "localhost:3010": {
      status: "initial",
      socket: new Socket("localhost:3010"),
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
  addConnection: (address) => {
    const connections = get().connections;
    if (connections[address]) {
      return;
    }

    connections[address] = {
      status: "initial",
      socket: new Socket(address),
    };
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
