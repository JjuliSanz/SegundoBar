"use client";
import { useRef, useState } from "react";
import { m, useInView, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import { container, left } from "@/variants";
import {
  ArrowTop,
  ClockIcon,
  CloseIcon,
  Facebook,
  Instagram,
  MailIcon,
  PinIcon,
  ReserveIcon,
  TiktokIcon,
} from "@/assets/icons";

const socials = [
  {
    name: "Instagram",
    profile: "@segundo_bar",
    link: "https://www.instagram.com/segundo_bar/",
    icon: <Instagram className="w-10 h-10" />,
  },
  {
    name: "Facebook",
    profile: "2do Bar",
    link: "https://www.facebook.com/2dobar/",
    icon: <Facebook className="w-10 h-10" />,
  },
  {
    name: "Email",
    profile: "info@segundobar.com.ar",
    link: "mailto:info@segundobar.com.ar",
    icon: <MailIcon className="w-10 h-10" />,
  },
];

interface Social {
  name: string;
  profile: string;
  link: string;
  icon: JSX.Element;
}

const Modal = ({
  social,
  onClose,
}: {
  social: Social;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90%] bg-segundo rounded-lg flex flex-col gap-6 items-center justify-center p-4 border-2 border-quinto relative"
      >
        
        {/* TEXT */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 text-quinto">
          {social.icon}

          <h3 className="text-2xl 400:text-3xl font-semibold">
            {social.profile}
          </h3>
        </div>
        {/* BUTTON */}

        <Link
          href={social.link}
          target="_blank"
          className="uppercase text-quinto px-4 py-2 text-base font-medium rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto"
        >
          ABRIR {social.name}!
        </Link>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px" });

  const [selectedSocial, setSelectedSocial] = useState<Social | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="contacto"
        ref={ref}
        className="relative w-full pt-20"
        style={{
          backgroundImage:
            "linear-gradient(to top, var(--primero) 0%, var(--segundo) 50%, var(--tercero) 100%)",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.589392824636!2d-58.41027615183274!3d-34.58925480314287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca83c6c9fd5f%3A0x6bfaf3a90b68c91c!2sAv.%20Cnel.%20D%C3%ADaz%201890%2C%20C1425DQR%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1739225972995!5m2!1sen!2sar"
          className="border-none w-[60%] lg:w-full h-[300px] md:h-[500px] opacity-40"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <m.ul
          initial="hidden"
          animate={isInView && "visible"}
          variants={container}
          className="w-[200px] 450:w-[250px] 500:w-[280px] sm:w-fit h-[400px] md:h-[600px] absolute right-0 lg:right-[80px] top-1/2 transform -translate-y-1/2 about-shadow bg-primero p-4 md:p-10 flex flex-col justify-between text-sm 450:text-lg sm:text-xl md:text-2xl font-semibold text-sexto z-20"
        >
          {/* ADDRESS */}
          <m.li
            variants={left}
            className="flex items-center gap-2 w-fit drop-shadow-quinto-sm"
          >
            <PinIcon className="w-6 md:w-10 h-6 md:h-10" /> Av. Coronel Diaz
            1890, Buenos Aires.
          </m.li>
          {/* RESERVE */}
          <m.li variants={left} className="w-fit">
            <Link
              href="https://2dobar.meitre.com/"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70 drop-shadow-quinto-sm"
              aria-label="Resevas del restaurante, se abrirá en una nueva pestaña"
            >
              <ReserveIcon className="w-6 md:w-10 h-6 md:h-10" />
              <div className="flex items-center gap-1">
                <span> Reservas</span>{" "}
                <ArrowTop className="rotate-45 w-4 h-4" />
              </div>
            </Link>{" "}
          </m.li>

          {/* TIME */}
          <m.li
            variants={left}
            className="flex items-center gap-2 w-fit drop-shadow-quinto-sm"
          >
            <ClockIcon className="w-6 md:w-10 h-6 md:h-10" />{" "}
            <span> Martes a Domingos de 05:00pm a 01:00am</span>
          </m.li>
          <m.li
            variants={left}
            className="flex items-center gap-2 w-fit drop-shadow-quinto-sm"
          >
            <ClockIcon className="w-6 md:w-10 h-6 md:h-10" />{" "}
            <span> 2x1 en tragos de autor</span>
          </m.li>
          {/* SOCIALS */}
          <m.li
            variants={left}
            className="w-full flex items-center justify-center gap-6 drop-shadow-quinto-sm"
          >
            {socials.map((social) => (
              <button
                key={social.name}
                onClick={() => setSelectedSocial(social)}
                className="flex items-center gap-2 transition duration-100 hover:scale-95 hover:opacity-70 text-sexto"
                aria-label={`Abrir modal de ${social.name}`}
              >
                {social.icon}
              </button>
            ))}
            {/* INSTAGRAM */}
            {/* <Link
              href="https://www.instagram.com/segundo_bar/"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
              aria-label="Instagram del restaurante, se abrirá en una nueva pestaña"
            >
              <Instagram className="w-6 md:w-10 h-6 md:h-10" />
            </Link> */}
            {/* FACEBOOK */}
            {/* <Link
              href="https://www.facebook.com/2dobar/"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
              aria-label="Facebook del restaurante, se abrirá en una nueva pestaña"
            >
              <Facebook className="w-6 md:w-10 h-6 md:h-10" />
            </Link> */}
            {/* EMAIL */}
            {/* <Link
              href="mailto:info@segundobar.com.ar"
              target="_blank"
              className="flex items-center gap-2 motion-safe:transition ease-in-out duration-100 hover:scale-[0.97] hover:opacity-70"
              aria-label="Mail del restaurante, se abrirá en una nueva pestaña"
            >
              <MailIcon className="w-6 md:w-10 h-6 md:h-10" />
            </Link> */}
          </m.li>
        </m.ul>
        {selectedSocial && (
          <Modal
            social={selectedSocial}
            onClose={() => setSelectedSocial(null)}
          />
        )}
      </m.section>
    </LazyMotion>
  );
};

export default ContactUs;
