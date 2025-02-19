"use client";
import { Category } from "@/types/types";
import { useRouter } from "next/navigation";

const CategoryDashboardSelector = ({
  selectedCategory,
  categories,
}: {
  selectedCategory: string;
  categories: Category[];
}) => {
  const router = useRouter();
  const handleCategoryChange = (category: string) => {
    router.push(`/dashboard?category=${category}`);
  };

  return (
    <nav className="w-fit max-w-3xl mx-auto flex justify-center p-4 bg-cuarto rounded">
      <ul className="flex flex-wrap justify-center gap-4">
        {categories.length === 0 ? (
          <li className="text-lg font-semibold">
            No hay categorías disponibles.
          </li>
        ) : (
          categories.map((category) => (
            <li
              key={category.title}
              className={`cursor-pointer text-lg font-semibold hover:text-quinto duration-300 ease-in-out transition ${
                selectedCategory === category.title
                  ? "text-quinto underline"
                  : "text-segundo"
              }`}
              onClick={() => handleCategoryChange(category.title)}
            >
              {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};

export default CategoryDashboardSelector;
