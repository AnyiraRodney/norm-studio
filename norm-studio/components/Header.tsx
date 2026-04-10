"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Menu",      href: "/#menu" },
  { label: "Bookings",  href: "/#bookings" },
  { label: "Shop",      href: "/#shop" },
  { label: "FAQs",      href: "/faqs" },
];

export default function Header() {
  const [open, setOpen]           = useState(false);
  const [bookHovered, setBookHov] = useState(false);

  // Clicking a nav link or the logo closes the menu and resets Book Now hover state
  const handleNavClick = () => {
    setOpen(false);
    setBookHov(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#FDF9F3]/[0.08]"
      style={{
        backgroundColor: "rgba(26,17,11,0.65)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-10 py-[1.1rem] max-w-[1600px] mx-auto">

        {/* LEFT — Brand Mark (Now a native link to the homepage/story) */}
        <Link
          href="/"
          onClick={handleNavClick}
          aria-label="Go to home"
          className="flex flex-col gap-[0.08em] p-0 bg-transparent border-0 cursor-pointer no-underline"
        >
          <span
            className="block uppercase leading-[0.95] text-[#FDF9F3]"
            style={{
              fontFamily: "var(--font-heading, Georgia, serif)",
              fontWeight: 900,
              fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Norm
          </span>
          <span
            className="block leading-none"
            style={{
              fontFamily: "var(--font-heading, Georgia, serif)",
              fontWeight: 900,
              fontSize: "clamp(0.45rem, 0.75vw, 0.58rem)",
              letterSpacing: "0.52em",
              textTransform: "uppercase",
              color: "rgba(253,249,243,0.55)",
            }}
          >
            Studio
          </span>
        </Link>

        {/* RIGHT — Book Now + hamburger */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Book Now pill */}
          <a
            href="/#bookings"
            onClick={handleNavClick}
            onMouseEnter={() => setBookHov(true)}
            onMouseLeave={() => setBookHov(false)}
            className="rounded-full whitespace-nowrap leading-none transition-colors duration-200 no-underline"
            style={{
              fontFamily: "var(--font-satoshi, system-ui)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: bookHovered ? "#FF4D00" : "#FDF9F3",
              color:      bookHovered ? "#FDF9F3" : "#1A110B",
              fontSize: "clamp(9px, 2.4vw, 11px)",
              padding: "clamp(6px,1.5vw,8px) clamp(12px,3.5vw,20px)",
              display: "inline-block",
            }}
          >
            Book Now
          </a>

          {/* Hamburger */}
          <div className="relative">
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex flex-col gap-[5px] p-1 bg-transparent border-0 cursor-pointer"
            >
              {([0, 1, 2] as const).map(i => (
                <span
                  key={i}
                  className="block"
                  style={{
                    width: "22px",
                    height: "1.5px",
                    background: "#FDF9F3",
                    transformOrigin: "center",
                    transition: "transform 0.3s, opacity 0.3s",
                    transform:
                      open && i === 0 ? "translateY(6.5px) rotate(45deg)"  :
                      open && i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none",
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>

            {open && (
              <nav
                className="absolute right-0 rounded z-[100]"
                style={{
                  top: "calc(100% + 14px)",
                  background: "rgba(26,17,11,0.97)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "0.5px solid rgba(253,249,243,0.1)",
                  padding: "8px 0",
                  minWidth: "180px",
                }}
              >
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="block no-underline transition-colors duration-200"
                    style={{
                      padding: "11px 24px",
                      fontFamily: "var(--font-satoshi, system-ui)",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(253,249,243,0.6)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.6)")}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}