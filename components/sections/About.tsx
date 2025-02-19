"use client";
import React from "react";
import { useRef } from "react";
import { m, useInView, LazyMotion, domAnimation } from "framer-motion";
import { container, opacityAnimation } from "@/variants";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px" });
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        id="nosotros"
        className="w-full flex pt-[200px] relative"
        style={{
          backgroundImage:
            "linear-gradient(to top, var(--primero) 0%, var(--segundo) 50%, var(--tercero) 100%)",
        }}
      >
        <m.div
          initial="hidden"
          animate={isInView && "visible"}
          variants={container}
          className="w-[90%] lg:w-[70%] absolute transform top-0 left-1/2 -translate-x-1/2 p-6 text-2xl flex flex-col gap-4 lg:gap-6 items-center justify-center border-2 border-sexto box-shadow-quinto bg-primero"
          style={{
            background:
              "radial-gradient(circle, var(--quinto) 0%, var(--cuarto) 100%)",
          }}
        >
          <m.h2
            variants={opacityAnimation}
            className="text-2xl sm:text-4xl font-primary font-semibold text-center text-sexto text-shadow-quinto"
          >
            LIFE BEGING AFTER OFFICE
          </m.h2>

          <m.p
            variants={opacityAnimation}
            className="text-sexto text-shadow-cuarto text-base 400:text-lg 500:text-xl md:text-2xl lg:text-3xl font-medium "
          >
            En lo alto de la ciudad, donde las luces brillan y la música crea el
            ambiente perfecto, nace Segundo, un rooftop bar diseñado para
            aquellos que buscan algo más. Con una propuesta de tragos de autor
            cuidadosamente creados, combinamos innovación y calidad en cada
            copa.
          </m.p>

          <m.p
            variants={opacityAnimation}
            className="text-sexto text-shadow-cuarto text-base 400:text-lg 500:text-xl md:text-2xl lg:text-3xl font-medium "
          >
            Seguí la señal rosa y descubrí nuestro espacio en la terraza de
            Dandy, un rincón donde el after office se transforma en experiencias
            inolvidables. Porque en Segundo, la noche no termina… apenas
            empieza.
          </m.p>
        </m.div>

        <div className="w-full h-[400px] sm:h-[500px] bg-cover bg-center bg-fixed max-sm:bg-[url('/vibe/mobile/segundo-about.webp')] sm:bg-[url('/vibe/segundo-about.jpeg')]"></div>
      </m.section>
    </LazyMotion>
  );
};

export default About;
