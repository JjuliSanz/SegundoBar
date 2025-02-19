"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SideLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-4">
      <li
        className={`rounded hover:bg-cuarto hover:text-quinto transition-colors duration-300 ${
          pathname === "/dashboard" ? "bg-cuarto text-quinto" : "text-primero"
        }`}
      >
        <Link
          href="/dashboard"
          className="block py-2 px-4 text-xl font-medium"
        >
          Menu
        </Link>
      </li>

      <li
        className={`rounded hover:bg-cuarto hover:text-quinto transition-colors duration-300 ${
          pathname === "/dashboard/addProduct"
            ? "bg-cuarto text-quinto"
            : "text-primero"
        }`}
      >
        <Link
          href="/dashboard/addProduct"
          className="block py-2 px-4 text-xl font-medium"
        >
          Agregar Producto
        </Link>
      </li>

      <li
        className={`rounded hover:bg-cuarto hover:text-quinto transition-colors duration-300 ${
          pathname === "/dashboard/categorias"
            ? "bg-cuarto text-quinto"
            : "text-primero"
        }`}
      >
        <Link
          href="/dashboard/categorias"
          className="block py-2 px-4 text-xl font-medium"
        >
          Categorias
        </Link>
      </li>
    </ul>
  );
};

export default SideLinks;
