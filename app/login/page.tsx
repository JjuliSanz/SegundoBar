import SignIn from "@/components/SignIn"

const Login = () => {
  return (
    <main className="min-h-screen py-10 flex flex-col items-center justify-center gap-4">
      <h3 className="text-quinto text-3xl font-medium">Por favor Inicia Sesión para continuar</h3>
      <SignIn/>
    </main>
  );
};

export default Login;
