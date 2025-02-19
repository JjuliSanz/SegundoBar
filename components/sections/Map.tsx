"use client";
import { container, left, right } from "@/variants";
import { m, useInView, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowTop,
  ClockIcon,
  DeliveryIcon,
  Facebook,
  Instagram,
  MailIcon,
  PinIcon,
  ReserveIcon,
  Whatsapp,
} from "@/assets/icons";

const Map = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial="hidden"
        animate={isInView && "visible"}
        variants={container}
        ref={ref}
        id="contacto"
        className="relative w-full min-h-screen flex items-center justify-center text-center px-10 py-20 overflow-hidden z-20 bg-cuarto"
      >
        <m.ul className="w-full flex flex-col gap-4 text-2xl md:text-3xl font-semibold text-segundo z-20">
          <m.li variants={left} className="flex items-center gap-2 w-fit">
            <PinIcon className="w-10" /> Av. Figueroa Alcorta 6402
          </m.li>
          <m.li variants={left} className="w-fit">
            <Link
              href="https://selquet.meitre.com"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
            >
              <ReserveIcon className="w-10" />
              <div className="flex gap-1">
                <span> Reservas</span>{" "}
                <ArrowTop className="rotate-45" width={15} />
              </div>
            </Link>{" "}
          </m.li>
          <m.li variants={left} className="w-fit">
            <Link
              href="https://api.whatsapp.com/send?phone=541147844364"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
            >
              <Whatsapp className="w-10" />
              +54 11 4784-4364
            </Link>
          </m.li>

          <m.li variants={left} className="w-fit">
            <Link
              href="https://www.pedidosya.com.ar/restaurantes/buenos-aires/selquet-83ae4641-af74-4c1c-90aa-a40abe57ee9d-menu"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
            >
              <DeliveryIcon className="w-10" />
              Pedidos ya
            </Link>
          </m.li>
          <m.li variants={left} className="flex items-center gap-2 w-fit">
            <ClockIcon className="w-10" /> Lunes a Domingos: 7am - 1am
          </m.li>
          <m.li variants={left} className="w-fit flex gap-2 ">
            <Link
              href="https://www.instagram.com/selquetrestaurantbar/"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
            >
              <Instagram width={40} height={40} />
            </Link>
            <Link
              href="https://www.facebook.com/SavoryHeladosYCafe/"
              className="flex items-center gap-2 transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
              target="_blank"
            >
              <Facebook className="w-10" />
            </Link>
            <Link
              href="mailto:info@selquet.com"
              target="_blank"
              className="flex items-center gap-2 transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
            >
              <MailIcon className="w-10" />
            </Link>
          </m.li>
        </m.ul>
        <div className="md:w-1/2 w-full flex justify-center items-center md:mt-0 mt-6 z-10">
          <m.iframe
            variants={right}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11005.024788947745!2d-58.441186410095206!3d-34.55092652405814!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5b4a6378c41%3A0x1563cbe5454fdb97!2sSelquet%20Restaurant%20%2B%20Bar!5e1!3m2!1sen!2sar!4v1730934353746!5m2!1sen!2sar"
            // style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg opacity-80 border-8 border-blanco-oscuro w-full h-[350px] md:h-[450px]"
          ></m.iframe>
        </div>
        <div className="absolute righ-20 -top-20 box-shadow-quinto-xs"></div>
      </m.section>
    </LazyMotion>
  );
};

export default Map;
