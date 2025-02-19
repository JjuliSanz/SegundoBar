const CardSkeleton = () => {
  return (
    <div className="rounded-lg flex flex-col animate-pulse">
      {/* IMAGE */}
      <div className="relative w-full min-h-60 max-h-60 bg-segundo rounded-t-lg"></div>

      <div className="w-full flex flex-col grow justify-between gap-4 p-4 min-h-[150px] bg-tercero">
        {/* TITLE AND DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-[80%] bg-sexto"></div>
          <div className="h-10 w-full bg-sexto"></div>
        </div>
        {/* BUTTONS AND PRICE */}
        <div className="w-full flex justify-between items-center">
          <div className="w-20 h-6 bg-sexto"></div>
          <div className="w-20 h-6 bg-sexto"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
