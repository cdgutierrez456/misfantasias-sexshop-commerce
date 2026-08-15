import Image from "next/image";
import Link from "next/link";
import { supabase, imageUrl, one } from "@/lib/supabase";
import { finalPrice, price } from "@/lib/format";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { categoria } = await searchParams;
  const db = await supabase();

  let query = db
    .from("products")
    .select("id, name, slug, price, discount_percent, images(path, position), categories(name, slug)")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (typeof categoria === "string") {
    const { data: cat } = await db.from("categories").select("id").eq("slug", categoria).single();
    query = query.eq("category_id", cat?.id ?? "00000000-0000-0000-0000-000000000000");
  }

  const { data: products } = await query;

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="label">Colección</p>
          <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-light tracking-tight sm:text-6xl">
            Piezas sencillas,
            <br />
            hechas para durar.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            Catálogo completo con disponibilidad y tallas al día. Sin carrito, sin apuros: mira lo
            que hay y escríbenos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="label">{categoria ? categoria : "Todos los productos"}</h2>
          <span className="text-xs text-faint">{products?.length ?? 0} piezas</span>
        </div>

        {!products?.length ? (
          <p className="py-20 text-center text-sm text-muted">
            Todavía no hay productos publicados.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {products.map((p) => {
              const cover = p.images.sort((a, b) => a.position - b.position)[0];
              const category = one(p.categories);
              return (
                <li key={p.id}>
                  <Link href={`/producto/${p.slug}`} className="group block">
                    {/* Mismo criterio que la ficha: contain para no recortar.
                        El recuadro cuadrado con borde mantiene la grilla
                        pareja aunque las fotos vengan con encuadres distintos. */}
                    <div className="relative aspect-square overflow-hidden border border-line bg-surface">
                      {cover ? (
                        <Image
                          src={imageUrl(cover.path)}
                          alt={p.name}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-xs text-faint">
                          Sin imagen
                        </div>
                      )}
                      {p.discount_percent > 0 && (
                        <span className="absolute top-3 left-3 bg-ink px-2 py-1 text-[0.625rem] tracking-[0.14em] text-paper uppercase">
                          −{p.discount_percent}%
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3 className="text-sm">{p.name}</h3>
                      <p className="shrink-0 text-sm tabular-nums">
                        {p.discount_percent > 0 ? (
                          <>
                            <span className="mr-2 text-faint line-through">{price(p.price)}</span>
                            {price(finalPrice(p.price, p.discount_percent))}
                          </>
                        ) : (
                          price(p.price)
                        )}
                      </p>
                    </div>
                    {category && <p className="label mt-1">{category.name}</p>}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
