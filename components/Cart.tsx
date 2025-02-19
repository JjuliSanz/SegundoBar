"use client";
import {
  CartIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/assets/icons";
import { motion, AnimatePresence, useScroll, useTransform, easeInOut } from "framer-motion";
import Image from "next/image";
import {
  calculateIndividualPrice,
  calculateTotalItems,
  calculateTotalPrice,
  CartState,
  useCartStore,
} from "@/store/cartStore";

import { useShallow } from "zustand/shallow";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Cart = ({ classNameProp }: { classNameProp: string }) => {
  const { cart, isCartOpen } = useCartStore(
    useShallow((state: CartState) => ({
      cart: state.cart,
      isCartOpen: state.isCartOpen,
    }))
  );
  const { addToCart, removeFromCart, decreaseQuantity, openCart, closeCart } =
    useCartStore();

  const totalPrice = calculateTotalPrice(cart);
  const totalItems = calculateTotalItems(cart);

  return (
    <AnimatePresence mode="sync">
      <motion.div className={cn(`relative`, classNameProp)}>
        <CartIcon
          width={24}
          height={24}
          
          className="cursor-pointer hover:scale-95 hover:opacity-70 active:scale-95 active:opacity-70 transition ease-in duration-150"
          onClick={isCartOpen ? closeCart : openCart}
        />
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-segundo text-sexto text-xs font-sans font-medium rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </div>
        )}
      </motion.div>
      {isCartOpen && (
        <motion.div
          key="cart-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          onClick={closeCart}
          className="fixed inset-0 h-screen bg-black bg-opacity-50 flex justify-end z-[100]"
        >
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="bg-segundo w-full sm:w-1/3 max-h-screen p-6 overflow-auto overscroll-contain flex flex-col gap-6 z-20 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between ">
              <h2 className="text-quinto text-4xl font-bold">Carrito</h2>

              <CloseIcon
                width={30}
                className="text-sexto cursor-pointer font-bold hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70"
                onClick={closeCart}
              />
            </div>
            {cart.length === 0 ? (
              <p className="text-2xl font-semibold text-quinto">
                No hay items en el carrito
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="w-full pb-2 flex gap-2 border-b border-sexto"
                >
                  <Image
                    src={item.image}
                    alt=""
                    width={200}
                    height={200}
                    className="object-cover rounded w-20 h-20"
                  />
                  <div className="text-quinto flex flex-col flex-grow justify-between">
                    {/* TITLE */}
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    {/* REST */}
                    <div className="flex gap-2 items-center">
                      <MinusIcon
                        width={32}
                        height={32}
                        className="text-quinto hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70"
                        onClick={() => decreaseQuantity(item.id)}
                      />
                      {/* QUANTITY */}
                      <p className="text-2xl font-sans font-semibold">
                        {item.quantity}
                      </p>
                      {/* ADD */}
                      <PlusIcon
                        width={32}
                        height={32}
                        className="text-quinto hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70"
                        onClick={() => addToCart(item)}
                      />
                    </div>
                  </div>
                  {/* PRICE */}
                  <div className="text-quinto flex flex-col justify-between col-span-1">
                    <span className="font-semibold text-2xl">
                      {isNaN(item.price)
                        ? "-"
                        : `$${calculateIndividualPrice(
                            item.price,
                            item.quantity
                          )}`}
                    </span>

                    <TrashIcon
                      width={24}
                      className="cursor-pointer text-sexto hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              ))
            )}
            {/* TOTAL PRICE */}
            <div className="w-full text-quinto flex justify-between">
              <p className="text-2xl font-semibold">Precio Total:</p>
              <span className="text-2xl font-semibold">
                {isNaN(totalPrice) ? "-" : `$${totalPrice}`}
              </span>
            </div>

            {cart.length > 0 && (
              <Link
                href="/checkout"
                className={
                  "w-fit mx-auto px-3 py-1 flex motion-safe:transition duration-300 ease-in-out text-2xl font-medium rounded bg-segundo hover:bg-quinto border-4 border-quinto text-quinto outline-none focus:outline-none hover:text-segundo hover:scale-95 active:scale-95 box-shadow-quinto-xs"
                }
              >
                Hacer pedido
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
