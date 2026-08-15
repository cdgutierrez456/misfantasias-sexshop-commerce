import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase, imageUrl, one } from "@/lib/supabase";
import { finalPrice, price } from "@/lib/format";
import { Galeria } from "./galeria";
import { Contacto } from "./contacto";

export default async function Producto({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const db = await supabase();

  const { data: product } = await db
    .from("products")
    .select(
      "id, name, description, price, discount_percent, images(path, position), variants(label, stock, position), categories(name, slug)",
    )
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!product) notFound();

  const images = product.images.sort((a, b) => a.position - b.position);
  // Un producto sin tallas es una sola variante con label null.
  const variants = product.variants.sort((a, b) => a.position - b.position);
  const category = one(product.categories);

  return (
    <article className="mx-auto grid max-w-5xl gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-16">
      <div>
        {images.length ? (
          <Galeria images={images.map((img) => imageUrl(img.path))} alt={product.name} />
        ) : (
          <div className="grid aspect-[4/5] place-items-center bg-wash text-xs text-faint">
            Sin imagen
          </div>
        )}
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <Link href="/" className="label hover:text-ink">
          ← Volver
        </Link>

        {category && <p className="label mt-8">{category.name}</p>}
        <h1 className="mt-2 text-3xl leading-tight font-light tracking-tight">{product.name}</h1>

        <p className="mt-5 flex items-baseline gap-3 text-lg tabular-nums">
          {product.discount_percent > 0 ? (
            <>
              <span className="text-faint line-through">{price(product.price)}</span>
              <span>{price(finalPrice(product.price, product.discount_percent))}</span>
              <span className="bg-ink px-2 py-1 text-[0.625rem] tracking-[0.14em] text-paper uppercase">
                −{product.discount_percent}%
              </span>
            </>
          ) : (
            price(product.price)
          )}
        </p>

        {product.description && (
          <p className="mt-8 border-t border-line pt-8 text-sm leading-relaxed whitespace-pre-line text-muted">
            {product.description}
          </p>
        )}

        {/* La lista de tallas ahora es el selector: mostrarlas y volver a
            pedirlas en un desplegable aparte sería la misma info dos veces. */}
        <Contacto
          nombre={product.name}
          categoria={category?.name ?? null}
          precioLista={Number(product.price)}
          precioFinal={finalPrice(product.price, product.discount_percent)}
          descuento={product.discount_percent}
          variantes={variants}
        />
      </div>
    </article>
  );
}
