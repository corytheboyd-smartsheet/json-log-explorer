import React from "react";
import classNames from "classnames";

export const Toggle: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  return (
    <div
      className={classNames(
        "rounded-full border-2 border-gray-500 w-6 cursor-pointer",
        {
          "bg-gray-700": !enabled,
          "bg-blue-500": enabled,
        }
      )}
    >
      <div
        className={classNames("flex w-full items-center", {
          "justify-start": !enabled,
          "justify-end": enabled,
        })}
      >
        <div
          className={classNames("h-3 w-3 rounded-full", {
            "bg-gray-500": !enabled,
            "bg-blue-300": enabled,
          })}
        ></div>
      </div>
    </div>
  );
};
