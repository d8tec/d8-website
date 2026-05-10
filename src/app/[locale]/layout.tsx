import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isEs = locale === "es";
  return {
    title: isEs ? "D8 | Ingeniería y Desarrollo" : "D8 | Engineering and Development",
    description: isEs
      ? "D8 es una empresa de ingeniería y desarrollo. R&D, integración hardware/software, desarrollo web y app, IA y soluciones de datos."
      : "D8 is an engineering and development company. R&D, hardware/software integration, web and app development, AI and data solutions.",
    openGraph: {
      title: isEs ? "D8 | Ingeniería y Desarrollo" : "D8 | Engineering and Development",
      description: isEs
        ? "R&D, integración hardware/software, desarrollo web y app, IA y soluciones de datos."
        : "R&D, hardware/software integration, web and app development, AI and data solutions.",
      siteName: "D8",
      images: [
        {
          url: `/api/og?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: isEs ? "D8 | Ingeniería y Desarrollo" : "D8 | Engineering and Development",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-content">
            {locale === "es" ? "Ir al contenido" : "Skip to content"}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
