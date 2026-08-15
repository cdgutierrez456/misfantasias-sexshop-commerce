"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Único componente de cliente de la app. Cambiar de foto por query param
// costaría un viaje al servidor y a Supabase por clic; aquí es inmediato.
export function Galeria({ images, alt }: { images: string[]; alt: string }) {
  const [activa, setActiva] = useState(0);
  const lightbox = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => lightbox.current?.showModal()}
        aria-label="Ver imagen completa"
        className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-wash"
      >
        <Image
          src={images[activa]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority
        />
      </button>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActiva(i)}
                aria-label={`Ver imagen ${i + 1} de ${images.length}`}
                aria-current={i === activa}
                className={`relative block aspect-square w-full overflow-hidden bg-wash outline-offset-2 transition-opacity ${
                  i === activa ? "outline outline-ink" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* <dialog> nativo: tecla Escape, foco atrapado y ::backdrop salen gratis.
          El m-auto es obligatorio: el reset de Tailwind borra el margin:auto
          con el que el navegador centra un dialog modal, y se va a la esquina. */}
      <dialog
        ref={lightbox}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/80"
      >
        <div
          onClick={() => lightbox.current?.close()}
          className="relative h-[92dvh] w-[92vw] cursor-zoom-out"
        >
          <Image src={images[activa]} alt={alt} fill sizes="92vw" className="object-contain" />

          <button
            type="button"
            onClick={() => lightbox.current?.close()}
            aria-label="Cerrar"
            className="absolute top-0 right-0 grid size-11 place-items-center bg-paper text-lg text-ink transition-opacity hover:opacity-80"
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}
