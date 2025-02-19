"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}

const errorMap = {
  [Error.Configuration]: (
    <>
      <p className="text-quinto text-3xl font-medium">
        Hubo un problema con la configuración de la autenticación.
      </p>
      <p className="text-xl font-medium text-quinto">
        Código de error único:{" "}
        <code className="text-lg bg-primero p-1 rounded-sm">Configuration</code>
      </p>
    </>
  ),
  [Error.AccessDenied]: (
    <>
      <p className="text-quinto text-3xl font-medium">
        Acceso denegado. Puede que no tengas los permisos necesarios para
        acceder a esta página.
      </p>
      <p className="text-xl font-medium text-quinto">
        Código de error único:{" "}
        <code className="text-lg bg-primero p-1 rounded-sm">AccessDenied</code>
      </p>
    </>
  ),
  [Error.Verification]: (
    <>
      <p className="text-quinto text-3xl font-medium">
        Hubo un problema al verificar tu cuenta.
      </p>
      <p className="text-xl font-medium text-quinto">
        Código de error único:{" "}
        <code className="text-lg bg-primero p-1 rounded-sm">Verification</code>
      </p>
    </>
  ),
  [Error.Default]: (
    <>
      <p className="text-quinto text-3xl font-medium">
        Se produjo un error inesperado durante la autenticación.
      </p>
      <p className="text-2xl font-medium text-quinto">
        Código de error único:{" "}
        <code className="text-lg bg-primero p-1 rounded-sm">Default</code>
      </p>
    </>
  ),
};

function AuthErrorComponent() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="min-h-screen py-10 flex flex-col items-center justify-center">
      <div className="max-w-2xl p-6 bg-segundo border-2 border-quinto rounded-lg shadow flex flex-col gap-6 text-center">
        <h5 className="text-4xl font-bold tracking-tight text-quinto">
          Ha ocurrido un error
        </h5>

        {errorMap[error] ||
          "Por favor, contacta a un asistente si el error persiste."}

        <Link
          href={"/login"}
          className="text-blue-500 underline text-2xl font-medium"
        >
          Regresa a la página de inicio de sesión
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="text-segundo text-3xl font-medium">
          Loading...
        </div>
      }
    >
      <AuthErrorComponent />
    </Suspense>
  );
}
