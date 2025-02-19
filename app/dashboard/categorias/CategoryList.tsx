"use client";
import { Category } from "@/types/types";
import { useRef, useState } from "react";
import DeleteCategory from "./DeleteCategory";
import { updateCategoryById } from "@/utils/serverActions";
import CategoriesSkeleton from "./CategoriesSkeleton";

const CategoryList = ({ categories }: { categories: Category[] }) => {
  const [isEditing, setIsEditing] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const ref = useRef<HTMLFormElement>(null);

  const updatedCategory = async (formData: FormData) => {
    try {
      setIsLoading(true); // Activar loading
      const result = await updateCategoryById(null, isEditing, formData);

      if (result.errors) {
        setErrors(result.errors); // Manejar errores
      } else {
        setIsEditing(""); // Limpiar estado de edición si es exitoso
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsLoading(false); // Desactivar loading
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex border-b-2 border-quinto py-3 text-lg font-semibold text-quinto tracking-wider">
        <div className="w-[10%]">Orden</div>
        <div className="w-[70%]">Titulo</div>
        <div className="w-[10%]">Acciones</div>
      </div>
      {isLoading ? (
        <CategoriesSkeleton />
      ) : categories.length === 0 ? (
        <span className="mt-4 text-lg font-semibold">
          No hay categorías disponibles.
        </span>
      ) : (
        categories.map((category) => (
          <div
            className={`w-full flex py-4 border-b border-quinto`}
            key={category.id}
          >
            {isEditing === category.id ? (
              <form
                ref={ref}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(ref.current!);
                  await updatedCategory(formData);
                }}
                className="w-full flex items-center"
              >
                {/* ORDEN */}
                <input
                  type="number"
                  id="orden"
                  name="orden"
                  className="w-[10%] px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
                  defaultValue={category.orden ? category.orden : "-"}
                />
                {errors?.orden &&
                  errors.orden.map((error) => (
                    <p key={error} className="text-base font-medium text-sexto">
                      {error}
                    </p>
                  ))}
                {/* TITLE */}
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-[70%] px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
                  defaultValue={category.title}
                />
                {errors?.title &&
                  errors.title.map((error) => (
                    <p key={error} className="text-base font-medium text-sexto">
                      {error}
                    </p>
                  ))}
                {/* BUTTONS */}
                <div className="w-[10%] flex gap-2">
                  <button
                    type="submit"
                    className="text-quinto px-2 py-1 w-fit h-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto"
                  >
                    EDITAR
                  </button>
                  <button
                    onClick={() => setIsEditing("")}
                    className="text-quinto px-2 py-1 w-fit h-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto"
                  >
                    CANCELAR
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="w-[10%] text-quinto flex justify-start items-center text-2xl font-semibold capitalize">
                  <span className="border border-quinto px-2 py-0 rounded">
                    {category.orden}
                  </span>
                </div>
                <div className="w-[70%] text-quinto text-lg font-semibold">
                  {category.title}
                </div>
                <div className="w-[10%] flex gap-2">
                  <button
                    onClick={() => setIsEditing(category.id)}
                    className="text-quinto px-2 py-1 w-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto"
                  >
                    EDITAR
                  </button>
                  <DeleteCategory id={category.id} title={category.title} />
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
