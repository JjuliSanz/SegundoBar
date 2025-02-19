import React from "react";

const MenuCardSkeleton = () => {
  return (
    <div className="w-[400px] h-[350px] flex flex-col gap-3 p-2 rounded-2xl relative bg-segundo box-shadow-quinto-xs animate-pulse">
      <div
        className="box-shadow-quinto-xs mx-auto object-cover rounded-full 
          w-[130px] min-w-[130px] h-[130px] min-h-[130px] 
          500:w-[140px] 500:min-w-[140px] 500:h-[140px] 500:min-h-[140px] 
          md:w-[150px] md:min-w-[150px] md:h-[150px] md:min-h-[150px] 
          lg:w-[170px] lg:min-w-[170px] lg:min-h-[170px] lg:h-[170px] animate-pulse"
      ></div>

      <div className="w-full h-full flex flex-col justify-between items-center text-shadow-quinto-sm animate-pulse">
        <div className="w-full flex flex-col items-center gap-3">
          {/* TITLE */}
          <h3 className="h-6 w-32 rounded-lg bg-quinto"></h3>
          {/* INGREDIENTS */}
          <p className="h-11 w-44 rounded-lg bg-quinto"></p>
        </div>
        {/* PRICE */}
        <span className="h-6 w-20 rounded-lg bg-quinto"></span>
      </div>
    </div>
  );
};

const MenuLoadingSkeleton = () => {
  return (
    <div className="w-full rounded-2xl relative bg-primero p-2 gap-4 grid grid-cols-2 auto-rows-auto sm:grid-cols-3 ">
      <MenuCardSkeleton />
      <MenuCardSkeleton />
      <MenuCardSkeleton />
      <MenuCardSkeleton />
      <MenuCardSkeleton />
      <MenuCardSkeleton />
    </div>
  );
};

export default MenuLoadingSkeleton;
