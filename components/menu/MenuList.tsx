import { getFoodsByCategory } from "@/utils/serverActions";
import MenuCard from "./MenuCard";

const MenuList = async ({
  query,
  selectedCategory,
}: {
  query: string;
  selectedCategory: string;
}) => {
  const menuItems = await getFoodsByCategory(selectedCategory);
  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredMenuItems =
    menuItems && Array.isArray(menuItems.foods)
      ? menuItems.foods.filter((item) => {
          return normalizeString(item.title)
            .toLowerCase()
            .includes(normalizeString(query).toLowerCase());
        })
      : [];

  if (menuItems && "error" in menuItems) {
    return (
      <div>
        <p className="text-xl font-semibold text-quinto px-6 py-4">
          {menuItems.error}
        </p>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(menuItems) && menuItems.foods.length === 0 && (
        <div className="w-full col-span-full flex items-center">
          <p className="w-fit text-center text-xl font-semibold text-quinto px-6 py-4">
            No se encontraron productos{" "}
          </p>
        </div>
      )}
      {filteredMenuItems.length > 0 &&
        filteredMenuItems.map((item) => <MenuCard item={item} key={item.id} />)}
    </>
  );
};

export default MenuList;
