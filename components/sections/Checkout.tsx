"use client";
import { calculateTotalPrice, useCartStore } from "@/store/cartStore";
import React, { useState } from "react";
import Link from "next/link";

const CheckoutForm = () => {
  const { cart } = useCartStore(); // Access cart items
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");

  const handleSubmit = () => {
    const cartItems = cart
      .map((item) => `${item.title} x${item.quantity}`)
      .join(", ");
    const totalPrice = calculateTotalPrice(cart);
    const message = `Detalles del pedido:\nNombre: ${name}\nDirección: ${address}\nCelular: ${phone}\nItems: ${cartItems}\nMétodo de pago: ${paymentMethod}\nTotal: $${totalPrice}`;

    // Open WhatsApp with the pre-filled message
    window.open(
      `https://wa.me/541147844364?text=${encodeURIComponent(message)}`
    );
  };
  return (
    <form className="w-[95%] max-w-[800px] p-4 h-full overflow-auto overscroll-contain rounded relative  flex flex-col gap-6 font-sans">
      {cart.length > 0 ? (
        <>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-4 border-quinto rounded text-2xl font-semibold text-quinto placeholder:text-tercero bg-transparent focus:outline-none focus:placeholder:text-quinto focus:text-quinto focus:border-quinto focus:box-shadow-cuarto"
            required
          />
          <input
            type="text"
            placeholder="Dirección de entrega"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border-4 border-quinto rounded text-2xl font-semibold text-quinto placeholder:text-tercero bg-transparent focus:outline-none focus:placeholder:text-quinto focus:text-quinto focus:border-quinto focus:box-shadow-cuarto"
            required
          />
          <input
            type="text"
            placeholder="Número de celular"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border-4 border-quinto rounded text-2xl font-semibold text-quinto placeholder:text-tercero bg-transparent focus:outline-none focus:placeholder:text-quinto focus:text-quinto focus:border-quinto focus:box-shadow-cuarto"
            required
          />
          <div className="flex gap-4 text-xl sm:text-2xl font-semibold text-quinto">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="efectivo"
                checked={paymentMethod === "efectivo"}
                onChange={() => setPaymentMethod("efectivo")}
                className="appearance-none w-4 h-4 rounded-full border-2 border-quinto focus:outline-none checked:bg-quinto checked:scale-90"
              />
              Efectivo
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="transferencia"
                checked={paymentMethod === "transferencia"}
                onChange={() => setPaymentMethod("transferencia")}
                className="appearance-none w-4 h-4 rounded-full border-2 border-quinto focus:outline-none checked:bg-quinto checked:scale-90"
              />
              Transferencia
            </label>
          </div>

          <div className="flex flex-col gap-4 text-quinto">
            <h2 className="text-2xl font-bold">Carrito</h2>
            {cart.map((item) => (
              <div
                key={item.id}
                className="text-xl font-medium flex justify-between items-center border-b border-quinto"
              >
                <span>
                  {item.title} x{item.quantity}
                </span>
                <span className="font-semibold">
                  {isNaN(item.price) ? "-" : `$${item.price * item.quantity}`}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-2xl font-semibold">
              <span>Total:</span>
              <span>
                {isNaN(calculateTotalPrice(cart))
                  ? "-"
                  : `$${calculateTotalPrice(cart)}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col 500:flex-row gap-4 min-h-[72px] mt-6 items-center justify-center">
            <Link
              href="/menu"
              className="min-h-[72px] flex items-center justify-center px-3 py-1 w-fit transition duration-300 ease-in-out text-xl font-semibold text-quinto rounded bg-transparent hover:bg-quinto border border-quinto hover:text-segundo outline-none focus:outline-none hover:scale-95 active:scale-95"
            >
              Agregar mas productos
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-fit text-xl font-semibold bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800 hover:scale-95 active:bg-green-800 active:scale-95 transition mx-auto min-h-[72px] flex items-center justify-center"
            >
              Hacer orden via WhatsApp
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col p-4 items-center gap-6">
          <p className="text-2xl font-medium text-center text-quinto">
            No hay productos en el carrito
          </p>

          <Link
            href="/menu"
            className=" flex items-center justify-center px-4 py-2 w-fit transition duration-300 ease-in-out text-xl font-medium text-quinto rounded bg-segundo hover:bg-quinto border border-quinto hover:text-segundo outline-none focus:outline-none hover:scale-95 active:scale-95"
          >
            Menú
          </Link>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
