import { MARCA, SUBMARCA } from "@/lib/contacto";

// El logotipo es tipográfico, no una imagen: escala sin pixelarse, se pinta
// en el HTML inicial y cambia de color con una clase. Aparece en header,
// footer, verificación de edad, login y panel.
// ponytail: si algún día hay logo en mapa de bits, va aquí y en un solo sitio.
export function Marca({
  className = "text-[2.1rem] text-brand-deep",
  subClassName = "text-[0.5625rem] text-brand",
  stacked = false,
}: {
  className?: string;
  subClassName?: string;
  stacked?: boolean;
}) {
  return (
    <span
      className={
        stacked ? "block" : "flex items-baseline gap-2.5 whitespace-nowrap"
      }
    >
      <span className={`block font-script leading-none ${className}`}>{MARCA}</span>
      <span
        className={`block tracking-[0.42em] uppercase ${stacked ? "mt-2.5" : "pb-1"} ${subClassName}`}
      >
        {SUBMARCA}
      </span>
    </span>
  );
}
