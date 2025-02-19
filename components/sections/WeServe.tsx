"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { m, useInView, LazyMotion, domAnimation } from "framer-motion";
import { container, opacityAnimation } from "@/variants";

const Item = ({ image, title }: { image: string; title: string }) => {
  return (
    <m.div
      variants={opacityAnimation}
      className="relative group w-full col-span-1 h-[200px] md:h-[300px] flex items-center justify-center overflow-hidden rounded-lg"
    >
      {/* Imagen */}
      <Image
        src={image}
        alt={`image-${title}`}
        width={600}
        height={600}
        sizes="(max-width: 768px) 50vw, 100vw"
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.6),rgba(0,0,0,0.9))] opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-lg lg:opacity-0"></div>

      <h3 className="w-full relative z-10 text-lg 400:text-2xl text-center font-primary text-quinto px-2 break-words opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {title}
      </h3>
    </m.div>
  );
};

const WeServe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        initial="hidden"
        animate={isInView && "visible"}
        variants={container}
        className="w-full px-4 sm:px-10 py-40 flex flex-col items-center justify-center gap-10 wrap"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--primero) 0%, var(--segundo) 50%, var(--tercero) 100%)",
        }}
      >
        <m.h2
          variants={opacityAnimation}
          className="text-4xl md:text-5xl text-center w-full py-2 text-sexto text-shadow-quinto font-primary "
        >
          Servimos!
        </m.h2>
        <div className="w-full grid grid-cols-2 900:grid-cols-4 gap-4 ">
          <Item
            image="/comida/Apricot-Daydream.jpeg"
            title="Apricot Daydream"
          />
          <Item image="/comida/Bocata.jpeg" title="Bocata" />
          <Item
            image="/comida/Croquetas-Malfatti.jpeg"
            title="Croquetas Malfatti"
          />
          <Item image="/comida/Grandpa-Nap.jpeg" title="Grandpa's Nap" />
          <Item image="/comida/Meat-Balls.jpeg" title="Meat Balls" />
          <Item image="/comida/Runaway.jpeg" title="Runaway" />
          <Item image="/comida/Pastrami-Sando.jpeg" title="Pastrami Sando" />
          <Item image="/comida/Suave-Escoses.jpeg" title="Suave Escoses" />
        </div>
        <m.button variants={opacityAnimation} className="w-fit mx-auto">
          <Link
            href="/menu"
            target="_blank"
            className="button motion-safe:transition duration-150 ease-in-out font-primary uppercase "
          >
            MENÚ COMPLETO
          </Link>
        </m.button>
      </m.section>
    </LazyMotion>
  );
};

export default WeServe;
