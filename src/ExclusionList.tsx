import React from "react";

export const ExclusionList: React.FC = () => {
  return (
    <div>
      <div className="font-bold text-center">Exclusions</div>
      <div className="flex">
        <input
          type="search"
          placeholder="foo.bar.baz"
          className="text-sm border-gray-500 border-2 rounded w-full"
        />
      </div>
    </div>
  );
};
