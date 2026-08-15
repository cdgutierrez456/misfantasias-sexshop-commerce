import type { Metadata } from "next";
import { Jost, Parisienne, Playfair_Display } from "next/font/google";
import "./globals.css";

// next/font las autoaloja: cero peticiones a Google en el navegador y sin
// salto de layout. Solo exponen la variable CSS; quién las usa lo decide
// globals.css a través de --font-sans / --font-serif / --font-script.
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const parisienne = Parisienne({ subsets: ["latin"], weight: "400", variable: "--font-parisienne" });

export const metadata: Metadata = {
  title: "Mis Fantasías — Sex Shop",
  description:
    "Lencería, juguetes, cosmética íntima y kits para parejas. Asesoría por WhatsApp y envío discreto a todo Colombia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jost.variable} ${playfair.variable} ${parisienne.variable}`}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
