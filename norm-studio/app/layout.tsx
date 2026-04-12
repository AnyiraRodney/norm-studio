import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Preloader from "../components/ui/Preloader";
import WhatsAppFab from "../components/ui/WhatsAppFab"; // 🚀 New Global Component

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Norm Ceramics — Studio & Shop | Gigiri, Nairobi",
  description: "Handcrafted ceramics, wheel throwing sessions, glazing workshops, and the Knead Bakery x Norm experience.",
  icons: {
    icon: "/favicon.ico", // Ensures your browser tab logo is correctly linked
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="bg-[#FDF9F3] selection:bg-[#FF4D00] selection:text-white">
        {/* ── Visual Transitions ── */}
        <Preloader /> 

        {/* ── Navigation ── */}
        <Header />
        
        {/* ── Main Content ── */}
        <main className="relative min-h-screen">
          {children}
        </main>
        
        {/* ── Global Footer ── */}
        <Footer />

        {/* ── Fixed Interface Elements ── */}
        {/* Placed here so it floats above all sections on every page */}
        <WhatsAppFab /> 
      </body>
    </html>
  );
}