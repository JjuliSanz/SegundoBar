"use client";
import { Category, State } from "@/types/types";
import { createFood, getNextOrden } from "@/utils/serverActions";
// import { addMenuItem } from "@/utils/serverActions";
import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const Form = ({
  state,
  selectedCategory,
  categories,
}: {
  state: State;
  selectedCategory: string;
  categories: Category[];
}) => {
  const { pending } = useFormStatus();
  const [category, setCategory] = useState(selectedCategory);
  const [nextOrden, setNextOrden] = useState<number | { error: string }>();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect para actualizar nextOrden cuando selectedCategory cambia
  useEffect(() => {
    const fetchNextOrden = async () => {
      setIsLoading(true);
      const result = await getNextOrden(category);
      setNextOrden(result);
      setIsLoading(false);
    };

    if (category) {
      fetchNextOrden();
    }
  }, [category]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  return (
    <>
      {pending && (
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div className="w-10 h-10 border-4 border-t-transparent border-quinto rounded-full animate-spin"></div>
        </div>
      )}
      {/* ORDEN */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="orden"
          className="block text-sm font-bold mb-2 text-quinto"
        >
          Orden
        </label>
        {isLoading ? (
          <div className="w-10 h-10 border-4 border-t-transparent border-quinto rounded-full animate-spin"></div>
        ) : typeof nextOrden === "number" ? (
          <input
            type="number"
            id="orden"
            name="orden"
            className="w-[100px] px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
            aria-describedby="orden-error"
            value={nextOrden}
            readOnly
          />
        ) : (
          <p>Error: {nextOrden?.error}</p>
        )}
      </div>
      <div id="orden-error" aria-live="polite" aria-atomic="true" className="">
        {state.errors?.orden &&
          state.errors.orden.map((error: string) => (
            <p className="text-base font-medium text-sexto" key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* CATEGORIA */}
      <div className={`w-2/3 ${pending && "opacity-50"}`}>
        <label
          htmlFor="category"
          className="block text-sm font-bold mb-2 text-quinto"
        >
          CATEGORÍA
        </label>
        {categories.length === 0 ? (
          <span className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent">
            No hay categorías disponibles
          </span>
        ) : (
          <select
            id="category"
            name="categoryTitle"
            className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent focus:bg-primero"
            aria-describedby="category-error"
            defaultValue={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Selecciona la categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        )}
      </div>
      <div
        id="categoryTitle-error"
        aria-live="polite"
        aria-atomic="true"
        className=""
      >
        {state.errors?.categoryTitle &&
          state.errors.categoryTitle.map((error: string) => (
            <p className="text-base font-medium text-sexto" key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* TITULO */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="title"
          className="block text-sm font-bold mb-2 text-quinto"
        >
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          aria-describedby="title-error"
        />
      </div>
      <div id="title-error" aria-live="polite" aria-atomic="true" className="">
        {state.errors?.title &&
          state.errors.title.map((error: string) => (
            <p className="text-base font-medium text-sexto" key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* DESCRIPCION */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="description"
          className="block text-sm font-bold mb-2 text-quinto"
        >
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          aria-describedby="description-error"
        />
      </div>
      <div
        id="description-error"
        aria-live="polite"
        aria-atomic="true"
        className=""
      >
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
            <p className="text-base font-medium text-sexto" key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* IMAGEN */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="image"
          className="block text-sm font-bold mb-2 text-quinto"
        >
          URL de la Imagen
        </label>
        <input
          type="text"
          id="image"
          name="image"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          aria-describedby="image-error"
        />
      </div>
      <div id="image-error" aria-live="polite" aria-atomic="true" className="">
        {state.errors?.image &&
          state.errors.image.map((error: string) => (
            <p className="text-base font-medium text-sexto" key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* PRECIO */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="Price"
          className="block text-sm font-bold mb-2 text-quinto"
        >
          Precio
        </label>
        <input
          type="text"
          id="price"
          name="price"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          aria-describedby="price-error"
        />
      </div>
      <div id="price-error" aria-live="polite" aria-atomic="true">
        {state.errors?.price &&
          state.errors.price.map((error: string) => (
            <p className="text-base font-medium text-sexto" key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* Mensaje de éxito */}
      {state.message && (
        <p className="text-green-500 font-medium">{state.message}</p>
      )}
      {/* BUTTON */}
      <div className={`w-full flex gap-4 ${pending && "opacity-50"}`}>
        <button
          type="reset"
          className="w-full py-2 px-4 bg-quinto text-segundo font-bold rounded-xl hover:bg-cuarto transition duration-300 ease-in-out"
          aria-disabled={pending}
        >
          Resetear
        </button>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-quinto text-segundo font-bold rounded-xl hover:bg-cuarto transition duration-300 ease-in-out"
          aria-disabled={pending}
        >
          {pending ? "Creando..." : "Enviar"}
        </button>
      </div>
    </>
  );
};

const CreateForm = ({
  selectedCategory,
  categories,
}: {
  selectedCategory: string;
  categories: Category[];
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createFood, initialState);

  return (
    <form
      ref={ref}
      action={formAction}
      className={`w-[600px] h-full overflow-auto overscroll-contain rounded relative bg-primero text-quinto mx-auto flex flex-col gap-4`}
    >
      <Form
        selectedCategory={selectedCategory}
        state={state}
        categories={categories}
      />
    </form>
  );
};

export default CreateForm;
