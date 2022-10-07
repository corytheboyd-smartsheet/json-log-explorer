import create from "zustand";
import { persist } from "zustand/middleware";
import { buildStateCreator } from "./buildStateCreator";
import { buildPersistMiddleware } from "./buildPersistMiddleware";

export const useStore = create(
  persist(buildStateCreator(), buildPersistMiddleware())
);
