import React from "react";
import { JsonObject } from "./lib/jsonTypes";

export const LogLine: React.FC<{ data: JsonObject }> = ({ data }) => {
  return (
    <div className="bg-green-200 odd:bg-orange-200">
      <code>{JSON.stringify(Object.fromEntries(Array.from(data)))}</code>
    </div>
  )
}
