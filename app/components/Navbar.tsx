"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Mí", href: "#sobre-mí" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-[#e0e0e0]"
          : "bg-white/80"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between pl-16 md:pl-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: "#1a1a1a" }}
          >
            GV
          </div>
          <span
            className="font-extrabold text-xs tracking-[0.18em] uppercase text-[#1a1a1a] hidden sm:block"
          >
            Gerard Vigo
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger placeholder */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menú"
        >
          <span className="block w-5 h-0.5 bg-[#1a1a1a]" />
          <span className="block w-5 h-0.5 bg-[#1a1a1a]" />
          <span className="block w-5 h-0.5 bg-[#1a1a1a]" />
        </button>
      </div>
    </nav>
  );
}