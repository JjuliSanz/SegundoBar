import CardSkeleton from "@/components/menu/CardSkeleton";

const LoadingMenuSkeleton = () => {
  return (
    <section className="pt-10 pb-4 min-h-screen relative bg-primero">
      <nav className="w-full max-w-[80%] mx-auto flex justify-center p-4 border-2 border-quinto bg-segundo rounded-xl animate-pulse">
        <ul className="flex flex-wrap justify-center gap-4">
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
          <li className="w-40 h-5 bg-quinto rounded"></li>
        </ul>
      </nav>

      <div className="p-8 grid grid-cols-1 600:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-20 relative">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </section>
  );
};

export default LoadingMenuSkeleton;
