import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase, imageUrl, one } from "@/lib/supabase";
import { finalPrice, price } from "@/lib/format";
import { Galeria } from "./galeria";

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
  const variants = product.variants.sort((a, b) => a.position - b.position);
  // Un producto sin tallas es una sola variante con label null.
  const sized = variants.filter((v) => v.label);
  const category = one(product.categories);
  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);

  return (
    <article className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
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

        <div className="mt-8 border-t border-line pt-8">
          <p className="label">{sized.length ? "Tallas disponibles" : "Disponibilidad"}</p>
          {sized.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {sized.map((v) => (
                <li
                  key={v.label}
                  className={`border px-4 py-2 text-sm ${
                    v.stock > 0
                      ? "border-ink"
                      : "border-line text-faint line-through decoration-1"
                  }`}
                  title={v.stock > 0 ? `${v.stock} disponibles` : "Agotada"}
                >
                  {v.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm">
              {totalStock > 0 ? `${totalStock} unidades disponibles` : "Agotado"}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
