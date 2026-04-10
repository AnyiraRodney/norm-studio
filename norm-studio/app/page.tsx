"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import MenuSection from "../components/sections/MenuSection";
import BookingsSection from "../components/sections/BookingsSection";
import ShopSection from "../components/sections/ShopSection";

/*
  HeroStorySection uses GSAP + window — must stay ssr:false.
  👇 FIX: We added a loading placeholder so the browser doesn't skip it on mobile. 👇
*/
const HeroStorySection = dynamic(
  () => import("../components/sections/HeroStorySection"),
  { 
    ssr: false,
    loading: () => <div style={{ height: "100vh", width: "100%", backgroundColor: "#FDF9F3" }} />
  }
);

export default function HomePage() {
  
  useEffect(() => {
    // Natively force the browser to the top of the page on load
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <HeroStorySection />
      <MenuSection />
      <BookingsSection />
      <ShopSection />
    </>
  );
}