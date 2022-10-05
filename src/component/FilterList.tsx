import React, { FormEvent } from "react";
import { SidebarSection } from "../ui/SidebarSection";
import { useStore } from "../lib/store";
import classNames from "classnames";

export const FilterList: React.FC = () => {
  const selectedPaths = useStore((state) => state.selectedPaths);

  const isDisabled = selectedPaths.size === 0;

  const handleCreateExclusion = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <SidebarSection title="Filters">
      <div className="space-y-4">
        <form onSubmit={handleCreateExclusion} className="text-xs text-black">
          <div className="flex items-center space-x-1">
            <div className="flex flex-col space-y-1 flex-grow">
              <div className="flex items-center space-x-1">
                <select
                  name="path"
                  id="path"
                  className="rounded w-full"
                  disabled={isDisabled}
                >
                  {Array.from(selectedPaths).map((path) => (
                    <option value={path} key={path} className="text-black">
                      {path}
                    </option>
                  ))}
                </select>

                <select
                  name="strategy"
                  id="strategy"
                  className="rounded w-full"
                  disabled={isDisabled}
                >
                  <option value="contains">{"contains"}</option>
                  <option value="excludes">{"excludes"}</option>
                  <option value="equals">{"equals"}</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Filter match value..."
                className="border-gray-500 border-2 rounded w-full h-full px-1 border-none"
                disabled={isDisabled}
              />
            </div>

            <button
              className={classNames(
                "rounded px-2 flex-grow-0 h-9",
                { "bg-green-400 text-green-700": !isDisabled },
                { "bg-green-800 text-green-700": isDisabled }
              )}
              disabled={isDisabled}
            >
              Add
            </button>
          </div>
        </form>

        <div>
          <p className="font-bold">Filters</p>
          <p className="italic text-xs text-gray-400">No filters added</p>
        </div>
      </div>
    </SidebarSection>
  );
};
