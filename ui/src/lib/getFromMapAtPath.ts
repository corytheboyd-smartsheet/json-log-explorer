export const getFromMapAtPath = (map: Map<string, any>, path: string): any => {
  const parts = path.split(".");
  let currentValue: Map<string, any> = map;
  let isList = false;
  parts.forEach((part) => {
    if (currentValue) {
      if (part.endsWith("[]")) {
        if (!isList) {
          currentValue = currentValue.get(part.slice(0, -2));
          isList = true;
        }
      } else {
        currentValue = currentValue.get(part);
      }
    }
  });
  return currentValue;
};
