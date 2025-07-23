import clsx from "clsx/lite";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu } from "lucide-react";
import Link from "./link.astro";

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center gap-12">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ filter: "blur(20px)", opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(20px)", opacity: 0 }}
              className="hidden lg:flex gap-4"
            >
              {children}
            </motion.div>

            <motion.dialog
              open={isOpen}
              initial={{ filter: "blur(20px)", opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.25 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(20px)", opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden absolute z-50 w-full h-full flex flex-col gap-4 top-0 bg-zinc-900/20 backdrop-blur-md"
            >
              <div className="fixed bottom-20 sm:bottom-32 left-4 sm:left-8 flex flex-col items-start justify-center gap-4">
                <a
                  href="#about"
                  className="w-fit flex items-center justify-center gap-3 text-lg sm:text-2xl text-zinc-100 cursor-pointer"
                >
                  About
                </a>

                <motion.button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  initial={{
                    transform: "translateY(100px)",
                    filter: "blur(20px)",
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 25,
                    damping: 2,
                    mass: 0.1,
                  }}
                  animate={{
                    transform: "translateY(0px)",
                    filter: "blur(0px)",
                    opacity: 1,
                  }}
                  exit={{
                    transform: "translateY(100px)",
                    filter: "blur(20px)",
                    opacity: 0,
                  }}
                  className="w-fit flex items-center justify-center gap-3 text-lg sm:text-2xl text-zinc-100 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <title>Close Icon</title>
                    <path
                      fill="currentColor"
                      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                      opacity=".5"
                    />
                    <path
                      fill="currentColor"
                      d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
                    />
                  </svg>
                  Close
                </motion.button>
              </div>
            </motion.dialog>
          </>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-row gap-2 p-2 h-fit cursor-pointer  focus-visible:outline-2  focus-visible:outline-white  w-fit text-base sm:text-2xl px-5 py-2 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap text-zinc-900 bg-zinc-100 hover:outline-2 outline-offset-2 outline-zinc-100"
      >
        <Menu />
        Menu
      </button>
    </div>
  );
}

type MobileLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

function MobileLink({ href, className, children }: MobileLinkProps) {
  return (
    <motion.a
      href={href}
      initial={{
        transform: "translateY(100px)",
        filter: "blur(20px)",
        opacity: 0,
      }}
      transition={{ type: "spring", stiffness: 25, damping: 2, mass: 0.1 }}
      animate={{
        transform: "translateY(0px)",
        filter: "blur(0px)",
        opacity: 1,
      }}
      exit={{
        transform: "translateY(100px)",
        filter: "blur(20px)",
        opacity: 0,
      }}
      className={clsx(
        "w-fit flex items-center justify-center gap-3 text-lg sm:text-2xl text-zinc-100 cursor-pointer",
        className
      )}
    >
      {children}
    </motion.a>
  );
}
