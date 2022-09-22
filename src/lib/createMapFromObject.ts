export const createMapFromObject = <T=any>(object: Object): Map<string, T> => {
  const map = new Map()
  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof Array) {
      map.set(
        key,
        value.map(v => {
          if (v instanceof Array) {
            return v.map(_v => createMapFromObject(_v))
          } else if (v instanceof Object) {
            return createMapFromObject(v)
          } else {
            return v
          }
        })
      )
    } else if (value instanceof Object) {
      map.set(key, createMapFromObject(value))
    } else {
      map.set(key, value)
    }
  })
  return map
}
