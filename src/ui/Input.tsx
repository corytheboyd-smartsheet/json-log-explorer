import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

export const Input: React.FC<
  InputHTMLAttributes<any> & { inputClassNames?: string }
> = ({ inputClassNames = "", ...rest }) => {
  return (
    <input
      className={classNames(
        "text-sm text-black rounded w-full px-1",
        inputClassNames
      )}
      {...rest}
    />
  );
};
