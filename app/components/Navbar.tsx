"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = ["Servicios", "Proyectos", "Sobre mí", "Contacto"];

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
          ? "bg-[#0B0B0F]/90 backdrop-blur-md border-b border-white/[0.06]"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-display font-extrabold text-lg tracking-tight text-white">
          GV<span className="text-[#7F77DD]">.</span>
        </span>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="nav-link text-sm text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="btn-primary text-sm px-5 py-2 rounded-full font-medium"
        >
          Hablemos
        </a>
      </div>
    </nav>
  );
}
