import React from "react";
import { useStore } from "./lib/store";
import { JsonPrimitive } from "./lib/jsonTypes";
import { getFromMapAtPath } from "./lib/getFromMapAtPath";

const Header: React.FC<{ label: string }> = ({ label }) => (
  <th className="text-sm">
    {label}
  </th>
)

const DataCell: React.FC<{ value: JsonPrimitive }> = ({ value }) => {
  return (
    <td className="text-sm">
      <code>{value}</code>
    </td>
  );
}

export const LogList: React.FC = () => {
  const showContentColumn = useStore(store => store.showContentColumn)
  const logs = useStore(store => store.logs)
  const selectedPaths = useStore(store => Array.from(store.selectedPaths))

  return (
    <div className="w-full">
      <table className="table-auto w-full text-left">
        <thead>
          {showContentColumn && (
            <tr>
              <Header label="Content" />
            </tr>
          )}
          {selectedPaths.map((path) => (
            <Header key={`${path}-header`} label={path} />
          ))}
        </thead>
        <tbody>
        {logs.map((log, index) => (
          <tr key={index} className="bg-yellow-100 even:bg-yellow-50">
            {showContentColumn && (
              <DataCell value={JSON.stringify(log.raw)} />
            )}
            {selectedPaths.map((path) => (
              <DataCell key={`${path}-data`} value={JSON.stringify(getFromMapAtPath(log.data, path))} />
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
