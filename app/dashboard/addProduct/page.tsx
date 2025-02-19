import CreateForm from "@/components/dashboard/CreateForm";
import { getCategories } from "@/utils/serverActions";

const AddProcut = async ({
  searchParams,
}: {
  searchParams: { category: string };
}) => {
  const categories = await getCategories();
  const selectedCategory =
    searchParams?.category ||
    (categories.length > 0 ? categories[0].title : "");

  return (
    <main className="flex-1 ml-56 p-8 bg-primero">
      <CreateForm selectedCategory={selectedCategory} categories={categories} />
    </main>
  );
};

export default AddProcut;
