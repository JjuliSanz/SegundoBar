"use client";
import Cart from "@/components/Cart";
import Logo from "@/components/ui/Logo";
import { useSectionStore } from "@/store/sectionStore";
import { cn } from "@/utils/cn";
import {
  m,
  LazyMotion,
  domAnimation,
  useScroll,
  useTransform,
  useMotionValueEvent,
  easeInOut,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

const ListItem = ({
  href,
  title,
  classNameProp,
}: {
  href: string;
  title: string;
  classNameProp?: string;
  pathname?: string;
}) => {
  const { activeSection, setActiveSection } = useSectionStore();

  const isActive = activeSection === href;

  const handleClick = () => {
    // Actualiza la sección activa cuando se hace clic en un enlace
    setActiveSection(href);
  };
  return (
    <li className={cn(``, classNameProp)}>
      <Link
        href={href}
        onClick={handleClick}
        className={`w-fit hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70 text-sexto text-shadow-quinto  ${
          isActive ? "underline" : ""
        }`}
      >
        {title}
      </Link>
    </li>
  );
};

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <m.nav className="w-full relative z-50 bg-segundo/60 backdrop-blur-md">
        <m.hr className="absolute bottom-0 h-[4px] w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-quinto to-transparent bg-center" />
        <ul className="relative px-2 flex justify-between items-center text-quinto  text-xl font-medium font-primary h-[60px] ">
          {/* HOME */}
          {/* <ListItem
            href="/"
            title="MUSTANG"
            classNameProp="order-3 md:order-first "
          /> */}
          <Link
            href="/"
            className="w-[45px] h-[50px] order-3 md:order-first logo hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70"
          >
            <Logo className="w-full h-full" />
          </Link>

          {/* DESKTOP MENU */}
          <ListItem href="/menu" title="MENÚ" classNameProp="hidden md:block" />
          {/* ABOUT US */}
          <ListItem
            href="/#nosotros"
            title="NOSOTROS"
            classNameProp="hidden md:block"
          />
          {/* CONTACT */}
          <ListItem
            href="/#contacto"
            title="CONTACTO"
            classNameProp="hidden md:block"
          />
          {/* GALLERY */}
          <ListItem
            href="/#galeria"
            title="GALERÍA"
            classNameProp="hidden md:block"
          />
          {/* CART */}
          <Cart classNameProp="order-2 hidden md:block text-sexto drop-shadow-quinto" />

          {/* MOBILE MENU ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-list order-3 md:hidden cursor-pointer hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70"
            viewBox="0 0 16 16"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
          <AnimatePresence mode="sync">
            {/* MOBILE MENU */}
            {showMenu && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 60 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute w-fit max-450:max-w-[300px] mx-auto px-3 py-1 inset-x-0 max-450:top-2 rounded-xl border border-quinto flex flex-wrap items-center justify-center gap-4 500:gap-10  text-sm md:text-base text-center bg-primero/90 backdrop-blur-md"
              >
                {/* MENU */}
                <ListItem href="/menu" title="MENÚ" classNameProp="" />
                {/* NOSOTROS */}
                <ListItem href="/#nosotros" title="NOSOTROS" classNameProp="" />
                {/* CONTACTO */}
                <ListItem href="/#contacto" title="CONTACTO" classNameProp="" />
                {/* GALERIA */}
                <ListItem href="/#galeria" title="GALERÍA" classNameProp="" />
              </m.div>
            )}
          </AnimatePresence>
        </ul>
      </m.nav>
    </LazyMotion>
  );
};

export default Nav;
