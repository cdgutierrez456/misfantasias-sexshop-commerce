import Image from "next/image";
import Link from "next/link";
import { supabase, imageUrl, one } from "@/lib/supabase";
import { finalPrice, price } from "@/lib/format";
import { whatsappUrl } from "@/lib/contacto";
import { Marca } from "../marca";
import { IconoCaja, IconoChat, IconoEscudo, IconoTarjeta } from "./iconos";

const garantias = [
  {
    icono: <IconoCaja className="size-4" />,
    titulo: "Empaque neutro",
    texto: "Caja sin logos ni referencias al contenido, sellada a mano.",
  },
  {
    icono: <IconoEscudo className="size-4" />,
    titulo: "Datos protegidos",
    texto: "No compartimos tu información y borramos el historial si lo pides.",
  },
  {
    icono: <IconoTarjeta className="size-4" />,
    titulo: "Cobro discreto",
    texto: "El pago aparece sin mencionar el nombre de la tienda.",
  },
  {
    icono: <IconoChat className="size-4" />,
    titulo: "Asesoría privada",
    texto: "Una sola persona atiende tu chat, de principio a fin.",
  },
];

const faqs = [
  {
    q: "¿El envío es realmente discreto?",
    a: "Sí. Usamos empaque neutro sin logos, marcas ni descripciones del contenido. En la guía va un remitente genérico y solo tú sabes qué pediste.",
  },
  {
    q: "¿Cómo hago mi pedido?",
    a: "Escríbenos por WhatsApp al 300 258 9814. Te asesoramos, confirmamos disponibilidad, te pasamos el total con envío y coordinamos el pago.",
  },
  {
    q: "¿Hacen envíos fuera de Manizales?",
    a: "Enviamos a todo Colombia por transportadora. En Manizales entregamos el mismo día según la hora del pedido; al resto del país llega en 1 a 3 días hábiles.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Transferencia, Nequi, Daviplata y pago contra entrega en ciudades habilitadas. El movimiento aparece sin mencionar el nombre de la tienda.",
  },
  {
    q: "¿Los juguetes son seguros?",
    a: "Trabajamos con silicona médica y materiales libres de ftalatos, sellados de fábrica. Por higiene no aceptamos devoluciones de productos abiertos.",
  },
  {
    q: "¿Puedo pedir asesoría si es mi primera vez?",
    a: "Claro. Cuéntanos qué buscas y te recomendamos opciones según tu experiencia y presupuesto, sin juicios y con total confidencialidad.",
  },
];

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

  const [{ data: products }, { data: categories }] = await Promise.all([
    query,
    db.from("categories").select("name, slug").order("position"),
  ]);

  const activa = categories?.find((c) => c.slug === categoria);

  return (
    <>
      <section
        id="inicio"
        className="relative overflow-hidden bg-[radial-gradient(120%_100%_at_15%_0%,#7c1450_0%,#4b0b2b_55%,#2c0518_100%)] text-cream"
      >
        {/* Trama diagonal tenue: le quita el plano al degradado sin cargar
            una textura. */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,.05)_0_1px,transparent_1px_13px)] opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="animate-fade-up">
            <p className="inline-flex rounded-full border border-brand-soft/40 px-4 py-2 text-[0.6875rem] tracking-[0.32em] text-brand-pale uppercase">
              Manizales · Colombia
            </p>
            <h1 className="mt-8 font-serif text-[clamp(2.75rem,5.4vw,4.875rem)] leading-[1.02] font-normal tracking-tight">
              Tus fantasías,
              <br />
              <em className="font-script text-[1.18em] not-italic text-brand-pale">
                con total discreción
              </em>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-cream/75 text-pretty">
              Lencería, juguetes, cosmética íntima y kits para parejas. Asesoría personalizada por
              WhatsApp y envío discreto a todo el país: nadie sabrá qué hay dentro de la caja.
            </p>
            <div className="mt-10 flex flex-wrap gap-3.5">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="cta bg-brand px-8 py-4.5 text-[0.8125rem] tracking-[0.18em] text-white hover:bg-brand-soft"
              >
                Asesórate ahora
              </a>
              <Link
                href="#categorias"
                className="cta border border-cream/40 px-8 py-4.5 text-[0.8125rem] tracking-[0.18em] text-cream hover:border-brand-soft hover:text-brand-pale"
              >
                Ver catálogo
              </Link>
            </div>
            <ul className="mt-13 flex flex-wrap gap-x-9 gap-y-3 text-[0.8125rem] tracking-[0.1em] text-cream/55 uppercase">
              <li>Empaque neutro</li>
              <li>Pago contra entrega</li>
              <li>Atención 100% privada</li>
            </ul>
          </div>

          {/* ponytail: medallón tipográfico en vez de imagen. Evita depender de
              un archivo y no hay logo en mapa de bits en el repo; si llega uno,
              se reemplaza el <Marca> por un <Image> con las mismas medidas. */}
          <div className="relative hidden animate-fade-up justify-center lg:flex">
            <div className="absolute size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(240,107,168,.35),transparent_68%)] blur-sm" />
            <div className="relative grid aspect-square w-full max-w-[26rem] place-items-center rounded-full border border-cream/30 bg-[radial-gradient(circle_at_30%_25%,#7c1450,#2c0518)] shadow-[0_40px_90px_rgba(0,0,0,.45)]">
              <Marca
                stacked
                className="text-[4rem] text-cream"
                subClassName="text-[0.6875rem] text-brand-pale"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-deep text-cream">
        <ul className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-10 gap-y-2 px-6 py-6 text-[0.8125rem] tracking-[0.12em] uppercase">
          <li>Envío discreto en 24–48 h</li>
          <li aria-hidden className="text-brand-pale">
            ·
          </li>
          <li>Asesoría personalizada sin juicios</li>
          <li aria-hidden className="text-brand-pale">
            ·
          </li>
          <li>Productos body safe certificados</li>
        </ul>
      </section>

      <section id="categorias" className="mx-auto max-w-6xl px-6 pt-24 pb-10">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 className="mt-4 font-serif text-[clamp(2.125rem,3.6vw,3.125rem)] leading-tight font-normal">
              Explora por categoría
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            Elige una categoría para filtrar el catálogo, o escríbenos y te ayudamos a encontrar lo
            que buscas.
          </p>
        </div>

        {/* ponytail: sin foto por categoría en la base, se usa el rayado del
            diseño. Si se agrega una columna de imagen, entra aquí un <Image>. */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories?.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/?categoria=${c.slug}#productos`}
                className="stripes relative block aspect-[4/5] overflow-hidden rounded-sm border border-line transition-colors hover:border-brand"
              >
                <span className="absolute inset-0 bg-linear-to-t from-brand-night/90 via-brand-night/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="block font-serif text-2xl leading-tight text-cream">
                    {c.name}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] tracking-[0.06em] text-brand-pale">
                    Ver productos
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="productos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <div className="mb-12 text-center">
          <p className="eyebrow">{activa ? "Categoría" : "Los más pedidos"}</p>
          <h2 className="mt-4 font-serif text-[clamp(2.125rem,3.6vw,3.125rem)] font-normal">
            {activa ? activa.name : "Productos destacados"}
          </h2>
          <p className="mt-4 text-sm text-faint">
            {products?.length ?? 0} {products?.length === 1 ? "producto" : "productos"}
            {activa && (
              <>
                {" · "}
                <Link href="/#productos" className="text-brand hover:text-brand-soft">
                  ver todo
                </Link>
              </>
            )}
          </p>
        </div>

        {!products?.length ? (
          <p className="py-20 text-center text-sm text-muted">
            Todavía no hay productos publicados en esta categoría.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const cover = p.images.sort((a, b) => a.position - b.position)[0];
              const category = one(p.categories);
              return (
                <li key={p.id}>
                  {/* La tarjeta entera es el enlace a la ficha: el mensaje de
                      WhatsApp con nombre, talla y cantidad se arma allá, no
                      aquí, donde todavía no hay producto elegido. */}
                  <Link
                    href={`/producto/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-brand-soft"
                  >
                    {/* contain, no cover: la foto entra completa aunque los
                        encuadres vengan disparejos. */}
                    <div className="relative aspect-square bg-wash">
                      {cover ? (
                        <Image
                          src={imageUrl(cover.path)}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-xs text-faint">
                          Sin imagen
                        </div>
                      )}
                      {p.discount_percent > 0 && (
                        <span className="absolute top-4 left-4 rounded-sm bg-brand-deep px-3 py-1.5 text-[0.625rem] tracking-[0.18em] text-cream uppercase">
                          −{p.discount_percent}%
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {category && (
                        <p className="text-[0.6875rem] tracking-[0.2em] text-faint uppercase">
                          {category.name}
                        </p>
                      )}
                      <h3 className="font-serif text-xl leading-snug font-medium">{p.name}</h3>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <p className="font-serif text-xl text-brand tabular-nums">
                          {p.discount_percent > 0 ? (
                            <>
                              <span className="mr-2 text-sm text-faint line-through">
                                {price(p.price)}
                              </span>
                              {price(finalPrice(p.price, p.discount_percent))}
                            </>
                          ) : (
                            price(p.price)
                          )}
                        </p>
                        <span className="cta shrink-0 bg-brand px-4 py-3 text-[0.6875rem] text-white group-hover:bg-brand-deep">
                          Lo quiero
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section id="discreto" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Tu privacidad primero</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,3.4vw,2.875rem)] leading-tight font-normal">
              Envío discreto, siempre
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">
              Tu pedido viaja en empaque neutro, sin logos ni referencias al contenido. En la guía
              aparece un remitente genérico y el cobro en tu extracto no menciona la tienda.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta mt-9 bg-brand-deep text-cream hover:bg-brand"
            >
              Preguntar por mi ciudad
            </a>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {garantias.map((g) => (
              <li key={g.titulo} className="rounded-sm border border-line bg-surface p-7">
                <span className="grid size-9 place-items-center rounded-full border border-brand/30 bg-wash text-brand">
                  {g.icono}
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold">{g.titulo}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{g.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-wash">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="mb-11 text-center font-serif text-[clamp(2rem,3.4vw,2.875rem)] font-normal">
            Preguntas frecuentes
          </h2>
          {/* <details> nativo: abrir y cerrar, teclado y semántica sin una línea
              de JavaScript ni estado de cliente. */}
          <ul className="flex flex-col gap-3">
            {faqs.map((f) => (
              <li key={f.q}>
                <details className="group rounded-sm border border-line bg-surface open:border-brand/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 text-[1.0625rem] hover:text-brand [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-xl leading-none text-brand">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="max-w-[70ch] px-6 pb-6 text-[0.9375rem] leading-relaxed text-muted">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
