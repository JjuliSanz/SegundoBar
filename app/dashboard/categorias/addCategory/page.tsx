import { getNextCategoryOrden } from "@/utils/serverActions";
import CreateCategory from "../CreateCategory";

const AddCategory = async () => {
  const nextCategoryOrden = await getNextCategoryOrden();
  return (
    <main className="flex-1 ml-56 p-8 bg-primero flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-quinto text-center">
        AGREGAR CATEGORIA
      </h1>
      <CreateCategory nextCategoryOrden={nextCategoryOrden}/>
    </main>
  );
};

export default AddCategory;
