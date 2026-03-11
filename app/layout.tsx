import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/navbar/navbar";
import { Footer } from "@/components/global/footer/footer";
import localFont from "next/font/local";
import Script from "next/script";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ContactPopupProvider } from "@/contexts/contact-popup-context";
import { ContactPopup } from "@/components/ui/contact-popup";

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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Acogas | Soluciones Industriales en GLP, Gas Natural y Vapor",
  description: "Más de 50 años desarrollando soluciones industriales seguras y eficientes. Marcas líderes: Emerson, Corken, Cavagna, Liquid Controls. Solicite su visita técnica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${heroFont.variable} antialiased flex flex-col`}
      >
        <ContactPopupProvider>
          <Navbar />
          {children}
          <Footer />
          <ContactPopup />
        </ContactPopupProvider>

        <WhatsAppButton
            phoneNumber="+51998345895"
            message="Hola, necesito información sobre sus servicios. ¿Pueden ayudarme?"
            variant="floating"
            size="lg"
            showOnMobile={true}
            showOnDesktop={true}
          />        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

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
