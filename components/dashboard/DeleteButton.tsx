"use client";

import { deleteFood } from "@/utils/serverActions";
import React, { useState } from "react";

const DeleteButton = ({ id, title }: { id: string; title: string }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAlertOpen = () => setIsDeleteAlertOpen(true);
  const handleDeleteAlertClose = () => setIsDeleteAlertOpen(false);

  const handleDelete = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      const result = await deleteFood(id);
      if (result.errors) {
        setErrorMessage(result.errors.id?.[0] || "Error al eliminar el ítem.");
        setIsLoading(false);
      } else {
        setSuccessMessage("Comida eliminada con éxito.");
        setIsDeleteAlertOpen(false);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(`Ha ocurrido un error: ${error}`);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteAlertOpen}
        className="text-quinto px-2 py-1 w-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto "
      >
        BORRAR
      </button>

      {isDeleteAlertOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-segundo p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-sexto text-lg font-semibold mb-4">
              Confirmar Eliminación
            </h2>
            <p className="text-quinto text-lg font-medium mb-6">
              ¿Estás seguro de que deseas borrar el item:{" "}
              <span className="text-lg font-bold underline">{title}?</span>{" "}
            </p>
            
              {isLoading ? (
                <div className="w-full flex justify-center items-center text-base font-medium text-quinto">Borrando...</div>
              ) : (
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleDeleteAlertClose}
                    className="py-2 px-4 bg-cuarto text-segundo rounded hover:scale-[.98] hover:opacity-70 transition duration-150 ease-in-out"
                  >
                    CANCELAR
                  </button>

                  <button
                    onClick={handleDelete}
                    className="py-2 px-4 bg-quinto text-tercero rounded hover:scale-[.98] hover:opacity-70 transition duration-150 ease-in-out"
                  >
                    BORRAR
                  </button>
                </div>
              )}
            
            {errorMessage && (
              <p className="mt-4 text-base font-medium text-sexto">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="mt-4 text-base font-medium text-green-600">
                {successMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
