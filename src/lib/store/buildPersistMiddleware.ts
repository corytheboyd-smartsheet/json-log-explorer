import { buildDefaultStateData } from "./buildDefaultStateData";
import { AppStore, Log } from "./types";
import { createMapFromObject } from "../createMapFromObject";
import { buildStateCreator } from "./buildStateCreator";
import { PersistOptions } from "zustand/middleware/persist";

export const buildPersistMiddleware = (): PersistOptions<AppStore> => {
  return {
    name: "json-log-explorer",
    serialize: (storageValue) => {
      const normalizedState: Record<string, any> = {};

      Object.entries(storageValue.state).forEach(([key, value]) => {
        if (key === "logs") {
          normalizedState[key] = storageValue.state.logs.map((log) => log.raw);
        }
      });

      return JSON.stringify({ state: normalizedState });
    },
    deserialize: (string) => {
      const normalizedState = JSON.parse(string);
      const hydratedState = buildDefaultStateData();

      Object.keys(normalizedState).forEach((key) => {
        if (key === "logs") {
          const logsData = normalizedState.logs as Log["raw"][];
          logsData.forEach((logData) => {
            hydratedState.logs.push({
              data: createMapFromObject(logData),
              raw: logData,
            });
          });
        }
      });

      return {
        state: buildStateCreator(hydratedState),
      };
    },
  };
};
