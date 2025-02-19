"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types/types";
import { AddCartIcon } from "@/assets/icons/AddCartIcon";

interface PreviewModalProps {
  selectedItem: MenuItem;
}

export const PreviewModal = ({ selectedItem }: PreviewModalProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreviewOpen = () => {
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      <button
        onClick={handlePreviewOpen}
        className="text-quinto px-2 py-1 w-fit text-sm font-medium text-start rounded border-2 border-quinto hover:scale-95 transition duration-300 ease-in-out hover:text-segundo hover:bg-quinto active:scale-95 active:text-segundo active:bg-quinto"
      >
        PREVIEW
      </button>
      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-0"
          onClick={handlePreviewClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[350px] h-[460px] bg-marron rounded-lg flex flex-col"
          >
            <div className="relative w-full min-h-60 max-h-60">
              {selectedItem.image ? (
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  width={500}
                  height={500}
                  sizes="(max-width: 450px) 300px, 500px"
                  loading="lazy"
                  className="object-cover w-full h-full rounded-t-lg"
                />
              ) : (
                <div className="bg-segundo w-full h-full rounded-t-lg"></div>
              )}
            </div>

            <div className="w-full flex flex-col grow justify-between gap-4 p-4 min-h-[150px] bg-tercero">
              <div className="flex flex-col gap-2">
                <h3 className="text-sexto text-3xl md:text-2xl lg:text-3xl font-semibold">
                  {selectedItem.title}
                </h3>
                {selectedItem.description && (
                  <p className="text-quinto font-medium text-2xl md:text-xl lg:text-2xl">
                    {selectedItem.description}
                  </p>
                )}
              </div>
              <div className="w-full flex justify-between items-center">
                <button className="px-4 py-1 w-fit flex motion-safe:transition duration-300 ease-in-out text-base md:text-xl font-medium text-quinto rounded bg-segundo hover:bg-quinto border border-quinto hover:text-segundo outline-none focus:outline-none hover:scale-95 active:scale-95">
                  <AddCartIcon className="w-5" />
                </button>
                <p className="text-end text-sexto font-semibold text-2xl md:text-xl lg:text-2xl">
                  {selectedItem.price === null ? (
                    "Precio no disponible"
                  ) : (
                    <>${selectedItem.price}</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
