import { JsonLike } from "./jsonTypes";

export const getPaths = (object: JsonLike, currentPathParts: string[] = []): string[] => {
  const paths = new Set<string>();

  if (object instanceof Map) {
    for(const key of object.keys()) {
      paths.add([...currentPathParts, key].join('.'))
      const value = object.get(key)
      if (value) {
        getPaths(value, [...currentPathParts, key])
          .forEach(path => paths.add(path))
      }
    }
  } else if (object instanceof Array) {
    const newCurrentPathParts = [
      ...currentPathParts.slice(0, -1),
      `${currentPathParts[currentPathParts.length - 1]}[]`
    ]
    object.map(value => new Set(getPaths(value, newCurrentPathParts)))
      .forEach(p => p.forEach(path => paths.add(path)))
  } else {
    return Array.from(paths);
  }

  return Array.from(paths);
}
