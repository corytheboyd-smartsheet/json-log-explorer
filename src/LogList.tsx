import React from "react";
import { useStore } from "./lib/store";
import { JsonPrimitive } from "./lib/jsonTypes";

const Header: React.FC<{ label: string }> = ({ label }) => (
  <th>
    {label}
  </th>
)

const DataCell: React.FC<{ value: JsonPrimitive }> = ({ value }) => {
  return (
    <td className="text-sm">
      {value}
    </td>
  );
}

export const LogList: React.FC = () => {
  const showContentColumn = useStore(store => store.showContentColumn)
  const logs = useStore(store => store.logs)
  const selectedPaths = useStore(store => store.selectedPaths)

  return (
    <div className="w-full">
      <table className="table-auto w-full">
        <thead>
          {showContentColumn && (
            <tr>
              <Header label="Content" />
            </tr>
          )}
          {Array.from(selectedPaths).map((path) => (
            <Header label={path} />
          ))}
        </thead>
        <tbody>
        {logs.map((log, index) => (
          <tr key={index} className="bg-yellow-200 even:bg-yellow-50 whitespace-nowrap overflow-ellipsis">
            {showContentColumn && (
              <DataCell value={JSON.stringify(log.raw)} />
            )}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
