import React from "react";

export const SidebarSection: React.FC<
  React.PropsWithChildren & { title?: string }
> = ({ title, children }) => {
  const hasTitle = Boolean(title);

  return (
    <div className="space-y-1">
      {hasTitle && (
        <div className="mb-5 font-bold text-center bg-green-200 text-green-800">
          {title}
        </div>
      )}
      <div className="px-3">{children}</div>
    </div>
  );
};
