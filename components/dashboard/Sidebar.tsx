import Link from "next/link";
import SideLinks from "./SideLinks";
// import { auth, signOut } from "@/auth";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import Logo from "../ui/Logo";

const Sidebar = async () => {
  const session = await auth();

  return (
    <div className="min-h-screen w-56 bg-segundo flex flex-col fixed">
      <div className="flex items-center justify-center h-20 border-b border-primero">
        <Link
          href="/"
          className=""
        >
          <Logo className="w-[50px] h-[60px] text-sexto drop-shadow-quinto transition-all duration-300 ease-in-out hover:scale-[.9]" />
        </Link>
      </div>
      <nav className="flex-1 p-4 flex flex-col justify-between">
        <SideLinks />
        {session?.user ? (
          <div className="flex flex-col gap-4 text-quinto font-medium ">
            <h3 className="text-2xl">Bienvenido!</h3>
            <div className="flex items-center gap-2">
              <Image
                src={session.user.image || ""}
                alt="user image"
                width={500}
                height={500}
                className="object-cover w-10 rounded"
              />

              <span className="text-2xl">{session.user.name}</span>
            </div>

            <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
            >
              <button className="w-full text-start rounded hover:bg-cuarto transition-colors duration-300 text-quinto py-2 px-4 text-xl font-medium">
                Cerrar Sesión
              </button>
            </form>
          </div>
        ) : (
          <button className="w-full rounded hover:bg-cuarto  transition-colors duration-300 text-quinto">
            <Link
              href={"/login"}
              className="block text-start py-2 px-4 text-xl font-medium"
            >
              Iniciar Sesión
            </Link>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
