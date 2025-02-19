import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { Drawer } from "@/components/dashboard/Drawer";
import { PreviewModal } from "./PreviewModal";
import { getCategories, getFoodsByCategory } from "@/utils/serverActions";
import { Suspense } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const MenuDashboardList = async ({
  query,
  selectedCategory,
}: {
  query: string;
  selectedCategory: string;
}) => {
  const menuItems = await getFoodsByCategory(selectedCategory);
  const categories = await getCategories();
  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredMenuItems =
    menuItems.foods && Array.isArray(menuItems.foods)
      ? menuItems.foods.filter((item) => {
          return normalizeString(item.title)
            .toLowerCase()
            .includes(normalizeString(query).toLowerCase());
        })
      : [];
  return (
    <>
      {menuItems.error && (
        <p className="text-xl font-semibold text-quinto px-6 py-4">
          {menuItems.error}
        </p>
      )}
      <Suspense fallback={<LoadingSkeleton />}>
        {menuItems.foods &&
        Array.isArray(menuItems.foods) &&
        filteredMenuItems.length > 0
          ? filteredMenuItems.map((item) => (
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
          : !menuItems.error && (
              <p className="text-xl font-semibold text-quinto px-6 py-4">
                No hay items disponibles.
              </p>
            )}
      </Suspense>
    </>
  );
};

export default MenuDashboardList;
