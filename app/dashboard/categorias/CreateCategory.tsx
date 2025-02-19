"use client";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useRef } from "react";
import { State } from "@/types/types";
import { createCategory } from "@/utils/serverActions";

const Form = ({
  state,
  nextCategoryOrden,
}: {
  state: State;
  nextCategoryOrden: number;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending && (
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div className="w-10 h-10 border-4 border-t-transparent border-quinto rounded-full animate-spin"></div>
        </div>
      )}
      {/* ORDEN */}
      <label
        htmlFor="orden"
        className={`block text-lg font-bold mb-2 text-quinto ${
          pending && "opacity-50"
        }`}
      >
        Orden
      </label>
      <input
        type="number"
        id="orden"
        name="orden"
        className={`w-[10%] px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent ${
          pending && "opacity-50"
        }`}
        defaultValue={nextCategoryOrden}
      />
      <label
        htmlFor="title"
        className={`block text-lg font-bold mb-2 text-quinto ${
          pending && "opacity-50"
        }`}
      >
        Título
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className={`w-[60%] px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent ${
          pending && "opacity-50"
        }`}
      />
      <div id="title-error" aria-live="polite" aria-atomic="true">
        {state.errors?.title &&
          state.errors.title.map((error: string) => (
            <p className="text-base font-medium text-sexto" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className={`flex gap-2 ${pending && "opacity-50"}`}>
        <button
          type="submit"
          className="text-quinto px-2 py-1 w-fit h-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto"
          aria-disabled={pending}
        >
          {pending ? "CREANDO..." : "CREAR"}
        </button>
        <Link
          href="/dashboard/categorias"
          className="text-quinto px-2 py-1 w-fit h-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto"
          aria-disabled={pending}
        >
          CANCELAR
        </Link>
      </div>
    </>
  );
};

const CreateCategory = ({
  nextCategoryOrden,
}: {
  nextCategoryOrden: number;
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useFormState(createCategory, initialState);
  return (
    <form
      ref={ref}
      action={formAction}
      className="w-full flex flex-col items-center gap-4 relative"
    >
      <Form state={state} nextCategoryOrden={nextCategoryOrden} />
    </form>
  );
};

export default CreateCategory;
