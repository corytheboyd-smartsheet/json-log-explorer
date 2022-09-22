import { useStore } from "./lib/store";

export const PathList: React.FC = () => {
  const paths = useStore(store => store.paths)

  return(
    <div>
      <ul>
        {Array.from(paths).map(path => (
          <li key={path}>{path}</li>
        ))}
      </ul>
    </div>
  )
}
