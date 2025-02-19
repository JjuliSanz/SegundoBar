"use client";
import {
  m,
  LazyMotion,
  domAnimation,
  useScroll,
  useTransform,
  MotionValue,
  easeInOut,
} from "framer-motion";
import { container, opacityAnimation } from "@/variants";
import Logo from "../ui/Logo";
import Navbar from "../ui/Navbar";
import { useEffect, useState } from "react";

const Hero = () => {
  // Hook para detectar el scroll
  const { scrollY } = useScroll();
  const [initialSize, setInitialSize] = useState({
    width: 250, // Usamos números en lugar de strings
    height: 300,
  });
  const [initialPosition, setInitialPosition] = useState({ top: 0, left: 0 });

  // Movimiento en diagonal usando top y left
  const top = useTransform(scrollY, [0, 500], [initialPosition.top, 5]);
  const left = useTransform(scrollY, [0, 500], [initialPosition.left, 10]);

  // Ancho y alto del logo animado
  const width = useTransform(scrollY, [0, 500], [initialSize.width, 45]);
  const height = useTransform(scrollY, [0, 500], [initialSize.height, 50]);

  // Detectar el tamaño de la pantalla y ajustar el tamaño inicial del logo
  useEffect(() => {
    const updateSizeAndPosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Ajustar el tamaño inicial del logo
      if (windowWidth >= 1024) {
        setInitialSize({ width: 500, height: 550 }); // lg
      } else if (windowWidth >= 768) {
        setInitialSize({ width: 350, height: 400 }); // md
      } else {
        setInitialSize({ width: 250, height: 300 }); // sm y menores
      }

      // Calcular la posición inicial en píxeles
      const topPosition = (windowHeight - initialSize.height) / 2;
      const leftPosition = (windowWidth - initialSize.width) / 2;
      setInitialPosition({ top: topPosition, left: leftPosition });
    };

    updateSizeAndPosition();
    window.addEventListener("resize", updateSizeAndPosition);
    return () => window.removeEventListener("resize", updateSizeAndPosition);
  }, [initialSize.height, initialSize.width]);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial="hidden"
        animate="visible"
        variants={container}
        className="w-full h-screen overflow-hidden flex flex-col relative"
        id="inicio"
      >
        {/* Fondo con imagen */}
        <div className="absolute inset-0 bg-fixed bg-cover bg-center max-sm:bg-[url('/galeria/galeria-7-mobile.webp')] sm:bg-[url('/galeria/galeria-7.jpeg')]" />

        {/* Capa de color con opacidad */}
        <div className="absolute inset-0 bg-primero/60" />

        <Navbar />

        {/* Logo centrado y animado */}
        <m.div
          className="fixed logo z-[70]"
          style={{
            top,
            left,
            width: useTransform(width, (w) => `${w}px`), // Convertir a string con unidades
            height: useTransform(height, (h) => `${h}px`), // Convertir a string con unidades
          }}
        >
          <Logo className="w-full h-full" />
        </m.div>
      </m.section>
    </LazyMotion>
  );
};
export default Hero;
