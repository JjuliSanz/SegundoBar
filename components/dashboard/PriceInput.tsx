import React from "react";

interface PriceInputProps {
  priceType: "individual" | "multiple";
  handlePriceTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceInput = ({ priceType, handlePriceTypeChange }: PriceInputProps) => {
  return (
    <>
      {/* Radio buttons para seleccionar entre precio individual o múltiple */}
      <div className="flex items-center mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="priceType"
            value="individual"
            checked={priceType === "individual"}
            onChange={handlePriceTypeChange}
            className="mr-2"
          />
          Precio Individual
        </label>

        <label>
          <input
            type="radio"
            name="priceType"
            value="multiple"
            checked={priceType === "multiple"}
            onChange={handlePriceTypeChange}
            className="mr-2"
          />
          Precio Múltiple
        </label>
      </div>

      {/* Mostrar el input correspondiente según la selección */}
      {priceType === "individual" ? (
        // Input para precio individual
        <div className="">
          <label
            htmlFor="individualPrice"
            className="block text-sm font-bold mb-2 text-quinto"
          >
            Precio Individual
          </label>
          <input
            type="text"
            id="individualPrice"
            name="individualPrice"
            className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
            aria-describedby="price-error"
          />
        </div>
      ) : (
        // Inputs para los tres precios (grande, mediano, pequeño) en la misma fila
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="big"
              className="block text-sm font-bold mb-2 text-quinto"
            >
              Precio Grande
            </label>
            <input
              type="text"
              id="big"
              name="big"
              className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
              aria-describedby="price-error"
            />
          </div>

          <div>
            <label
              htmlFor="medium"
              className="block text-sm font-bold mb-2 text-quinto"
            >
              Precio Mediano
            </label>
            <input
              type="text"
              id="medium"
              name="medium"
              className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
              aria-describedby="price-error"
            />
          </div>

          <div>
            <label
              htmlFor="small"
              className="block text-sm font-bold mb-2 text-quinto"
            >
              Precio Pequeño
            </label>
            <input
              type="text"
              id="small"
              name="small"
              className="w-full px-3 py-2 border-2 border-quinto rounded-xl focus:outline-none focus:border-quinto text-lg font-semibold bg-transparent"
              aria-describedby="price-error"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PriceInput;
