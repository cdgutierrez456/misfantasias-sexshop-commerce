import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <p className="label">Marca blanca · Catálogo</p>
          <p className="text-xs text-faint">
            Precios de referencia. Consulta disponibilidad antes de comprar.
          </p>
        </div>
      </footer>
    </div>
  );
}
