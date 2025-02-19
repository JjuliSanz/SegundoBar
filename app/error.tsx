"use client"; // Error components must be Client Components

import { SadIcon } from "@/assets/icons/SadIcon";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen p-10 flex flex-col items-center gap-2">
      <SadIcon className="w-10 h-10 text-quinto" />
      <h2 className="text-xl text-quinto font-semibold">Algo salió mal</h2>
      <p className="text-lg text-cuarto font-medium">{error.message}</p>
      <button
        onClick={() => reset()}
        className="text-quinto bg-segundo px-4 py-2 rounded"
      >
        Resetear
      </button>
    </div>
  );
}