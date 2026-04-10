import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Preloader from "../components/ui/Preloader"; // 👈 We imported the preloader

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
      <body suppressHydrationWarning>
        <Preloader /> {/* 👈 Preloader sits above everything */}
        <Header />
        
        <main>
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}