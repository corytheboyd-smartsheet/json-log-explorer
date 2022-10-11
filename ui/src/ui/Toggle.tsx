import React from "react";
import classNames from "classnames";

export const Toggle: React.FC<{ enabled: boolean; onClick: () => void }> = ({
  enabled,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        "rounded-full border-2 border-gray-500 w-6 cursor-pointer",
        {
          "bg-gray-700": !enabled,
          "bg-blue-500": enabled,
        }
      )}
      onClick={onClick}
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
    </button>
  );
};
