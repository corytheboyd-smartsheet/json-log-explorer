import React, { useCallback } from "react";
import { Button } from "../ui/Button";
import { SidebarSection } from "../ui/SidebarSection";
import classNames from "classnames";
import { Input } from "../ui/Input";
import { useStore } from "../lib/store/useStore";

const Path: React.FC<{ path: string }> = ({ path }) => {
  const addSelectedPath = useStore((store) => store.addSelectedPath);
  const setPathSearchQuery = useStore((store) => store.setPathSearchQuery);
  const removeSelectedPath = useStore((store) => store.removeSelectedPath);
  const isSelected = useStore((store) => store.selectedPaths.has(path));

  const handleClick = useCallback(() => {
    if (isSelected) {
      removeSelectedPath(path);
    } else {
      addSelectedPath(path);
    }
    setPathSearchQuery("");
  }, [
    addSelectedPath,
    removeSelectedPath,
    path,
    isSelected,
    setPathSearchQuery,
  ]);

  return (
    <li
      className={classNames(
        "hover:bg-amber-500 hover:text-amber-200 transition-colors cursor-pointer rounded px-1",
        {
          "bg-amber-200 text-amber-800": isSelected,
        }
      )}
      onClick={handleClick}
    >
      <code>{path}</code>
    </li>
  );
};

export const PathList: React.FC = () => {
  const allPaths = useStore((store) => store.paths);
  const selectedPaths = useStore((store) => store.selectedPaths);
  const pathSearchQuery = useStore((store) => store.pathSearchQuery);
  const setPathSearchQuery = useStore((store) => store.setPathSearchQuery);
  const clearSelectedPaths = useStore((store) => store.clearSelectedPaths);

  const handleClearSelectedPaths = useCallback(() => {
    clearSelectedPaths();
  }, [clearSelectedPaths]);

  const filteredUnselectedPaths = Array.from(allPaths).filter((path) =>
    path.includes(pathSearchQuery)
  );

  return (
    <SidebarSection title="Paths">
      <div className="space-y-2">
        <Button
          onClick={handleClearSelectedPaths}
          buttonClassNames="bg-blue-500"
        >
          Unselect All Paths
        </Button>

        <p className="font-bold">Selected</p>
        {selectedPaths.size === 0 && (
          <p className="italic text-xs text-gray-400">None selected</p>
        )}
        {selectedPaths.size > 0 && (
          <ul className="space-y-0.5 text-xs">
            {Array.from(selectedPaths).map((path) => (
              <Path key={path} path={path} />
            ))}
          </ul>
        )}

        <p className="font-bold">All</p>
        <Input
          type="search"
          placeholder="foo.bar.baz"
          inputClassNames={classNames({
            "cursor-not-allowed": allPaths.size === 0,
          })}
          disabled={allPaths.size === 0}
          value={pathSearchQuery}
          onChange={(e) => setPathSearchQuery(e.target.value)}
        />
        {allPaths.size === 0 && (
          <p className="italic text-xs text-gray-400">Nothing extracted yet</p>
        )}
        {allPaths.size > 0 && (
          <ul className="space-y-0.5 text-xs">
            {filteredUnselectedPaths.map((path) => (
              <Path key={path} path={path} />
            ))}
          </ul>
        )}
      </div>
    </SidebarSection>
  );
};
