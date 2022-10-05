import React, { useCallback } from "react";
import { useStore } from "./lib/store";
import { SidebarButton } from "./ui/SidebarButton";

const Path: React.FC<{ path: string }> = ({ path }) => {
  const addSelectedPath = useStore((store) => store.addSelectedPath);
  const removeSelectedPath = useStore((store) => store.removeSelectedPath);
  const isSelected = useStore((store) => store.selectedPaths.has(path));

  const handleClick = useCallback(() => {
    console.log("handleClick", isSelected);

    if (isSelected) {
      removeSelectedPath(path);
    } else {
      addSelectedPath(path);
    }
  }, [addSelectedPath, removeSelectedPath, path, isSelected]);

  let selectedClasses = "";
  if (isSelected) {
    selectedClasses = "bg-amber-200";
  }

  return (
    <li
      className={`${selectedClasses} hover:bg-amber-50 transition-colors cursor-pointer`}
      onClick={handleClick}
    >
      <code>{path}</code>
    </li>
  );
};

export const PathList: React.FC = () => {
  const paths = useStore((store) => store.paths);
  const pathSearchQuery = useStore((store) => store.pathSearchQuery);
  const setPathSearchQuery = useStore((store) => store.setPathSearchQuery);
  const clearSelectedPaths = useStore((store) => store.clearSelectedPaths);

  const handleClearSelectedPaths = useCallback(() => {
    clearSelectedPaths();
  }, [clearSelectedPaths]);

  const filteredPaths = Array.from(paths).filter((path) =>
    path.includes(pathSearchQuery)
  );

  return (
    <div className="space-y-2">
      <div className="font-bold text-center">Paths</div>
      <SidebarButton
        onClick={handleClearSelectedPaths}
        buttonClassNames="bg-blue-500"
      >
        Unselect All Paths
      </SidebarButton>
      <div className="flex">
        <input
          type="search"
          placeholder="foo.bar.baz"
          className="text-sm border-gray-500 border-2 rounded w-full"
          value={pathSearchQuery}
          onChange={(e) => setPathSearchQuery(e.target.value)}
        />
      </div>
      <ul className="space-y-0.5 text-xs pb-10">
        {filteredPaths.map((path) => (
          <Path key={path} path={path} />
        ))}
      </ul>
    </div>
  );
};
