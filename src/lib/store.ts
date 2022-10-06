import { JsonObject } from "./jsonTypes";
import create from "zustand";
import { getPaths } from "./getPaths";
import { createMapFromObject } from "./createMapFromObject";
import { Socket } from "./Socket";
import { v4 } from "uuid";
import { getFromMapAtPath } from "./getFromMapAtPath";

export type Log = {
  raw: Object;
  data: JsonObject;
};

export type Connection = {
  status: "initial" | "open" | "closed";
  socket: Socket;
};

export type Filter = {
  id: string;
  path: string;
  value: string;
  strategy:
    | "contains"
    | "excludes"
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte";
};

type AppStore = {
  logs: Log[];
  rawLogs: Object[];
  paths: Set<string>;
  selectedPaths: Set<string>;
  selectedLog: Log | null;
  sidebarCollapsed: boolean;
  pathSearchQuery: string;
  sectionCollapsed: Record<string, boolean>;
  connections: Record<Socket["address"], Connection>;
  filters: Record<Filter["id"], Filter>;
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
    changes: Omit<Partial<Connection>, "socket">
  ) => void;
  resetConnection: (address: Socket["address"]) => void;
  setSectionCollapsed: (name: string, value: boolean) => void;
  getFilteredLogs: () => Log[];
  addFilter: (filter: Omit<Filter, "id">) => void;
  removeFilter: (id: Filter["id"]) => void;
};

export const useStore = create<AppStore>((set, get) => ({
  logs: [],
  rawLogs: [],
  paths: new Set(),
  selectedPaths: new Set([
    "ts",
    "custom_event.identifier",
    "custom_event.message",
  ]),
  selectedLog: null,
  sidebarCollapsed: false,
  pathSearchQuery: "",
  sectionCollapsed: {},
  connections: {},
  filters: {
    abc123: {
      id: "abc123",
      path: "custom_event.identifier",
      strategy: "neq",
      value: "ControllerActionLogger",
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
  resetConnection: (address) => {
    const connections = get().connections;
    const connection = connections[address];
    if (!connection) {
      return;
    }

    get().updateConnection(address, { status: "initial" });
    connection.socket.reset();
  },
  setSectionCollapsed: (name, value) => {
    const sectionCollapsed = get().sectionCollapsed;
    sectionCollapsed[name] = value;
    set({ sectionCollapsed });
  },
  getFilteredLogs: () => {
    const { logs, ...state } = get();
    const filters = Object.values(state.filters);

    return logs.filter((log) => {
      console.log("filters", filters);

      const filtersPassed = filters.every((filter) => {
        const valueAtPath = getFromMapAtPath(log.data, filter.path);

        console.log("FILTER", log.raw, filter.id, valueAtPath, filter.value);

        switch (filter.strategy) {
          case "contains": {
            return valueAtPath.includes(filter.value);
          }
          case "excludes": {
            return !valueAtPath.includes(filter.value);
          }
          case "eq": {
            return valueAtPath === filter.value;
          }
          case "neq": {
            return valueAtPath !== filter.value;
          }
          case "gt": {
            return valueAtPath > filter.value;
          }
          case "gte": {
            return valueAtPath >= filter.value;
          }
          case "lt": {
            return valueAtPath < filter.value;
          }
          case "lte": {
            return valueAtPath <= filter.value;
          }
        }
      });

      console.log("filtersPassed", filtersPassed);

      return filtersPassed;
    });
  },
  addFilter: (filter) => {
    const filters = get().filters;
    const newFilter = { id: v4(), ...filter };
    filters[newFilter.id] = newFilter;
    set({ filters });
  },
  removeFilter: (id) => {
    const filters = get().filters;
    delete filters[id];
    set({ filters });
  },
}));
