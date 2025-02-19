import React from "react";

const CategoryRow = () => {
  return (
    <div
      className={`w-full flex justify-between py-4 border-b border-quinto`}
    >
      <div className="bg-quinto w-28 h-7 rounded"></div>
      <div className="flex gap-2">
        <div className="bg-quinto w-16 h-7 rounded"></div>
        <div className="bg-quinto w-16 h-7 rounded"></div>
      </div>
    </div>
  );
};

const CategoriesSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <CategoryRow />
      <CategoryRow />
      <CategoryRow />
      <CategoryRow />
      <CategoryRow />
      <CategoryRow />      
    </div>
  );
};

export default CategoriesSkeleton;
