"use client";
import { useEffect, useState } from "react";
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
// import { ContactButton } from "./ContactButton";
import Link from "next/link";
import Cart from "../Cart";
import { cn } from "@/utils/cn";

import { useSectionStore } from "@/store/sectionStore";
import Logo from "./Logo";

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

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Hook para detectar el scroll
  const { scrollY } = useScroll();

  // Transformamos el valor del scroll en opacidad
  const opacity = useTransform(scrollY, [0, 700], [0, 1], { ease: easeInOut });
  const scaleX = useTransform(scrollY, [0, 700], [0, 1], { ease: easeInOut });

  // Transformamos el valor del scroll en opacidad
  const scale = useTransform(scrollY, [0, 500], [1, 0.1]);
  const x = useTransform(scrollY, [0, 500], ["-50%", "-100%"]);
  const y = useTransform(scrollY, [0, 500], ["-50%", "-170%"]);

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        style={{ opacity }}
        className="w-full fixed top-0 z-50 bg-segundo/60 backdrop-blur-md"
      >
        <m.hr
          style={{ scaleX }}
          className="absolute bottom-0 h-[4px] w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-quinto to-transparent bg-center"
        />
        <ul className="relative px-2 flex justify-between items-center text-quinto  text-xl font-medium font-primary h-[60px] ">
          {/* HOME */}
          {/* <ListItem
            href="/"
            title="MUSTANG"
            classNameProp="order-3 md:order-first "
          /> */}
          <div className="order-3 md:order-first w-[50px]"></div>
          {/* <m.div
            className="w-[250px] h-[300px] md:w-[350px] md:h-[400px] lg:w-[500px] lg:h-[550px] fixed top-1/2 left-1/2 logo z-[70] "
            style={{
              translateX: x,
              translateY: y,
              scale,
              opacity: 1
            }}
          >
            <Logo className="w-full h-full" />
          </m.div> */}
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
          <Cart classNameProp="order-2 hidden md:block text-sexto quinto-svg" />

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

export default Navbar;
