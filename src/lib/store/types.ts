import { JsonObject } from "../jsonTypes";
import { Socket } from "../Socket";

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

export interface AppStoreData {
  logs: Log[];
  paths: Set<string>;
  selectedPaths: Set<string>;
  selectedLog: Log | null;
  sidebarCollapsed: boolean;
  pathSearchQuery: string;
  sectionCollapsed: Record<string, boolean>;
  connections: Record<Socket["address"], Connection>;
  filters: Record<Filter["id"], Filter>;
}

export interface AppStoreFunctions {
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
}

export interface AppStore extends AppStoreData, AppStoreFunctions {}
