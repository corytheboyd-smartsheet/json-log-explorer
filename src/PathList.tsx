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
    <li className={`${selectedClasses} hover:bg-red-300 transition-colors cursor-pointer`} onClick={handleClick}><code>{path}</code></li>
  )
}

export const PathList: React.FC = () => {
  const paths = useStore(store => store.paths)

  return(
    <div className="space-y-2">
      <div className="font-bold text-center">Extracted Paths</div>
      <div className="px-2">
        <ul className="space-y-0.5 text-xs">
          {Array.from(paths).map(path => (
            <Path key={path} path={path} />
          ))}
        </ul>
      </div>
    </div>
  )
}
