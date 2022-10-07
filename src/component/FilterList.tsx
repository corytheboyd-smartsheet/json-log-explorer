import React, { FormEventHandler } from "react";
import { SidebarSection } from "../ui/SidebarSection";
import { Input } from "../ui/Input";
import classNames from "classnames";
import { Filter } from "../lib/store/types";
import { useStore } from "../lib/store/useStore";

const ValueMatchForm: React.FC = () => {
  const selectedPaths = useStore((state) => state.selectedPaths);
  const addFilter = useStore((state) => state.addFilter);
  const isDisabled = selectedPaths.size === 0;

  const handleCreateExclusion: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const path = data.get("path") as string;
    const strategy = data.get("strategy") as Filter["strategy"];
    const value = data.get("value") as string;
    console.log(path, strategy, value);
    addFilter({
      path,
      strategy,
      value,
    });
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
              <option value="eq">{"=="}</option>
              <option value="neq">{"!="}</option>
              <option value="gt">{">"}</option>
              <option value="gte">{">="}</option>
              <option value="lt">{"<"}</option>
              <option value="lte">{"<="}</option>
            </select>
          </div>

          <Input
            type="text"
            id="value"
            name="value"
            placeholder="Filter match value..."
            disabled={isDisabled}
          />
        </div>
      </form>
    </div>
  );
};

const FilterListItem: React.FC<{ filter: Filter }> = ({ filter }) => {
  const removeFilter = useStore((state) => state.removeFilter);

  return (
    <li
      key={filter.id}
      className="bg-gray-100 rounded text-gray-800 text-xs font-mono p-1"
    >
      <div className="flex items-center">
        <div className="flex-grow">
          <span className="text-gray-600">
            <span className="bg-gray-300 px-1 rounded">{filter.path}</span>{" "}
            <span
              className={classNames("px-1 rounded", {
                "bg-green-200":
                  filter.strategy === "contains" || filter.strategy === "eq",
                "bg-red-200":
                  filter.strategy === "excludes" || filter.strategy === "neq",
                "bg-gray-200":
                  filter.strategy === "gt" ||
                  filter.strategy === "gte" ||
                  filter.strategy === "lt" ||
                  filter.strategy === "lte",
              })}
            >
              {filter.strategy === "contains" && "contains"}
              {filter.strategy === "excludes" && "excludes"}
              {filter.strategy === "eq" && "=="}
              {filter.strategy === "neq" && "!="}
              {filter.strategy === "gt" && ">"}
              {filter.strategy === "gte" && ">="}
              {filter.strategy === "lt" && "<"}
              {filter.strategy === "lte" && "<="}
            </span>{" "}
            <span className="bg-gray-300 px-1 rounded">{filter.value}</span>
          </span>
        </div>
        <div>
          <button
            className="bg-red-400 hover:bg-red-500 w-10 rounded text-white"
            onClick={() => removeFilter(filter.id)}
          >
            Del
          </button>
        </div>
      </div>
    </li>
  );
};

export const FilterList: React.FC = () => {
  const filters = useStore((state) => Object.values(state.filters));
  const areFiltersPresent = filters.length > 0;

  return (
    <SidebarSection title="Filters">
      <div className="space-y-6">
        {/*<InclusionForm />*/}
        <ValueMatchForm />
        <div>
          <p className="font-bold">Filters</p>
          {!areFiltersPresent && (
            <p className="italic text-xs text-gray-400">No filters added</p>
          )}
          {areFiltersPresent && (
            <div className="flex flex-col space-y-2">
              <p className="italic text-xs text-gray-400">
                Conditions to filter logs with
              </p>
              <ul className="space-y-1">
                {filters.map((filter) => (
                  <FilterListItem key={filter.id} filter={filter} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </SidebarSection>
  );
};
