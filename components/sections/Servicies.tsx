"use client";
import React from "react";
import { useRef } from "react";
import { m, useInView, LazyMotion, domAnimation } from "framer-motion";
import { container, opacityAnimation } from "@/variants";
import {
  ParkingIcon,
  PartyIcon,
  PresentationIcon,
  VipIcon,
  WineIcon,
} from "@/assets/icons";

const Item = ({ icon, title }: { icon: React.JSX.Element; title: string }) => {
  return (
    <m.div variants={opacityAnimation} className="flex flex-col items-center text-quinto">
      <div className="p-4 w-fit rounded-full border-2 border-quinto flex items-center justify-center text-quinto">
        {icon}
      </div>
      <h3 className="text-center text-lg sm:text-xl font-semibold">{title}</h3>
    </m.div>
  );
};

const Servicies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px" });
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="contacto"
        initial="hidden"
        animate={isInView && "visible"}
        variants={container}
        ref={ref}
        className="w-full flex flex-col items-center justify-center mt-20 py-20 gap-10 bg-primero relative"
      >
        <m.h2 variants={opacityAnimation} className="py-2 text-4xl md:text-5xl text-center w-full bg-clip-text text-transparent bg-gradient-to-b from-cuarto to-primero text-stroke  z-10 font-primary">
          Servicios
        </m.h2>
        <div className="flex flex-wrap justify-center gap-6 z-10">
          <Item icon={<WineIcon className="w-8 h-8" />} title="Cata de Vino" />
          <Item
            icon={<PresentationIcon className="w-8 h-8" />}
            title="Eventos Corporativos"
          />
          <Item
            icon={<VipIcon className="w-8 h-8" />}
            title="Eventos Privados"
          />
          <Item
            icon={<PartyIcon className="w-8 h-8" />}
            title="Eventos Sociales"
          />
          <Item
            icon={<ParkingIcon fill="var(--quinto)" className="w-8 h-8" />}
            title="Estacionamiento, Valet Parking"
          />
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default Servicies;
