import Link from "next/link";
import { signOut } from "./actions";
import { Marca } from "../marca";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4">
          <Link href="/admin">
            <Marca className="text-2xl text-brand-deep" subClassName="text-[0.5rem] text-brand" />
          </Link>
          <nav className="flex flex-1 gap-6">
            <Link href="/admin" className="label hover:text-ink">
              Productos
            </Link>
            <Link href="/admin/categorias" className="label hover:text-ink">
              Categorías
            </Link>
            <Link href="/" className="label hover:text-ink">
              Ver tienda ↗
            </Link>
          </nav>
          <form action={signOut}>
            <button className="label hover:text-ink">Salir</button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
