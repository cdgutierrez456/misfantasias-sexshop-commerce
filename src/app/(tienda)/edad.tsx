"use client";

import { useState } from "react";
import { Marca } from "../marca";

export const COOKIE_EDAD = "mf-mayor-de-edad";

// Cookie y no localStorage: así el servidor sabe si ya se confirmó y ni
// siquiera manda el muro en el HTML. Sin useEffect, sin parpadeo y sin estado
// que reconciliar en la hidratación; el único setState vive en el clic.
export function VerificacionEdad() {
  const [ok, setOk] = useState(false);
  if (ok) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Verificación de edad"
      className="fixed inset-0 z-[90] grid place-items-center bg-linear-[160deg,var(--color-brand-dark),var(--color-brand-deep)_55%,var(--color-brand-dark)] px-6"
    >
      <div className="max-w-md rounded-sm border border-cream/20 bg-brand-night/50 px-9 py-11 text-center backdrop-blur-sm">
        <Marca
          stacked
          className="text-[3.6rem] text-cream"
          subClassName="text-xs text-brand-soft"
        />
        <p className="mt-7 text-base leading-relaxed text-cream/85">
          Este sitio contiene contenido para adultos. Al continuar confirmas que tienes{" "}
          <strong className="font-medium text-white">18 años o más</strong>.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              document.cookie = `${COOKIE_EDAD}=1;path=/;max-age=31536000;samesite=lax`;
              setOk(true);
            }}
            className="cta bg-brand text-white hover:bg-brand-soft"
          >
            Soy mayor de 18
          </button>
          <a
            href="https://www.google.com"
            className="cta border border-cream/35 text-cream/90 hover:border-brand-soft hover:text-white"
          >
            Salir
          </a>
        </div>
      </div>
    </div>
  );
}
