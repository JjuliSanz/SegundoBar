"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Category } from "@/types/types";

const CategorySelector = ({
  selectedCategory,
  categories,
}: {
  selectedCategory: string;
  categories: Category[];
}) => {
  const router = useRouter();
  const handleCategoryChange = (category: string) => {
    router.push(`/menu?category=${category}`);
  };
  return (
    <nav className="w-fit min-w-[250px] max-w-[80%] mx-auto flex justify-center p-4 border-2 border-quinto bg-gradient-to-br from-segundo to-tercero rounded-xl relative z-20">
      <ul className="flex flex-wrap justify-center text-balance gap-4 z-20">
        {categories.length === 0 ? (
          <li className="text-lg font-semibold">
            No hay categorías disponibles.
          </li>
        ) : (
          categories.map((category) => (
            <motion.li
              key={category.title}
              className={`cursor-pointer text-lg 500:text-xl sm:text-2xl font-semibold hover:text-quinto duration-300 ease-in-out transition ${
                selectedCategory === category.title
                  ? "text-quinto underline"
                  : "text-cuarto"
              }`}
              onClick={() => handleCategoryChange(category.title)}
            >
              {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
            </motion.li>
          ))
        )}
      </ul>
    </nav>
  );
};

export default CategorySelector;
