"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export type PanchsheelGalleryPhoto = { src: string; alt: string };

export function PanchsheelGreens2PhotoGallery({ photos }: { photos: readonly PanchsheelGalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-200 bg-neutral-100 text-left shadow-sm outline-none ring-offset-2 transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#CBB27A] cursor-zoom-in"
            aria-label={`Enlarge: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition duration-200 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, 25vw"
              unoptimized
            />
          </button>
        ))}
      </div>

      {openIndex !== null && photos[openIndex] ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 z-[201] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBB27A]"
            aria-label="Close enlarged photo"
          >
            <X className="size-6" aria-hidden />
          </button>
          <div
            className="relative flex max-h-[min(90vh,900px)] w-full max-w-[min(100vw-1.5rem,1400px)] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[min(85vh,800px)] w-full">
              <Image
                src={photos[openIndex].src}
                alt={photos[openIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
