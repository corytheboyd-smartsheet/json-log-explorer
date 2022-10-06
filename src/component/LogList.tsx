import React from "react";
import { Log, useStore } from "../lib/store";
import { getFromMapAtPath } from "../lib/getFromMapAtPath";
import classNames from "classnames";

const Header: React.FC<{ label: string }> = ({ label }) => (
  <th className="text-sm p-2">{label}</th>
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
    <td className="text-xs px-2 overflow-ellipsis">
      <code>{rendered}</code>
    </td>
  );
};

const render = (log: Log, path: string) => {
  return JSON.stringify(getFromMapAtPath(log.data, path));

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

const LogTable: React.FC = () => {
  const logs = useStore((store) => store.getFilteredLogs());
  const selectedPaths = useStore((store) => Array.from(store.selectedPaths));
  const setSelectedLog = useStore((store) => store.setSelectedLog);
  const selectedLog = useStore((store) => store.selectedLog);

  const isSelected = (log: Log): boolean => {
    if (!selectedLog) {
      return false;
    }
    return selectedLog.data.get("ts") === log.data.get("ts");
  };

  return (
    <table className="table-auto w-full text-left whitespace-nowrap text-gray-200">
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
            className={classNames(
              "even:bg-gray-600 bg-gray-700 hover:bg-amber-600 cursor-pointer",
              { "bg-amber-600 even:bg-amber-600": isSelected(log) }
            )}
            onClick={() => setSelectedLog(log)}
          >
            {selectedPaths.map((path) => (
              <DataCell key={`${path}-data`} value={render(log, path)} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const LogList: React.FC = () => {
  const areConnectionsPresent = useStore(
    (state) => Object.keys(state.connections).length > 0
  );
  const arePathsSelected = useStore((state) => state.selectedPaths.size > 0);
  const areLogsPresent = useStore((state) => state.logs.length > 0);

  const showLogsTable =
    areConnectionsPresent && areLogsPresent && arePathsSelected;

  return (
    <div className="w-full overflow-scroll">
      {!showLogsTable && (
        <div className="h-full w-full flex flex-col items-center justify-center text-gray-200">
          <h1 className="text-3xl font-mono">JSON Log Explorer</h1>
          {!areConnectionsPresent && (
            <p className="animate-pulse">
              Add a connection to receive logs from...
            </p>
          )}
          {areConnectionsPresent && !areLogsPresent && (
            <p className="animate-pulse">Waiting for logs...</p>
          )}
          {areConnectionsPresent && areLogsPresent && !arePathsSelected && (
            <p className="animate-pulse">
              Select paths to add table columns...
            </p>
          )}
        </div>
      )}
      {showLogsTable && <LogTable />}
    </div>
  );
};
