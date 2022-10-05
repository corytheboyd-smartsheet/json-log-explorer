import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import { SidebarSection } from "../ui/SidebarSection";
import { useStore } from "../lib/store";
import classNames from "classnames";
import { Button } from "../ui/Button";

const ValueMatchForm: React.FC = () => {
  const selectedPaths = useStore((state) => state.selectedPaths);
  const isDisabled = selectedPaths.size === 0;

  const handleCreateExclusion = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <p className="font-bold">Value Match</p>
        <p className="italic text-xs text-gray-400">
          Filter logs by matching a value
        </p>
      </div>
      <form onSubmit={handleCreateExclusion} className="text-xs text-black">
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
      </form>
    </div>
  );
};

const InclusionForm: React.FC = () => {
  const selectedPaths = useStore((state) => state.selectedPaths);
  const isDisabled = selectedPaths.size === 0;
  const [state, setState] = useState<{
    path?: string;
    value: string;
    strategy: "include" | "exclude";
  }>({
    value: "",
    strategy: "exclude",
  });

  const handleCreateExclusion = (event: FormEvent) => {
    event.preventDefault();
  };

  const handlePathChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const path = event.target.value;
    setState({ ...state, path });
  };

  const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setState({ ...state, value });
  };

  const handleStrategyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const strategy = event.target.value;
    setState({ ...state, value: strategy });
  };

  const values: string[] = [];
  if (state.path) {
    console.log("PATH SELECTED");
  }

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <p className="font-bold">Inclusion</p>
        <p className="italic text-xs text-gray-400">
          Quickly filter out logs by value
        </p>
      </div>
      <form
        onSubmit={handleCreateExclusion}
        className="text-xs text-black flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-1">
          <select
            name="path"
            id="path"
            className="rounded w-full"
            disabled={isDisabled}
            onChange={handlePathChange}
            value={state.path}
          >
            <option value={""} className="italic" disabled={true}>
              🫵 pick one
            </option>
            {Array.from(selectedPaths).map((path) => (
              <option value={path} key={path} className="text-black">
                {path}
              </option>
            ))}
          </select>

          <select
            name="value"
            id="value"
            className="rounded w-full"
            disabled={isDisabled}
            onChange={handleValueChange}
            value={state.value}
          >
            <option value={undefined} className="italic" disabled={true}>
              🫵 pick one
            </option>
            {values.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>

          <select
            name="strategy"
            id="strategy"
            className="rounded w-full"
            disabled={isDisabled}
            onChange={handleStrategyChange}
            value={state.strategy}
          >
            <option value="include">include</option>
            <option value="exclude">exclude</option>
          </select>
        </div>

        <Button type="submit" buttonClassNames="bg-green-600">
          Add Filter
        </Button>
      </form>
    </div>
  );
};

export const FilterList: React.FC = () => {
  return (
    <SidebarSection title="Filters">
      <div className="space-y-6">
        <InclusionForm />
        {/*<ValueMatchForm />*/}
        <div>
          <p className="font-bold">Filters</p>
          <p className="italic text-xs text-gray-400">No filters added</p>
        </div>
      </div>
    </SidebarSection>
  );
};
