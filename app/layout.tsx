import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/navbar/navbar";
import { Footer } from "@/components/global/footer/footer";
import localFont from "next/font/local";
import Script from "next/script";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ContactPopupProvider } from "@/contexts/contact-popup-context";
import { QuoteCartProvider } from "@/contexts/quote-cart-context";
import { ProductsCatalogProvider } from "@/contexts/products-catalog-context";
import { ContactPopup } from "@/components/ui/contact-popup";
import { QuoteCartSidebar } from "@/components/global/quote-cart-sidebar";
import { isSiteIndexingDisabled } from "@/lib/site-indexing";
import { siteConfig } from "@/lib/seo-config";
import { GoogleAnalytics } from "@next/third-parties/google";


const heroFont = localFont({
  src: [
    { path: "../public/fonts/aBlackLives.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/aBlackLives.otf", weight: "400", style: "italic" },
  ],
  display: "swap",
  variable: "--font-hero",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-RNZ4CVYSPT";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Acogas | Soluciones Industriales en GLP, Gas Natural y Vapor",
  description:
    "Más de 50 años desarrollando soluciones industriales seguras y eficientes. Marcas líderes: Emerson, Corken, Cavagna, Liquid Controls. Solicite su visita técnica.",
  ...(isSiteIndexingDisabled() && {
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/config/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${montserrat.variable} ${heroFont.variable} antialiased flex flex-col`}
        suppressHydrationWarning
      >
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <ContactPopupProvider>
          <ProductsCatalogProvider>
            <QuoteCartProvider>
              <Navbar />
              {children}
              <Footer />
              <ContactPopup />
              <QuoteCartSidebar />
            </QuoteCartProvider>
          </ProductsCatalogProvider>
        </ContactPopupProvider>

        <WhatsAppButton
            phoneNumber="+51998345895"
            message="Hola, me interesa una cotizacion o asesoria tecnica en equipos industriales (GLP, gas natural o vapor). ¿Pueden orientarme segun mi aplicacion?"
            variant="floating"
            size="lg"
            showOnMobile={true}
            showOnDesktop={true}
          />

        {/* HubSpot Embed Code - Tracking (//js.hs-scripts.com/50826545.js) */}
        <Script
          id="hs-script-loader"
          src="//js.hs-scripts.com/50826545.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
