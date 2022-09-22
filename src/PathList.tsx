import React, { useCallback } from "react";
import { useStore } from "./lib/store";

const Path: React.FC<{path: string}> = ({path}) => {
  const addSelectedPath = useStore(store => store.addSelectedPath)
  const removeSelectedPath = useStore(store => store.removeSelectedPath)
  const isSelected = useStore(store => store.selectedPaths.has(path));

  const handleClick = useCallback(() => {
    console.log('handleClick', isSelected)

    if (isSelected) {
      removeSelectedPath(path)
    } else {
      addSelectedPath(path)
    }
  }, [addSelectedPath, removeSelectedPath, path, isSelected])

  let selectedClasses = ''
  if (isSelected) {
    selectedClasses = 'bg-red-500 text-white'
  }

  return (
    <li className={`${selectedClasses} hover:bg-red-300 transition-colors cursor-pointer`} onClick={handleClick}>{path}</li>
  )
}

export const PathList: React.FC = () => {
  const paths = useStore(store => store.paths)

  return(
    <div>
      <ul>
        {Array.from(paths).map(path => (
          <Path key={path} path={path} />
        ))}
      </ul>
    </div>
  )
}
