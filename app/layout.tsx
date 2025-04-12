import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import LenisScrollProvider from "@/components/providers/LenisProvider";

// const primaryFont = localFont({
//   src: "./fonts/HudsonNY-Serif-edited.woff",
//   display: "swap",
//   weight: '800',
//   variable: "--primary-font",
// });

const primaryFont = Open_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["800", "500", "700"],
  variable: "--primary-font",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://segundobar.vercel.app"),
  title: "SEGUNDO BAR | Rooftop & Tragos de Autor",
  description:
    "Seguí la señal rosa y descubrí nuestro espacio en la terraza de Dandy, un rincón donde el after office se transforma en experiencias inolvidables. Porque en Segundo, la noche no termina… apenas empieza. 🍸✨",
  keywords: [
    "bar",
    "rooftop",
    "tragos de autor",
    "cocktails",
    "after office",
    "terraza",
    "bares en capital",
    "experiencia nocturna",
    "segundo bar",
    "dandy",
  ],
  alternates: {
    canonical: "/",
  },
  creator: "Julian Sanz",
  publisher: "Julian Sanz",
  authors: {
    name: "Julian",
    url: "https://www.linkedin.com/in/julian-sanz-ba4270240/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} antialiased`}>
        <LenisScrollProvider> {children}</LenisScrollProvider>
      </body>
      {/* <body className={` antialiased`}>{children}</body> */}
    </html>
  );
}
