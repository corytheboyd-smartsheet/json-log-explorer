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
  const logs = useStore(store => store.logs)
  const selectedPaths = useStore(store => Array.from(store.selectedPaths))

  return (
    <div className="w-full">
      <table className="table-auto w-full text-left">
        <thead>
          {selectedPaths.map((path) => (
            <Header key={`${path}-header`} label={path} />
          ))}
        </thead>
        <tbody>
        {logs.map((log, index) => (
          <tr key={index} className="even:bg-gray-600 bg-gray-700">
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
