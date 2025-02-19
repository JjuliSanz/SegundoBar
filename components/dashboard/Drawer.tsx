"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { CloseIcon } from "@/assets/icons";
import { Category, MenuItem, State } from "@/types/types";
import { useFormState, useFormStatus } from "react-dom";
import { updateFoodById } from "@/utils/serverActions";

const Form = ({
  state,
  selectedCategory,
  selectedItem,
  categories,
}: {
  state: State;
  selectedCategory: string;
  selectedItem: MenuItem;
  categories: Category[];
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
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="orden"
          className="block text-sm font-bold mb-2 text-quinto"
        >
          Orden
        </label>
        <input
          type="number"
          id="orden"
          name="orden"
          className="w-[100px] px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold text-quinto bg-transparent"
          aria-describedby="orden-error"
          defaultValue={selectedItem.orden || ""}
        />
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
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="category"
          className="block text-lg font-bold mb-2 text-quinto"
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
      </div>
      {/* TITULO */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="title"
          className="block text-lg font-bold mb-2 text-quinto"
        >
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          defaultValue={selectedItem.title}
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className="text-base font-medium text-sexto" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      {/* DESCRIPCION */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="description"
          className="block text-lg font-bold mb-2 text-quinto"
        >
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          defaultValue={selectedItem.description || ""}
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description &&
            state.errors.description.map((error: string) => (
              <p className="text-base font-medium text-sexto" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      {/* IMAGEN */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="image"
          className="block text-lg font-bold mb-2 text-quinto"
        >
          URL de la Imagen
        </label>

        <input
          type="text"
          id="image"
          name="image"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          defaultValue={selectedItem.image || ""}
        />
        <div id="image-error" aria-live="polite" aria-atomic="true">
          {state.errors?.image &&
            state.errors.image.map((error: string) => (
              <p className="text-base font-medium text-sexto" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      {/* PRECIO */}
      <div className={`${pending && "opacity-50"}`}>
        <label
          htmlFor="Price"
          className="block text-lg font-bold mb-2 text-quinto"
        >
          Precio
        </label>
        <input
          type="text"
          id="price"
          name="price"
          className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
          defaultValue={selectedItem.price || ""}
        />

        <div id="price-error" aria-live="polite" aria-atomic="true">
          {state.errors?.price &&
            state.errors.price.map((error: string) => (
              <p className="text-base font-medium text-sexto" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      {/* Mensaje de éxito */}
      {state.message && (
        <p className="text-green-500 font-medium">{state.message}</p>
      )}
      <div className={`w-full flex gap-4 ${pending && "opacity-50"}`}>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-quinto text-segundo font-bold rounded-xl hover:bg-cuarto transition duration-300 ease-in-out"
          aria-disabled={pending}
        >
          {pending ? "Editando..." : "Enviar"}
        </button>
      </div>
    </>
  );
};

export const Drawer = ({
  selectedItem,
  selectedCategory,
  categories,
}: {
  selectedItem: MenuItem;
  selectedCategory: string;
  categories: Category[];
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };
  const updatedMenuItem = (prevState: any, formData: FormData) => {
    return updateFoodById(prevState, selectedItem.id, formData);
  };
  const [state, formAction] = useFormState(updatedMenuItem, initialState);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDrawer}
        className="text-quinto px-2 py-1 w-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto"
      >
        EDITAR
      </button>
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-0">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="bg-primero w-1/3 max-h-screen pt-1 p-6 overflow-auto overscroll-contain flex flex-col z-10"
          >
            <div className="w-full flex justify-between mb-4">
              <h2 className="text-quinto text-xl font-bold">Editar Producto</h2>
              <button
                onClick={handleCloseDrawer}
                className="w-[30px] text-sexto font-bold"
              >
                <CloseIcon className="" />
              </button>
            </div>
            <form
              ref={ref}
              action={formAction}
              className="flex flex-col gap-4 relative"
            >
              <Form
                state={state}
                selectedCategory={selectedCategory}
                selectedItem={selectedItem}
                categories={categories}
              />
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};
