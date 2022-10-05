import React, { ButtonHTMLAttributes } from "react";
import "./SidebarButton.css";
import classNames from "classnames";

export const Button: React.FC<
  ButtonHTMLAttributes<any> & { buttonClassNames?: string }
> = ({ buttonClassNames, ...rest }) => {
  return (
    <button
      className={classNames("SidebarButton", buttonClassNames)}
      {...rest}
    />
  );
};
