"use client";

/*
  CHUNKY HEADER
  ─────────────
  Simplified header with logo only.
*/

export default function ChunkyHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 pointer-events-none">
      <div className="flex justify-between items-start">
        {/* LOGO ONLY — The Anchor */}
        <div className="pointer-events-auto mix-blend-difference">
          <span className="font-cormorant font-bold text-white text-2xl tracking-tighter uppercase">
            Norm.
          </span>
        </div>
      </div>
    </header>
  );
}
