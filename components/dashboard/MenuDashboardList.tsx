import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { Drawer } from "@/components/dashboard/Drawer";
import { PreviewModal } from "./PreviewModal";
import { getCategories, getFoodsByCategory } from "@/utils/serverActions";
import { Suspense } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import { MenuItem } from "@/types/types";
import { categoriesLocal } from "@/constants";

const MenuDashboardList = async ({
  query,
  selectedCategory,
}: {
  query: string;
  selectedCategory: string;
}) => {
  const menuData = await getFoodsByCategory(selectedCategory);
  let categories;

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Fallo Prisma, usando categorías locales:", error);
    categories = categoriesLocal;
  }
  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Usamos el array que venga, ya sea de la DB o hardcoded
  const foods = Array.isArray(menuData.foods) ? menuData.foods : [];

  const isLocalData = "category" in foods[0];

  const filteredMenuItems = foods
    .filter((item) => {
      if (isLocalData) {
        const localItem = item as MenuItem;
        return localItem.category === selectedCategory;
      }
      return true; // si viene de la DB ya está filtrado
    })
    .filter((item) =>
      normalizeString(item.title)
        .toLowerCase()
        .includes(normalizeString(query).toLowerCase())
    );

  return (
    <>
      {"error" in menuData && menuData.fallback && (
        <div className="w-full col-span-full flex items-center">
          <p className="w-fit text-center text-yellow-500 font-semibold px-6 py-4">
            Error al cargar productos desde la base de datos. Mostrando menú
            precargado.
          </p>
        </div>
      )}
      <Suspense fallback={<LoadingSkeleton />}>
        {filteredMenuItems.length === 0 ? (
          <div className="w-full col-span-full flex items-center">
            <p className="w-fit text-center text-xl font-semibold text-quinto px-6 py-4">
              No se encontraron productos
            </p>
          </div>
        ) : (
          filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="w-full grid grid-cols-12 gap-2 py-4 border-b border-quinto text-quinto"
            >
              <div className="col-span-1 flex justify-center items-center text-2xl font-semibold capitalize">
                <span className="border border-quinto px-2 py-0 rounded">
                  {item.orden}
                </span>
              </div>
              <div className="col-span-2 ">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={50}
                    className="rounded-sm object-cover w-[100px]"
                  />
                ) : (
                  <div className="rounded-sm w-[100px] h-[50px] bg-segundo"></div>
                )}
              </div>
              <div className="col-span-2 text-lg font-semibold capitalize">
                {item.title}
              </div>
              <div className="col-span-3 text-lg font-medium">
                {item.description}
              </div>
              <div className="col-span-2 text-lg font-semibold">
                {item.price}
              </div>

              <div className="col-span-2 flex flex-wrap items-start justify-center gap-2">
                <Drawer
                  selectedItem={item}
                  selectedCategory={selectedCategory}
                  categories={categories}
                />
                <DeleteButton id={item.id} title={item.title} />
                <PreviewModal selectedItem={item} />
              </div>
            </div>
          ))
        )}
      </Suspense>
    </>
  );
};

export default MenuDashboardList;
