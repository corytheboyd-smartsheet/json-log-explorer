import React from "react";

export const SidebarSection: React.FC<
  React.PropsWithChildren & { title?: string }
> = ({ title, children }) => {
  const hasTitle = Boolean(title);

  return (
    <div className="space-y-1">
      {hasTitle && <div className="font-bold text-center">{title}</div>}
      <div>{children}</div>
    </div>
  );
};
