"use client";

import Link from "next/link";

const YEAR = new Date().getFullYear();

// Replaced redundant Studio links with Legal
const LEGAL_LINKS = [
  { label: "Privacy Policy",     href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const VISIT_LINKS = [
  { label: "Bookings",       href: "/#bookings" },
  { label: "The Shop",       href: "/#shop" },
  { label: "Get Directions", href: "https://maps.google.com/?q=315+UN+Crescent,+Gigiri,+Nairobi" }
];

const FAQ_LINKS = [
  { label: "What to wear?",      href: "/faqs#wear" },
  { label: "Group bookings",     href: "/faqs#groups" },
  { label: "Firing timelines",   href: "/faqs#firing" },
  { label: "Shipping policy",    href: "/faqs#shipping" },
  { label: "Cancellations",      href: "/faqs#cancel" },
];

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-satoshi, system-ui)",
  fontSize: "10px",
  letterSpacing: "0.32em",
  textTransform: "uppercase" as const,
  color: "rgba(253,249,243,0.3)",
  marginBottom: "0.75rem",
  display: "block",
};

const LINK_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-satoshi, system-ui)",
  fontSize: "13px",
  letterSpacing: "0.04em",
  color: "rgba(253,249,243,0.5)",
  textDecoration: "none",
  display: "block",
  padding: "8px 0", 
  transition: "color 0.2s",
};

function NavLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={LINK_STYLE}
        onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.5)")}
      >
        {label}
      </a>
    );
  }
  return (
    <Link
      href={href}
      style={LINK_STYLE}
      onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")}
      onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.5)")}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2D2926", borderTop: "0.5px solid rgba(253,249,243,0.08)" }}>
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "5rem 2.5rem 3rem",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-16">
          
          {/* Col 1: Brand & contact */}
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <span style={{ fontFamily: "var(--font-heading, Georgia, serif)", fontWeight: 900, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", letterSpacing: "-0.01em", textTransform: "uppercase", color: "#FDF9F3", display: "block", lineHeight: 0.9 }}>
                Norm
              </span>
              <span style={{ fontFamily: "var(--font-heading, Georgia, serif)", fontWeight: 900, fontSize: "clamp(0.55rem, 0.9vw, 0.7rem)", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(253,249,243,0.4)", display: "block", marginTop: "0.2em" }}>
                Studio
              </span>
            </div>

            {/* Clickable Address */}
            <a
              href="https://maps.google.com/?q=315+UN+Crescent,+Gigiri,+Nairobi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...LINK_STYLE, lineHeight: 1.8, marginBottom: "1rem", paddingTop: "8px" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.5)")}
            >
              315 UN Crescent<br />
              Gigiri, Nairobi<br />
              Kenya
            </a>

            {/* Phone */}
            <a href="tel:+254740571253" style={LINK_STYLE} onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.4)")}>
              +254 740 571 253
            </a>

            {/* Email */}
            <a href="mailto:hello@normstudio.co.ke" style={{...LINK_STYLE, marginBottom: "1.5rem"}} onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.4)")}>
              hello@normstudio.co.ke
            </a>

            {/* 🚀 Updated App-Specific Social Links 🚀 */}
            <div style={{ display: "flex", gap: "1.25rem" }}>
              <a 
                href="https://www.instagram.com/_u/normstudioke/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ fontFamily: "var(--font-satoshi, system-ui)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(253,249,243,0.35)", textDecoration: "none", transition: "color 0.2s", padding: "8px 0" }} 
                onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")} 
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.35)")}
              >
                Instagram
              </a>
              <a 
                href="https://www.tiktok.com/@normstudio.ke" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ fontFamily: "var(--font-satoshi, system-ui)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(253,249,243,0.35)", textDecoration: "none", transition: "color 0.2s", padding: "8px 0" }} 
                onMouseEnter={e => (e.currentTarget.style.color = "#FF4D00")} 
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,249,243,0.35)")}
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Col 2: Legal (Replaced Studio) */}
          <div>
            <span style={LABEL}>Legal</span>
            {LEGAL_LINKS.map(l => <NavLink key={l.href + l.label} href={l.href} label={l.label} />)}
          </div>

          {/* Col 3: Visit */}
          <div>
            <span style={LABEL}>Visit</span>
            {VISIT_LINKS.map(l => <NavLink key={l.href + l.label} href={l.href} label={l.label} />)}
          </div>

          {/* Col 4: FAQs */}
          <div>
            <span style={LABEL}>FAQs</span>
            {FAQ_LINKS.map(l => <NavLink key={l.href + l.label} href={l.href} label={l.label} />)}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "0.5px solid rgba(253,249,243,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontFamily: "var(--font-satoshi, system-ui)", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(253,249,243,0.2)", textTransform: "uppercase" }}>© {YEAR} Norm Studio · Gigiri, Nairobi</p>
          <p style={{ fontFamily: "var(--font-satoshi, system-ui)", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(253,249,243,0.15)", textTransform: "uppercase" }}>Built by Anyira</p>
        </div>
      </div>
    </footer>
  );
}