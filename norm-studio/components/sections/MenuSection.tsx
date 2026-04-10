"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SESSIONS = [
  {
    id: "wheel",
    number: "01",
    title: "The Wheel",
    subtitle: "Hand throwing from scratch",
    time: "2PM – 4PM",
    duration: "2 hrs",
    price: "KES 3,000",
    description: "Centre, open, pull. You work with wet clay on a spinning wheel — guided through every stage. No experience required.",
    note: "Includes all clay and tools. Aprons provided.",
    image: "/images/menu/wheel.jpg",
  },
  {
    id: "glazing",
    number: "02",
    title: "The Glazing",
    subtitle: "Painting & finishing your bisque",
    time: "10AM – 1PM",
    duration: "2 hrs",
    price: "KES 2,900 – 5,000",
    description: "Your bisque-fired piece gets colour. Choose from the studio's glaze palette and learn layering, wax resist, and dipping techniques.",
    note: "Pricing varies by piece size. Bring your own or use a studio piece.",
    image: "/images/menu/glazing.jpg",
  },
  {
    id: "journal",
    number: "03",
    title: "Journal Making",
    subtitle: "Custom hand-bound ceramic covers",
    time: "Flexible",
    duration: "4 hrs",
    price: "KES 5,000",
    description: "Slab-built ceramic covers bound to hand-stitched paper. A slow, meditative session. You leave with a journal that is entirely yours.",
    note: "Limited to 4 participants per session.",
    image: "/images/menu/journal.jpg",
  },
  {
    id: "watercolour",
    number: "04",
    title: "Watercolour",
    subtitle: "Ceramic tiles with Charlotte",
    time: "Friday evenings",
    duration: "2 hrs",
    price: "KES 3,000",
    description: "Painting with watercolour on specialised ceramic tiles — led by Charlotte. Fridays only. A quieter, more reflective session.",
    note: "Friday evenings. Book early — fills fast.",
    image: "/images/menu/watercolour.jpg",
  },
];

export default function MenuSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);

  // Accordion Logic
  const expandedId = hoveredId ?? tappedId;
  const activeSession = SESSIONS.find(s => s.id === expandedId);
  const displayImage = activeSession ? activeSession.image : SESSIONS[0].image;

  return (
    <section id="menu" style={{ backgroundColor: "#FDF9F3", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "6rem" }} aria-label="Sessions menu">
      
      {/* Hide Scrollbar for mobile swipe */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "6rem 2.5rem 3rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <p style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(26,17,11,0.5)", marginBottom: "0.75rem" }}>
          What we offer
        </p>
        <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontWeight: 700, fontSize: "clamp(3rem,7vw,6rem)", color: "#1A110B", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
          Fuel<br />the Wheel
        </h2>
      </div>

      {/* ─── MOBILE: Touchy Coffee Swipe Carousel ─── */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full pb-8" style={{ paddingLeft: "10vw", paddingRight: "10vw" }}>
        {SESSIONS.map((s, idx) => {
          const isExpanded = tappedId === s.id;
          return (
            <div key={`mob-${s.id}`} className="w-[80vw] snap-center shrink-0 relative flex flex-col items-center justify-start" style={{ padding: "0 4vw" }}>
              
              {/* Number Indicator */}
              <div className="flex flex-col items-center justify-center w-full mb-6">
                <span className="font-satoshi text-[11px] tracking-[0.2em] text-[#1A110B]/50 uppercase mb-2">
                  {s.number} / 0{SESSIONS.length}
                </span>
              </div>

              {/* Massive Image (Tappable) */}
              <div 
                className="relative w-full aspect-[4/5] mb-6 cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => setTappedId(isExpanded ? null : s.id)}
              >
                <Image src={s.image} alt={s.title} fill className="object-cover rounded-sm" sizes="80vw"/>
              </div>

              {/* Typography (Tappable) */}
              <div 
                className="text-center w-full cursor-pointer mb-2" 
                onClick={() => setTappedId(isExpanded ? null : s.id)}
              >
                <h3 className="font-cormorant font-bold text-3xl text-[#1A110B] mb-2 leading-none tracking-tight">{s.title}</h3>
                <p className="font-satoshi text-xs text-[#1A110B]/60 uppercase tracking-widest">{s.price} · {s.duration}</p>
                
                {/* Arrow hint indicator */}
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }} 
                  className="mt-3 mb-2 text-[#1A110B]/40"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>

              {/* Accordion Reveal Area */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden w-full"
                  >
                    <div className="pb-6 flex flex-col items-center text-center gap-4">
                      <p className="font-satoshi text-sm text-[#1A110B]/70 leading-relaxed px-2">
                        {s.description}
                      </p>
                      <p className="font-satoshi text-[10px] text-[#1A110B]/40 tracking-wider">
                        {s.note}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 🚀 ALWAYS VISIBLE BOOK BUTTON 🚀 */}
              <a href="#bookings"
                className="w-full max-w-[220px] py-4 mx-auto mt-auto bg-[#1A110B] text-[#FDF9F3] font-satoshi text-[11px] tracking-[0.2em] uppercase rounded-full text-center block active:scale-95 transition-transform"
              >
                Book Session
              </a>

            </div>
          );
        })}
      </div>

      {/* ─── DESKTOP: Original Vertical Grid ─── */}
      <div className="hidden md:grid max-lg:grid-cols-1" style={{ gridTemplateColumns: "1fr 420px", gap: "0", margin: "0 2.5rem" }}>
        {/* Session list */}
        <div style={{ borderTop: "0.5px solid rgba(26,17,11,0.15)" }}>
          {SESSIONS.map((s) => {
            const isExpanded = expandedId === s.id;
            return (
              <div key={`desk-${s.id}`}
                style={{ borderBottom: "0.5px solid rgba(26,17,11,0.15)" }}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div style={{ padding: "1.75rem 0", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>

                  {/* Number */}
                  <span style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(26,17,11,0.3)", flexShrink: 0, marginTop: "4px" }}>
                    {s.number}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      
                      {/* Tappable Title Area */}
                      <div 
                        className="cursor-pointer"
                        onClick={() => setTappedId(p => p === s.id ? null : s.id)}
                      >
                        <h3 style={{
                          fontFamily: "var(--font-cormorant),Georgia,serif", fontWeight: 700,
                          fontSize: "clamp(1.6rem,3.5vw,2.6rem)", lineHeight: 1.05,
                          color: isExpanded ? "#FF4D00" : "#1A110B",
                          transition: "color 0.2s", marginBottom: "3px",
                        }}>
                          {s.title}
                        </h3>
                        <p style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "12px", color: "rgba(26,17,11,0.6)" }}>{s.subtitle}</p>
                      </div>

                      <div style={{ flexShrink: 0, textAlign: "right", display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div>
                          <p style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "13px", fontWeight: 500, color: "#1A110B" }}>{s.price}</p>
                          <p style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "11px", color: "rgba(26,17,11,0.5)", marginTop: "2px" }}>{s.time}</p>
                        </div>

                        {/* Thumbnail Image */}
                        <motion.div
                          animate={{ scale: isExpanded ? 1.06 : 1, opacity: isExpanded ? 1 : 0.6 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{ width: "52px", height: "52px", borderRadius: "4px", overflow: "hidden", flexShrink: 0, position: "relative", backgroundColor: "rgba(26,17,11,0.05)" }}
                          className="hidden md:block"
                        >
                          <Image src={s.image} alt={s.title} fill className="object-cover" sizes="52px" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ paddingTop: "1rem", paddingBottom: "0.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <p style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "13px", color: "rgba(26,17,11,0.7)", lineHeight: 1.7, maxWidth: "42ch" }}>
                              {s.description}
                            </p>
                            <p style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "11px", color: "rgba(26,17,11,0.5)", maxWidth: "38ch" }}>{s.note}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 🚀 ALWAYS VISIBLE BOOK BUTTON (DESKTOP) 🚀 */}
                    <div style={{ marginTop: "1rem" }}>
                      <a href="#bookings"
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-satoshi),system-ui", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FDF9F3", background: "#1A110B", padding: "9px 16px", borderRadius: "2px", textDecoration: "none", width: "fit-content", transition: "background 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#FF4D00")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#1A110B")}>
                        Book this session →
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Large image — desktop only */}
        <div style={{ position: "sticky", top: "15vh", height: "70vh", paddingLeft: "2rem" }} className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div key={displayImage}
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", width: "100%", height: "100%", borderRadius: "4px", overflow: "hidden" }}
            >
              <Image src={displayImage} alt="Session Preview" fill className="object-cover" sizes="420px" priority />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 90%, rgba(26,17,11,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div style={{ margin: "3rem 2.5rem 0", paddingTop: "2rem", borderTop: "0.5px solid rgba(26,17,11,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p className="font-satoshi text-[11px] tracking-[0.2em] uppercase text-[#1A110B]/50">
          Norm — fuel before the session
        </p>
        <button
          onClick={() => { const a = document.createElement("a"); a.href = "/norm-ceramics-menu-2026.pdf"; a.download = "Norm_Ceramics_Menu_2026.pdf"; a.click(); }}
          style={{ fontFamily: "var(--font-satoshi),system-ui", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A110B", background: "none", border: "0.5px solid rgba(26,17,11,0.3)", padding: "10px 18px", borderRadius: "2px", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1A110B"; e.currentTarget.style.color = "#FDF9F3"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1A110B"; }}>
          Download PDF menu
        </button>
      </div>
    </section>
  );
}