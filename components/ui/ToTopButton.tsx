"use client";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import { ArrowTop } from "@/assets/icons";
import { cn } from "@/utils/cn";

const ToTopButton = ({ extraClass }: { extraClass?: string }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          className={cn(
            `bg-segundo text-quinto p-3 rounded-full border border-quinto fixed bottom-5 right-3 z-50 motion-safe:transition duration-300 ease-in-out hover:bg-quinto hover:text-segundo hover:scale-95 active:scale-95`,
            extraClass
          )}
          initial={{ opacity: 0, bottom: 50 }}
          animate={{ opacity: 1, bottom: 20 }}
          exit={{ opacity: 0, bottom: 50 }}
        >
          <ArrowTop width={16} height={16}/>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ToTopButton;
