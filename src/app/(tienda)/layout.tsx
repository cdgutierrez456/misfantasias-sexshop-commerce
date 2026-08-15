import Link from "next/link";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { CIUDAD, HORARIO, REDES, TELEFONO, whatsappUrl } from "@/lib/contacto";
import { Marca } from "../marca";
import { COOKIE_EDAD, VerificacionEdad } from "./edad";
import { IconoFacebook, IconoInstagram, IconoWhatsApp } from "./iconos";

const redes = [
  { nombre: "WhatsApp", url: whatsappUrl(), icono: <IconoWhatsApp /> },
  { nombre: "Instagram", url: REDES.instagram, icono: <IconoInstagram /> },
  { nombre: "Facebook", url: REDES.facebook, icono: <IconoFacebook /> },
];

export default async function TiendaLayout({ children }: { children: React.ReactNode }) {
  const db = await supabase();
  const mayorDeEdad = (await cookies()).has(COOKIE_EDAD);
  const [{ data: categories }, { data: session }] = await Promise.all([
    db.from("categories").select("name, slug").order("position"),
    // Solo decide si se pinta el enlace al panel. Quien proteja /admin es el
    // proxy y las policies RLS, no este if.
    db.auth.getUser(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      {!mayorDeEdad && <VerificacionEdad />}

      <header className="sticky top-0 z-10 border-b border-line bg-paper/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-x-8 gap-y-3 px-6 py-3.5">
          <Link href="/" aria-label="Inicio">
            <Marca />
          </Link>
          {/* El listado de categorías sigue siendo la navegación: el ancla
              #productos evita aterrizar en el hero cada vez que se filtra. */}
          {/* min-w-0: sin él un hijo flex no baja de su contenido y el
              overflow-x-auto no sirve — la barra ensancha toda la página. */}
          <nav className="flex min-w-0 flex-1 gap-6 overflow-x-auto text-[0.6875rem] tracking-[0.14em] uppercase">
            <Link href="/#productos" className="whitespace-nowrap text-muted hover:text-brand">
              Todo
            </Link>
            {categories?.map((c) => (
              <Link
                key={c.slug}
                href={`/?categoria=${c.slug}#productos`}
                className="whitespace-nowrap text-muted hover:text-brand"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="cta hidden bg-brand-deep text-cream hover:bg-brand md:inline-flex"
          >
            Pedir por WhatsApp
          </a>
          {session.user && (
            <Link
              href="/admin"
              className="label border-l border-line pl-6 whitespace-nowrap hover:text-brand"
            >
              Panel ↗
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-brand-night text-cream/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-20 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Marca stacked className="text-[2.9rem] text-cream" subClassName="text-[0.625rem] text-brand-soft" />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-cream/60">
              Placer con confianza. Asesoría honesta, productos seguros y la discreción que
              mereces.
            </p>
            <ul className="mt-7 flex gap-2">
              {redes.map((r) => (
                <li key={r.nombre}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.nombre}
                    title={r.nombre}
                    className="grid size-11 place-items-center border border-cream/20 text-cream/70 transition-colors hover:border-brand-soft hover:text-cream"
                  >
                    {r.icono}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.6875rem] tracking-[0.28em] text-brand-pale uppercase">Contacto</p>
            <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-soft"
                >
                  WhatsApp {TELEFONO}
                </a>
              </li>
              <li>{CIUDAD}</li>
              <li>{HORARIO}</li>
              <li>Envíos a todo el país</li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6875rem] tracking-[0.28em] text-brand-pale uppercase">Explora</p>
            <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
              <li>
                <Link href="/#categorias" className="hover:text-brand-soft">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="hover:text-brand-soft">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/#discreto" className="hover:text-brand-soft">
                  Envío discreto
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-brand-soft">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-6 gap-y-3 border-t border-cream/15 px-6 py-8 text-xs tracking-[0.08em] text-cream/50">
          {/* La página es dinámica, así que el año se calcula en cada petición
              y no se queda congelado en el del último despliegue. */}
          {/* Entrada discreta al panel: sin subrayado, color ni hover propios.
              El reset de Tailwind ya hace que un <a> herede el estilo del
              texto, así que basta con no darle clases. No es una medida de
              seguridad —de eso se encargan el login y RLS—, solo evita el
              enlace "Admin" a la vista de todos. */}
          <p>
            © {new Date().getFullYear()}{" "}
            <Link href="/login" aria-label="Panel administrativo">
              Mis Fantasías Sex Shop
            </Link>
          </p>
          <p>Venta exclusiva para mayores de 18 años</p>
          <p>
            By{" "}
            <a
              href="https://scaleautomatization.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-brand-soft"
            >
              Scale Automatization
            </a>
          </p>
        </div>
      </footer>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="cta fixed right-6 bottom-6 z-50 animate-wa-pulse rounded-full bg-brand text-white shadow-[0_18px_40px_rgba(43,5,24,.35)] hover:bg-brand-deep"
      >
        <IconoWhatsApp className="size-4" />
        Escríbenos
      </a>
    </div>
  );
}
