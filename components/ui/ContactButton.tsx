"use client";
import { useState } from "react";
import { PhoneIcon } from "@/assets/icons/index";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useMediaQuery } from "react-responsive";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const ContactButton = ({
  classNameProp,
}: {
  classNameProp?: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const isTabletOrLarger = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 0,
      x: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      y: 50,
      x: -50,
      scale: 1,
      skewY: isTabletOrLarger ? -6 : 6,
      transition: {
        staggerChildren: 0.3,
        type: "spring",
        bounce: 0.6,
        duration: 1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      x: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  const item = {
    hidden: {
      opacity: 0,
      y: -10,
      x: 0,
      scale: 0.2,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <>
      <div
        className={cn(
          "hover:scale-95 transition ease-in duration-150 hover:opacity-70 active:scale-95 active:opacity-70 cursor-pointer ",
          classNameProp
        )}
        onClick={() => setShowModal(!showModal)}
      >
        <DotLottieReact
          src="/lottie/phone.json"
          loop
          autoplay
          // autoResizeCanvas
        />
      </div>
      <AnimatePresence>
        {showModal ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="absolute inset-0 w-full h-screen z-50 outline-none focus:outline-none bg-black/50 "
            onClick={() => setShowModal(false)}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="border-2 border-quinto absolute top-3 max-sm:left-24 sm:right-1 bg-segundo rounded-[50px] max-sm:rounded-tl-[5px] sm:rounded-tr-[5px] outline-none focus:outline-none text-2xl text-quinto font-serif px-10 py-6 flex flex-col gap-10"
            >
              <motion.li variants={item} className="flex gap-4">
                <PhoneIcon /> 7739-4689
              </motion.li>
              <motion.li variants={item} className="flex gap-4">
                <PhoneIcon /> 4225-6454
              </motion.li>
              <motion.li variants={item} className="flex gap-4">
                <PhoneIcon /> 4241-6355
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </>
  );
};
