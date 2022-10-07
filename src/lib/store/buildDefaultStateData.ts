import { AppStoreData } from "./types";

export const buildDefaultStateData = (): AppStoreData => {
  return {
    logs: [],
    paths: new Set<string>(),
    selectedPaths: new Set<string>(),
    selectedLog: null,
    sidebarCollapsed: false,
    pathSearchQuery: "",
    sectionCollapsed: {},
    connections: {},
    filters: {},
  };
};
