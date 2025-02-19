import CategoryDashboardSelector from "@/components/dashboard/CategoryDashboardSelector";
import ToTopButton from "@/components/ui/ToTopButton";
import MenuDashboardList from "@/components/dashboard/MenuDashboardList";
import SearchBar from "@/components/dashboard/SearchBar";
import Link from "next/link";
import { getCategories } from "@/utils/serverActions";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: { category?: string; query?: string };
}) {
  const categories = await getCategories();
  const selectedCategory =
    searchParams?.category ||
    (categories.length > 0 ? categories[0].title : "");
  const query = searchParams?.query || "";
  return (
    <main className={`flex-1 ml-56 p-8 bg-primero`}>
      <CategoryDashboardSelector
        selectedCategory={selectedCategory}
        categories={categories}
      />
      <header className="items-center justify-between block sm:flex mt-10">
        <SearchBar placeholder="Buscar productos por su titulo" />

        {/* ADD PRODUCT */}
        <button className="px-3 py-2 border-2 border-quinto text-quinto text-lg font-bold rounded hover:scale-95 transition duration-300 ease-in-out hover:bg-quinto hover:text-segundo">
          <Link href={`/dashboard/addProduct?category=${selectedCategory}`}>
            Agregar Producto
          </Link>
        </button>
      </header>
      <div className="min-w-full mt-10">
        <div className="w-full grid grid-cols-12 gap-2 border-b-2 border-quinto py-3 text-left text-lg font-semibold text-quinto tracking-wider">
          <div className="col-span-1 ">Orden</div>
          <div className="col-span-2 ">Imagen</div>
          <div className="col-span-2 ">Título</div>
          <div className="col-span-3 ">Descripción</div>
          <div className="col-span-2 ">Precio</div>
          <div className="col-span-2 ">Acciones</div>
        </div>

        <MenuDashboardList selectedCategory={selectedCategory} query={query} />
      </div>
      <ToTopButton />
    </main>
  );
}
