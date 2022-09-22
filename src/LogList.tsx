import React, { useCallback } from "react";
import { Log, useStore } from "./lib/store";
import { getFromMapAtPath } from "./lib/getFromMapAtPath";

const Header: React.FC<{ label: string }> = ({ label }) => (
  <th className="text-sm">{label}</th>
);

const DataCell: React.FC<{ value: string; isDate?: boolean }> = ({
  value,
  isDate = false,
}) => {
  let rendered = value;
  if (isDate) {
    rendered = Date.parse(value).toLocaleString();
  }

  return (
    <td className="text-sm">
      <code>{rendered}</code>
    </td>
  );
};

const render = (log: Log, path: string) => {
  if (path === "ts") {
    const value = getFromMapAtPath(log.data, path) as number;
    let result;
    try {
      result = new Date(value * 1000).toISOString();
    } catch (e) {
      console.warn("Failed to render date", value, e);
      result = (value || "").toString();
    }
    return result;
  } else {
    return JSON.stringify(getFromMapAtPath(log.data, path));
  }
};

export const LogList: React.FC = () => {
  const logs = useStore((store) => store.logs);
  const selectedPaths = useStore((store) => Array.from(store.selectedPaths));
  const setSelectedLog = useStore((store) => store.setSelectedLog);

  return (
    <div className="w-full">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            {selectedPaths.map((path) => (
              <Header key={`${path}-header`} label={path} />
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr
              key={index}
              className="even:bg-gray-600 bg-gray-700 hover:bg-amber-600 cursor-pointer"
              onClick={() => setSelectedLog(log)}
            >
              {selectedPaths.map((path) => (
                <DataCell key={`${path}-data`} value={render(log, path)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
