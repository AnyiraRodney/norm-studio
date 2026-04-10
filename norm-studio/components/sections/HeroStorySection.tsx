"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const CHARCOAL = "#2D2926";
const LINEN = "#FDF9F3";
const TERRACOTTA = "#FF4D00";

const PIN_PX = 3000; 
const SNAP_POINTS = [0, 0.3333, 0.6666, 1.0];

const STORY_PANELS = [
  { id: "s1", type: "image" as const, src: "/images/gallery/clay-raw.jpg", label: "01", heading: "The\nRaw Material", body: "Every piece begins as a block of earth. No two are the same." },
  { id: "s2", type: "image" as const, src: "/images/gallery/wheel.jpg", label: "02", heading: "The\nProcess", body: "Centred. Patient. Alive. The wheel demands presence." },
  { id: "s3", type: "image" as const, src: "/images/gallery/knead-collab.jpg", label: "03", heading: "The\nPartnership", body: "Fuel for the wheel — Knead Bakery x Norm." },
  { id: "s4", type: "image" as const, src: "/images/gallery/cups.jpg", label: "04", heading: "The\nResult", body: "Objects that outlive their making." },
];

const PROCEDURE_PANELS = [
  { id: "p1", type: "image" as const, src: "/images/clay-process.jpg", label: "01", heading: "Centering", body: "Press downward and inward. The clay must run true before anything else." },
  { id: "p2", type: "image" as const, src: "/images/procedure/opening.jpg", label: "02", heading: "Opening\nthe Floor", body: "Press outward from centre to create a flat, even base." },
  { id: "p3", type: "image" as const, src: "/images/procedure/pulling.jpg", label: "03", heading: "Pulling\nthe Rim", body: "Lift and shape the outer edge. Maintain thickness or the rim will warp." },
  { id: "p4", type: "image" as const, src: "/images/procedure/trimming.jpg", label: "04", heading: "Trimming\nthe Foot", body: "Leather-hard, flipped. Carve a stable foot — your last opportunity." },
];

const GALLERY_PANELS = [
  { id: "g1", type: "image" as const, src: "/images/gallery/glazing.jpg", label: "01", heading: "The\nGlaze", body: "Colour born from fire. Every piece is a small surprise." },
  { id: "g2", type: "image" as const, src: "/images/gallery/wheel.jpg", label: "02", heading: "At the\nWheel", body: "315 UN Crescent. Monday through Saturday." },
  { id: "g3", type: "image" as const, src: "/images/gallery/clay-raw.jpg", label: "03", heading: "Raw\nMaterial", body: "Sourced locally. Worked by hand." },
  { id: "g4", type: "image" as const, src: "/images/gallery/cups.jpg", label: "04", heading: "The\nCollection", body: "Pieces available from the studio and online shop." },
];

const ALL_TABS = [
  { key: "story", label: "Our Story", panels: STORY_PANELS },
  { key: "procedure", label: "Procedure", panels: PROCEDURE_PANELS },
  { key: "gallery", label: "Gallery", panels: GALLERY_PANELS },
] as const;

type TabKey = "story" | "procedure" | "gallery";

export default function HeroStorySection() {
  const [activeTab, setActiveTab] = useState<TabKey>("story");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);

  const activePanels = ALL_TABS.find(t => t.key === activeTab)!.panels;

  const handleTabChange = useCallback((tab: TabKey) => {
    setActiveTab(tab);
    setTimeout(() => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        window.scrollTo({ top: wrapper.offsetTop, behavior: "instant" });
      }
    }, 50);
  }, []);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const gallery = galleryRef.current;
    if (!wrapper || !gallery) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        pin: stickyRef.current,
        pinSpacing: true,
        start: "top top",
        end: `+=${PIN_PX}`,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: SNAP_POINTS,
          duration: { min: 0.25, max: 0.75 },
          ease: "power1.inOut",
          delay: 0.08,
        },
        // 👇 Dynamically hides/shows arrows based on scroll progress 👇
        onUpdate: (self) => {
          const p = self.progress;
          if (leftArrowRef.current) {
            leftArrowRef.current.style.opacity = p > 0.05 ? "1" : "0";
            leftArrowRef.current.style.pointerEvents = p > 0.05 ? "auto" : "none";
          }
          if (rightArrowRef.current) {
            rightArrowRef.current.style.opacity = p < 0.95 ? "1" : "0";
            rightArrowRef.current.style.pointerEvents = p < 0.95 ? "auto" : "none";
          }
        }
      },
    });

    tl.to(gallery, {
      x: () => -(gallery.scrollWidth - window.innerWidth),
      ease: "none",
    });

    ScrollTrigger.addEventListener("refreshInit", () => {
      gsap.set(gallery, { x: 0 });
    });
  }, { scope: wrapperRef, dependencies: [] });

  const handleScrollArrow = (direction: "left" | "right") => {
    const scrollAmount = direction === "right" ? (PIN_PX / 3) : -(PIN_PX / 3);
    window.scrollBy({ top: scrollAmount, behavior: "smooth" });
  };

  const tabButton = (tab: typeof ALL_TABS[number], small = false) => (
    <button
      key={tab.key}
      onClick={() => handleTabChange(tab.key)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-satoshi, system-ui)",
        fontSize: small ? "10px" : "11px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: activeTab === tab.key ? TERRACOTTA : `rgba(253,249,243,${small ? "0.38" : "0.45"})`,
        paddingBottom: "5px",
        borderBottom: `1.5px solid ${activeTab === tab.key ? TERRACOTTA : "transparent"}`,
        transition: "color 0.25s, border-color 0.25s",
      }}
    >
      {tab.label}
    </button>
  );

  return (
    <section ref={wrapperRef} aria-label="Hero and story" style={{ backgroundColor: CHARCOAL }}>
      <div
        ref={stickyRef}
        style={{ height: "100vh", width: "100%", overflow: "hidden", position: "relative" }}
      >
        {/* ── STICKY TABS ── */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "2.5rem",
            zIndex: 35,
            whiteSpace: "nowrap",
          }}
        >
          {ALL_TABS.map(tab => tabButton(tab))}
        </div>

        {/* ── Gallery strip ── */}
        <div
          ref={galleryRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: `${activePanels.length * 100}vw`,
            height: "100%",
            backgroundColor: CHARCOAL,
            zIndex: 20,
          }}
        >
          {activePanels.map((panel, idx) => (
            <div
              key={panel.id}
              style={{ position: "relative", flexShrink: 0, overflow: "hidden", width: "100vw", height: "100%", backgroundColor: CHARCOAL }}
            >
              <Image
                src={panel.src}
                alt={panel.heading.replace("\n", " ")}
                fill className="object-cover"
                style={{ opacity: 0.62 }}
                sizes="100vw"
                priority={idx === 0}
                placeholder="empty"
                onError={() => { }}
              />
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `linear-gradient(to right, ${CHARCOAL}F0 0%, ${CHARCOAL}80 36%, transparent 68%)` }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "2.5rem", zIndex: 10 }}>
                <div>
                  <p style={{ fontFamily: "var(--font-satoshi, system-ui)", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(253,249,243,0.32)", marginBottom: "0.75rem" }}>
                    {panel.label}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontWeight: 700, color: LINEN, lineHeight: 0.95, letterSpacing: "-0.02em", fontSize: "clamp(3rem,8vw,7rem)", marginBottom: "1rem" }}>
                    {panel.heading.split("\n").map((line, i) => (
                      <span key={i} style={{ display: "block" }}>{line}</span>
                    ))}
                  </h2>
                  <p style={{ fontFamily: "var(--font-satoshi, system-ui)", color: "rgba(253,249,243,0.5)", fontSize: "0.9rem", maxWidth: "24rem", lineHeight: 1.7 }}>
                    {panel.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Sleek Naked Arrows ── */}
        <div className="absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between px-2 pointer-events-none md:hidden">
          
          {/* Left Arrow (Starts Hidden) */}
          <button
            ref={leftArrowRef}
            onClick={() => handleScrollArrow("left")}
            style={{ opacity: 0, pointerEvents: "none", transition: "opacity 0.3s ease" }}
            className="p-4 flex items-center justify-center text-white/70 active:scale-90 active:text-white pointer-events-auto"
            aria-label="Previous image"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          {/* Right Arrow (Starts Visible) */}
          <button
            ref={rightArrowRef}
            onClick={() => handleScrollArrow("right")}
            style={{ opacity: 1, pointerEvents: "auto", transition: "opacity 0.3s ease" }}
            className="p-4 flex items-center justify-center text-white/70 active:scale-90 active:text-white pointer-events-auto"
            aria-label="Next image"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>

        </div>
      </div>
    </section>
  );
}