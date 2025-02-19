const TableSkeleton = () => {
  return (
    <div className="animate-pulse w-full flex border-b-2 border-quinto">
      <div className="pl-4 py-4">
        <div className="w-[100px] h-[50px] bg-quinto rounded-sm"></div>
      </div>
      <div className="px-6 py-4 flex items-center">
        <div className="w-32 h-4 bg-quinto rounded "></div>
      </div>
      <div className="px-6 py-4 flex items-center">
        <div className="w-32 h-4 bg-quinto rounded "></div>
      </div>
      <div className="px-6 py-4 flex items-center">
        <div className="w-32 h-4 bg-quinto rounded "></div>
      </div>
      <div className="px-6 py-4 flex items-center">
        <div className="w-32 h-4 bg-quinto rounded "></div>
      </div>
      <div className="px-6 py-4 flex items-center">
        <div className="w-32 h-4 bg-quinto rounded "></div>
      </div>
    </div>
  );
};

const LoadingDashboardSkeleton = () => {
  return (
    <main className="flex-1 ml-56 p-8 overflow-hidden">
      <nav className="w-fit max-w-3xl mx-auto flex justify-center p-4 bg-segundo rounded animate-pulse">
        <ul className="w-[700px] h-[100px] flex flex-wrap justify-center gap-4">
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
        </ul>
      </nav>
      <header className="items-center justify-between block sm:flex mt-10 h-5 animate-pulse">
        <div className="w-32 bg-quinto rounded-xl h-5"></div>
        <div className="w-32 bg-quinto rounded-xl h-5"></div>
      </header>
      <div className="w-full h-10 bg-primero mt-10 border-b-2 border-quinto animate-pulse flex items-center justify-between p-6">
        <div className="bg-quinto w-24 h-5 rounded"></div>
        <div className="bg-quinto w-24 h-5 rounded"></div>
        <div className="bg-quinto w-24 h-5 rounded"></div>
        <div className="bg-quinto w-24 h-5 rounded"></div>
        <div className="bg-quinto w-24 h-5 rounded"></div>
      </div>
      <TableSkeleton/>
      <TableSkeleton/>
      <TableSkeleton/>
      <TableSkeleton/>
    </main>
  );
};

export default LoadingDashboardSkeleton;