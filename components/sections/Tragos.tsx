"use client";
import { container, opacityAnimation } from "@/variants";
import { m, useInView, LazyMotion, domAnimation } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowTop } from "@/assets/icons";

const Tragos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px" });
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial="hidden"
        animate={isInView && "visible"}
        variants={container}
        ref={ref}
        className="w-full px-6 450:px-10 py-40 flex flex-col md:flex-row max-md:gap-6"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--primero) 0%, var(--segundo) 50%, var(--tercero) 100%)",
        }}
      >
        {/* TEXT */}
        <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col md:justify-between max-md:gap-6">
          <div className="flex flex-col gap-4">
            <m.h2
              variants={opacityAnimation}
              // className="text-4xl md:text-5xl text-center w-full bg-clip-text text-transparent bg-gradient-to-b from-sexto to-quinto font-primary font-semibold heading"
              className="text-4xl md:text-5xl text-center w-full text-sexto font-primary font-semibold text-shadow-quinto"
            >
              AFTER OFFICE
            </m.h2>
            <m.p variants={opacityAnimation} className="text-2xl text-sexto font-medium quinto-svg text-center">
              ¡Vení a conocer los mejores tragos de autor de la Ciudad!
            </m.p>
          </div>
          <div className="flex flex-col gap-6 md:gap-10 items-center">
            <m.p variants={opacityAnimation} className="text-sexto text-2xl sm:text-3xl lg:text-4xl font-medium quinto-svg text-center">
              MAR:{" "}
              <span className="text-2xl lg:text-3xl font-medium">
                2x1 en tragos de autor toda la noche.
              </span>
            </m.p>
            <m.p variants={opacityAnimation} className="text-sexto text-2xl sm:text-3xl lg:text-4xl font-medium quinto-svg text-center">
              MIER:{" "}
              <span className="text-2xl lg:text-3xl font-medium">
                {" "}
                2x1 en tragos de autor de 17 a 19:30hs.
              </span>
            </m.p>
            <m.p
              variants={opacityAnimation}
              className="text-sexto text-2xl sm:text-3xl lg:text-4xl font-medium quinto-svg text-center"
            >
              VIE|SAB:
              <span className="text-2xl lg:text-3xl font-medium">
                {" "}
                Musicalización en vivo.
              </span>
            </m.p>
          </div>
        </div>
        {/* VIDEO */}
        <div className="order-1 md:order-2 w-full md:w-1/2 h-[450px] md:h-[550px] lg:h-[600px] 850:px-4 flex justify-center items-center">
          <m.video
            variants={opacityAnimation}
            className="w-full h-full object-cover border-2 border-quinto p-2 bg-gradient-to-b from-cuarto to-primero"
            loop
            muted
            autoPlay
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/vibe/tragos.mp4" type="video/mp4" />
          </m.video>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default Tragos;
