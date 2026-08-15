import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { REDES, whatsappUrl } from "@/lib/contacto";
import { IconoFacebook, IconoInstagram, IconoWhatsApp } from "./iconos";

const redes = [
  {
    nombre: "WhatsApp",
    url: whatsappUrl("Hola, vi el catálogo de Marca blanca y me gustaría conocer sus productos."),
    icono: <IconoWhatsApp />,
  },
  { nombre: "Instagram", url: REDES.instagram, icono: <IconoInstagram /> },
  { nombre: "Facebook", url: REDES.facebook, icono: <IconoFacebook /> },
];

export default async function TiendaLayout({ children }: { children: React.ReactNode }) {
  const db = await supabase();
  const [{ data: categories }, { data: session }] = await Promise.all([
    db.from("categories").select("name, slug").order("position"),
    // Solo decide si se pinta el enlace al panel. Quien proteja /admin es el
    // proxy y las policies RLS, no este if.
    db.auth.getUser(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-baseline gap-8 px-6 py-5">
          <Link href="/" className="text-[0.9rem] font-medium tracking-[0.28em] uppercase">
            Marca blanca
          </Link>
          <nav className="flex flex-1 gap-6 overflow-x-auto">
            <Link href="/" className="label hover:text-ink whitespace-nowrap">
              Todo
            </Link>
            {categories?.map((c) => (
              <Link
                key={c.slug}
                href={`/?categoria=${c.slug}`}
                className="label hover:text-ink whitespace-nowrap"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          {session.user && (
            <Link
              href="/admin"
              className="label border-l border-line pl-6 whitespace-nowrap hover:text-ink"
            >
              Panel ↗
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-8">
            <p className="label">Escríbenos</p>
            <ul className="flex gap-2">
              {redes.map((r) => (
                <li key={r.nombre}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.nombre}
                    title={r.nombre}
                    className="grid size-11 place-items-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    {r.icono}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          {/* La página es dinámica, así que el año se calcula en cada petición
              y no se queda congelado en el del último despliegue. */}
          {/* Entrada discreta al panel: sin subrayado, color ni hover propios.
              El reset de Tailwind ya hace que un <a> herede el estilo del
              texto, así que basta con no darle clases. No es una medida de
              seguridad —de eso se encargan el login y RLS—, solo evita el
              enlace "Admin" a la vista de todos. */}
          <p className="label">
            © {new Date().getFullYear()}{" "}
            <Link href="/login" aria-label="Panel administrativo">
              Marca blanca
            </Link>
          </p>

          <p className="text-xs text-faint">
            Precios de referencia. Consulta disponibilidad antes de comprar.
          </p>

          <p className="text-xs text-faint">
            By{" "}
            <a
              href="https://scaleautomatization.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline underline-offset-4 transition-colors hover:text-ink"
            >
              Scale Automatization
            </a>
          </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
