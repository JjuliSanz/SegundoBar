import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primero text-quinto border border-quinto text-2xl font-bold rounded hover:bg-quinto hover:text-segundo outline-none focus:outline-none hover:scale-95 active:scale-95 transition duration-300"
      >
        Iniciar Sesión con Google
      </button>
    </form>
  );
}
