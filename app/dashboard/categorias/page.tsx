import { getCategories } from "@/utils/serverActions";
import React from "react";
import CategoryList from "./CategoryList";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories();
  return (
    <main className="flex-1 ml-56 p-8 bg-primero flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-quinto text-center">
        CATEGORIAS
      </h1>
      {/* ADD PRODUCT */}
      <button className="w-fit self-end px-3 py-2 border-2 border-quinto text-quinto text-base font-semibold rounded hover:scale-95 transition duration-300 ease-in-out hover:bg-quinto hover:text-segundo">
        <Link href={`/dashboard/categorias/addCategory`}>Agregar Categoria</Link>
      </button>
      <CategoryList categories={categories} />
    </main>
  );
};

export default Categories;
