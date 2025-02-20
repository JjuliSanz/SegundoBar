"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Parallax } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { gallery } from "@/constants";

import { m, useInView, LazyMotion, domAnimation } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "@/assets/icons/index";
import Image from "next/image";
import Link from "next/link";
import { container, opacityAnimation } from "@/variants";

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        initial="hidden"
        animate={isInView && "visible"}
        variants={container}
        id="galeria"
        className="w-full flex flex-col py-20 px-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--primero) 0%, var(--segundo) 50%, var(--tercero) 100%)",
        }}
      >
        <m.h2
          variants={opacityAnimation}
          className="w-fit py-2 text-4xl md:text-5xl text-center mx-auto font-primary text-sexto text-shadow-quinto text-stroke"
          data-text={'GALERIA'}
        >
          GALERIA
        </m.h2>
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          speed={1500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          grabCursor={true}
          loop={true}
          parallax={true}
          modules={[Parallax, Autoplay, Pagination]}
          className="w-full h-[600px] 600:h-[800px] mt-10"
        >
          <SwiperSlide className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4 ease-in-out">
            {gallery.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className="w-full relative"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration={`${800 + image.id * 50}`}
                data-swiper-parallax-scale="0.6"
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px), 50vw, 100vw"
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
                <div className="swiper-lazy-preloader"></div>
              </div>
            ))}
          </SwiperSlide>
          <SwiperSlide className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4 ease-in-out">
            {gallery.slice(6, 12).map((image, index) => (
              <div
                key={index}
                className="w-full relative"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration={`${800 + image.id * 50}`}
                data-swiper-parallax-scale="0.6"
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px), 50vw, 100vw"
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
                <div className="swiper-lazy-preloader"></div>
              </div>
            ))}
          </SwiperSlide>
          <SwiperSlide className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4 ease-in-out">
            {gallery.slice(12, 18).map((image, index) => (
              <div
                key={index}
                className="w-full relative"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration={`${800 + image.id * 50}`}
                data-swiper-parallax-scale="0.6"
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  key={index}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px), 50vw, 100vw"
                  className="w-full h-full object-cover rounded "
                  loading="lazy"
                />
                <div className="swiper-lazy-preloader"></div>
              </div>
            ))}
          </SwiperSlide>
        </Swiper>

        <button className="w-fit mx-auto my-14">
          <Link
            href="https://www.instagram.com/mustangbarngrill/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram del restaurante, se abrirá en una nueva pestaña"
            className="button motion-safe:transition duration-150 ease-in-out font-primary uppercase "
          >
            <Instagram className="w-10 h-10" />
            Seguinos en nuestro Instagram!
          </Link>
        </button>
      </m.section>
    </LazyMotion>
  );
};

export default Gallery;
