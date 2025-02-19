import { SadIcon } from "@/assets/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <SadIcon className="w-20 h-w-20 text-quinto" />
      <h2 className="text-3xl text-quinto font-semibold">
        No se ha encontrado la ruta
      </h2>

      <Link
        href="/"
        className="motion-safe:transition duration-300 ease-in-out font-medium uppercase text-xl px-6 py-3 rounded-xl outline-none focus:outline-none hover:scale-[.98] flex items-center gap-2 bg-segundo border-2 border-quinto text-quinto text-shadow-quinto-xs box-shadow-cuarto-xs hover:bg-cuarto  hover:shadow-none hover:border-cuarto active:bg-tercero  active:border-tercero active:shadow-none font-sans"
      >
        Regresa al Inicio
      </Link>
    </div>
  );
}
