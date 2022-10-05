import React, { FormEvent } from "react";
import { SidebarSection } from "../ui/SidebarSection";

export const ExclusionList: React.FC = () => {
  const handleCreateExclusion = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <SidebarSection title="Exclusions">
      <form onSubmit={handleCreateExclusion}>
        <input
          type="text"
          placeholder="foo.bar.baz"
          className="text-sm border-gray-500 border-2 rounded w-full"
        />
      </form>
    </SidebarSection>
  );
};
