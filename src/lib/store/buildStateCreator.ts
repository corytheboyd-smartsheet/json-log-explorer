import { StateCreator } from "zustand";
import { AppStore, AppStoreData } from "./types";
import { createMapFromObject } from "../createMapFromObject";
import { getPaths } from "../getPaths";
import { Socket } from "../Socket";
import { getFromMapAtPath } from "../getFromMapAtPath";
import { v4 } from "uuid";
import { buildDefaultStateData } from "./buildDefaultStateData";

export const buildStateCreator = (
  dataOverrides: Partial<AppStoreData> = {}
): StateCreator<AppStore, any> => {
  return (set, get) => ({
    ...{
      ...buildDefaultStateData(),
      ...dataOverrides,
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
        return filters.every((filter) => {
          const valueAtPath = getFromMapAtPath(log.data, filter.path);

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
            default: {
              return true;
            }
          }
        });
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
  });
};
