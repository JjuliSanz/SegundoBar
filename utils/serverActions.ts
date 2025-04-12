"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";

import prisma from "@/prisma/prisma"; // Asegúrate de que la ruta sea correcta
import { menuItemsLocal } from "@/constants";

const foodSchema = z.object({
  orden: z.coerce
    .number() // Convierte automáticamente a número
    .int({ message: "El valor del orden debe ser un número entero" })
    .positive({ message: "El valor del orden debe ser positivo" })
    .optional()
    .or(z.literal("")), // Permite que esté vacío
  title: z
    .string()
    .min(1, { message: "Ingrese un título válido" })
    .max(60, { message: "El título no puede exceder los 60 caracteres" }),
  description: z.string().optional(),
  image: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("/") ||
        z.string().url().safeParse(value).success,
      {
        message: "Debe ser una URL válida o una ruta local.",
      }
    )
    .optional(),
  price: z.string().optional().or(z.literal("")),
  categoryTitle: z.string().min(1, { message: "La categoría es requerida" }),
});

export async function createFood(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log("Datos del formulario:", data);

  // Validación con Zod
  const parsed = foodSchema.safeParse(data);
  console.log("Resultado de la validación:", parsed);

  if (!parsed.success) {
    console.log("Errores de validación:", parsed.error.formErrors.fieldErrors);
    // Retorna los errores formateados
    return { errors: parsed.error.formErrors.fieldErrors };
  }

  const { orden, title, description, image, categoryTitle, price } =
    parsed.data;

  console.log("Datos válidos:", {
    orden,
    title,
    description,
    image,
    categoryTitle,
    price,
  });

  // Buscar la categoría por el título
  const category = await prisma.category.findUnique({
    where: { title: categoryTitle },
  });
  console.log("Categoría encontrada:", category);

  if (!category) {
    console.log("Error: categoría no encontrada.");
    return { errors: { categoryTitle: ["Categoría no encontrada."] } };
  }

  // Crear el nuevo alimento en la base de datos
  const newFood = await prisma.food.create({
    data: {
      orden: orden === "" ? null : Number(orden),
      title,
      description,
      image,
      price,
      categoryId: category.id,
    },
  });

  console.log("Nuevo alimento creado:", newFood);

  revalidatePath("/dashboard");
  redirect(`/dashboard?category=${categoryTitle}`);

  return { ...prevState, message: "Comida creada con éxito", food: newFood };
}

export async function updateFoodById(
  prevState: any,
  id: string,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  console.log("Datos del formulario:", data);
  console.log("Id:", id);
  // Validación con Zod
  const parsed = foodSchema.safeParse(data);
  console.log("Resultado de la validación:", parsed);

  if (!parsed.success) {
    console.log("Errores de validación:", parsed.error.formErrors.fieldErrors);
    // Retorna los errores formateados para cada campo
    return { errors: parsed.error.formErrors.fieldErrors };
  }

  const { orden, title, description, image, categoryTitle, price } =
    parsed.data;

  console.log("Datos válidos:", {
    orden,
    title,
    description,
    image,
    categoryTitle,
    price,
  });

  // Buscar la categoría por su título
  const category = await prisma.category.findUnique({
    where: { title: categoryTitle },
  });
  console.log("Categoría encontrada:", category);

  if (!category) {
    console.log("Error: categoría no encontrada.");
    return { errors: { categoryTitle: ["Categoría no encontrada."] } };
  }

  // Actualizar el alimento en la base de datos
  const updatedFood = await prisma.food.update({
    where: { id },
    data: {
      orden: orden === "" ? null : Number(orden),
      title,
      description,
      image,
      price,
      categoryId: category.id,
    },
  });

  console.log("Alimento editado:", updatedFood);
  revalidatePath("/dashboard");

  return {
    ...prevState,
    message: "Comida actualizada con éxito",
    food: updatedFood,
  };
}

export async function getFoodsByCategory(categoryTitle: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { title: categoryTitle },
    });

    if (!category) {
      console.error("Categoría no encontrada");
      return { error: "Categoría no encontrada", foods: menuItemsLocal, fallback: true };
    }

    const foods = await prisma.food.findMany({
      where: { categoryId: category.id },
      orderBy: { orden: "asc" },
    });

    if (!foods || foods.length === 0) {
      return { error: "No se encontraron comidas en esta categoría", foods: menuItemsLocal, fallback: true };
    }

    return { foods };
  } catch (error) {
    console.error("Error al obtener comidas:", error);
    return {
      error: "Error al conectar con la base de datos",
      foods: menuItemsLocal,
      fallback: true,
    };
  }
}

export async function getFoodById(foodId: string) {
  // Validación: si no se proporciona un ID
  if (!foodId) {
    return { error: "El ID de la comida es requerido." };
  }

  // Validación: si el ID no es un string o está vacío
  if (typeof foodId !== "string" || foodId.trim() === "") {
    return { error: "ID de comida no válido." };
  }

  // Consulta a la base de datos para obtener la comida y su precio
  const food = await prisma.food.findUnique({
    where: { id: foodId },
  });

  // Validación: si no se encuentra la comida
  if (!food) {
    return { error: `No se encontró una comida con el ID: ${foodId}` };
  }

  // Si todo está correcto, devolver la comida junto con sus precios
  return {
    food,
  };
}

export async function getNextOrden(categoryTitle: string) {
  // Buscar la categoría por su título
  const category = await prisma.category.findUnique({
    where: { title: categoryTitle },
  });

  // Si la categoría no existe, retorna un mensaje de error
  if (!category) {
    console.error("Categoria no encontrada");
    return { error: "Categoría no encontrada" };
  }

  // Buscar la comida con el valor máximo de "orden" en esa categoría
  const maxOrdenFood = await prisma.food.findFirst({
    where: { categoryId: category.id },
    orderBy: {
      orden: "desc",
    },
  });

  // Si no hay comidas en la categoría, el próximo orden es 1
  const nextOrden = maxOrdenFood?.orden ? maxOrdenFood.orden + 1 : 1;

  // Retorna el próximo valor de orden
  return  nextOrden;
}

const deleteSchema = z.object({
  id: z.string().min(1, "El ID es requerido."),
});

export async function deleteFood(id: string) {
  // Validación del ID usando Zod
  const parsed = deleteSchema.safeParse({ id });

  if (!parsed.success) {
    return { errors: parsed.error.formErrors.fieldErrors };
  }

  // Verificar si el alimento existe, incluyendo el precio
  const existingFood = await prisma.food.findUnique({
    where: { id },
  });

  if (!existingFood) {
    return { errors: { id: ["La comida con el ID proporcionado no existe."] } };
  }

  // Finalmente, eliminar la comida
  await prisma.food.delete({
    where: { id },
  });

  revalidatePath("/dashboard");

  return { message: "Comida eliminada con éxito." };
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      orden: "asc",
    },
  });

  return categories;
}

export async function deleteCategory(id: string) {
  // Validación del ID usando Zod
  const parsed = deleteSchema.safeParse({ id });

  if (!parsed.success) {
    return { errors: parsed.error.formErrors.fieldErrors };
  }

  // Verificar si el alimento existe, incluyendo el precio
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    return {
      errors: { id: ["La categoria con el ID proporcionado no existe."] },
    };
  }

  // Finalmente, eliminar la comida
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/dashboard");

  return { message: "Categoria eliminada con éxito." };
}

const categorySchema = z.object({
  orden: z.coerce
    .number() // Convierte automáticamente a número
    .int({ message: "El valor del orden debe ser un número entero" })
    .positive({ message: "El valor del orden debe ser positivo" })
    .optional(),
  title: z
    .string()
    .min(1, { message: "Ingrese un título válido" })
    .max(60, { message: "El título no puede exceder los 60 caracteres" }),
});

export async function createCategory(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log("Datos del formulario:", data);

  // Validación con Zod
  const parsed = categorySchema.safeParse(data);
  console.log("Resultado de la validación:", parsed);

  if (!parsed.success) {
    console.log("Errores de validación:", parsed.error.formErrors.fieldErrors);
    // Retorna los errores formateados
    return { errors: parsed.error.formErrors.fieldErrors };
  }

  const { title, orden } = parsed.data;

  console.log("Datos válidos:", {
    title,
    orden,
  });

  // Crear el nuevo alimento en la base de datos
  const newCategory = await prisma.category.create({
    data: {
      title,
      orden: Number(orden),
    },
  });

  console.log("Nueva categoria creada:", newCategory);

  revalidatePath("/dashboard");
  redirect(`/dashboard/categorias`);

  return {
    ...prevState,
    message: "Comida creada con éxito",
    category: newCategory,
  };
}

export async function updateCategoryById(
  prevState: any,
  id: string,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  console.log("Datos del formulario:", data);
  console.log("Id:", id);
  // Validación con Zod
  const parsed = categorySchema.safeParse(data);
  console.log("Resultado de la validación:", parsed);

  if (!parsed.success) {
    console.log("Errores de validación:", parsed.error.formErrors.fieldErrors);
    // Retorna los errores formateados para cada campo
    return { errors: parsed.error.formErrors.fieldErrors };
  }

  const { orden, title } = parsed.data;

  console.log("Datos válidos:", {
    orden,
    title,
  });

  // Actualizar el alimento en la base de datos
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: { orden: Number(orden), title },
  });

  console.log("Categoria editada:", updatedCategory);
  revalidatePath("/dashboard");

  return {
    ...prevState,
    message: "Comida actualizada con éxito",
    category: updatedCategory,
  };
}

export async function getNextCategoryOrden() {
  const maxOrdenCategory = await prisma.category.findFirst({
    orderBy: {
      orden: "desc",
    },
  });

  // Si no hay categorías, el próximo orden es 1
  const nextOrden = maxOrdenCategory?.orden ? maxOrdenCategory.orden + 1 : 1;

  // Retorna el próximo valor de orden para una nueva categoría
  return nextOrden;
}