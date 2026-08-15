// SVG en línea, sin librería de iconos: son siete glifos que no van a cambiar.
// Heredan el color con currentColor y el tamaño desde la clase del padre.

export function IconoWhatsApp({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${className} fill-current`}>
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.15-.17.2-.34.22-.63.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.86 1.2 3.05c.15.2 2.08 3.19 5.05 4.47.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.79 9.79 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 9.8 9.81c0 5.4-4.4 9.8-9.8 9.8M20.52 3.45A11.7 11.7 0 0 0 12.05 0C5.6 0 .36 5.24.36 11.68c0 2.06.54 4.06 1.56 5.83L.26 24l6.63-1.74a11.66 11.66 0 0 0 5.16 1.24h.01c6.44 0 11.69-5.24 11.69-11.68 0-3.12-1.22-6.06-3.43-8.27" />
    </svg>
  );
}

export function IconoInstagram({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoFacebook({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${className} fill-current`}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

// Los cuatro de la sección "Envío discreto". Mismo trazo y misma caja para que
// se lean como un juego, no como iconos sueltos.
const trazo = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function IconoCaja({ className = "size-5" }: { className?: string }) {
  return (
    <svg {...trazo} aria-hidden className={className}>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" />
    </svg>
  );
}

export function IconoEscudo({ className = "size-5" }: { className?: string }) {
  return (
    <svg {...trazo} aria-hidden className={className}>
      <path d="M12 3 4.5 6v6c0 4.4 3.1 8.1 7.5 9 4.4-.9 7.5-4.6 7.5-9V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function IconoTarjeta({ className = "size-5" }: { className?: string }) {
  return (
    <svg {...trazo} aria-hidden className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19M6 14.5h3.5" />
    </svg>
  );
}

export function IconoChat({ className = "size-5" }: { className?: string }) {
  return (
    <svg {...trazo} aria-hidden className={className}>
      <path d="M20.5 12.2c0 4-3.8 7.2-8.5 7.2-1 0-2-.2-2.9-.4L4 20.5l1.3-3.6a6.9 6.9 0 0 1-1.8-4.7C3.5 8.2 7.3 5 12 5s8.5 3.2 8.5 7.2Z" />
      <path d="M9 11.8h.01M12 11.8h.01M15 11.8h.01" />
    </svg>
  );
}
