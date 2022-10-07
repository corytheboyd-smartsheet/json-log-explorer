import React from "react";
import { useStore } from "../lib/store/useStore";

export const SelectedLogView: React.FC = () => {
  const selectedLog = useStore((store) => store.selectedLog);
  const clearSelectedLog = useStore((store) => store.clearSelectedLog);

  if (!selectedLog) {
    return null;
  }

  return (
    <div className="bg-gray-700 text-gray-800 p-3 flex flex-col space-y-3 max-w-xl h-screen p-3 border-l-8 border-gray-800">
      <div className="flex justify-end">
        <button
          className="bg-gray-300 rounded px-5 py-2"
          onClick={() => clearSelectedLog()}
        >
          Close
        </button>
      </div>
      <pre className="text-xs bg-gray-600 text-gray-100 p-2 h-fit rounded shadow-inner overflow-scroll">
        <code>{JSON.stringify(selectedLog.raw, null, 2)}</code>
      </pre>
    </div>
  );
};
