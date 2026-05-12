"use client";

import { useEffect, useState, useRef } from "react";

const NAV_LINKS = [
  { label: "Inicio",     href: "#inicio" },
  { label: "Servicios",  href: "#servicios" },
  { label: "Proyectos",  href: "#proyectos" },
  { label: "Sobre Mí",   href: "#sobre-mí" },
  { label: "Contacto",   href: "#contacto" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState("#inicio");
  const [mounted,     setMounted]     = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* mount animation */
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  /* scroll → glass effect + active section */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close drawer on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{CSS}</style>

      {/* ── Navbar ─────────────────────────────────── */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${mounted ? "navbar--in" : ""}`}>
        <div className="navbar-inner">

          {/* Logo */}
          <a href="#inicio" className="logo" onClick={closeMenu}>
            <div className="logo-mark">
              <span>GV</span>
              <div className="logo-ring" />
            </div>
            <div className="logo-text">
              <span className="logo-name">Gerard Vigo</span>
              <span className="logo-role">Frontend Developer</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-links">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${activeLink === link.href ? "nav-link--active" : ""}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
                <span className="nav-link-bar" />
              </a>
            ))}
          </div>

          {/* CTA button desktop */}
          <a href="#contacto" className="nav-cta hidden md:flex">
            <span className="nav-cta-fill" />
            <span className="nav-cta-text">Trabajemos juntos</span>
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer backdrop ──────────────────── */}
      <div
        className={`drawer-backdrop ${menuOpen ? "drawer-backdrop--in" : ""}`}
        onClick={closeMenu}
        aria-hidden
      />

      {/* ── Mobile drawer ───────────────────────────── */}
      <div
        ref={drawerRef}
        className={`drawer ${menuOpen ? "drawer--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className="drawer-header">
          <div className="logo-mark logo-mark--sm">
            <span>GV</span>
            <div className="logo-ring" />
          </div>
          <button className="drawer-close" onClick={closeMenu} aria-label="Cerrar menú">✕</button>
        </div>

        {/* Drawer links */}
        <nav className="drawer-nav">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`drawer-link ${activeLink === link.href ? "drawer-link--active" : ""}`}
              style={{ transitionDelay: menuOpen ? `${i * 65}ms` : "0ms" }}
              onClick={closeMenu}
            >
              <span className="drawer-link-num">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
              <span className="drawer-link-arrow">→</span>
            </a>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="drawer-footer">
          <a href="#contacto" className="drawer-cta" onClick={closeMenu}>
            Trabajemos juntos ↗
          </a>
          <p className="drawer-footer-note">© 2024 Gerard Vigo</p>
        </div>
      </div>
    </>
  );
}

/* ─── CSS ───────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ink:    #141210;
    --muted:  #7a776f;
    --accent: #c8a96e;
    --yellow: #ffc500;
    --bg:     #f2f0eb;
    --ease:   cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Navbar ─────────────────────────────── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    font-family: 'DM Sans', sans-serif;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.6s var(--ease), transform 0.6s var(--ease),
                background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    border-bottom: 1px solid transparent;
    background: rgba(242, 240, 235, 0.5);
    backdrop-filter: blur(0px);
  }
  .navbar--in {
    opacity: 1;
    transform: translateY(0);
  }
  .navbar--scrolled {
    background: rgba(242, 240, 235, 0.92);
    backdrop-filter: blur(14px);
    box-shadow: 0 1px 32px rgba(20,18,16,0.07);
    border-color: rgba(200,169,110,0.18);
  }

  .navbar-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  /* ── Logo ───────────────────────────────── */
  .logo {
    display: flex;
    align-items: center;
    gap: 11px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .logo-mark {
    position: relative;
    width: 38px; height: 38px;
    border-radius: 50%;
    background: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .logo-mark span {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #fff;
    z-index: 1;
  }
  .logo-ring {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid var(--accent);
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.3s, transform 0.4s var(--ease);
  }
  .logo:hover .logo-ring { opacity: 1; transform: scale(1); }

  .logo-mark--sm { width: 32px; height: 32px; }
  .logo-mark--sm span { font-size: 0.55rem; }

  .logo-text { display: flex; flex-direction: column; }
  .logo-name {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink);
    line-height: 1;
  }
  .logo-role {
    font-size: 0.55rem;
    letter-spacing: 0.1em;
    color: var(--accent);
    text-transform: uppercase;
    line-height: 1;
    margin-top: 3px;
  }

  /* ── Nav links ──────────────────────────── */
  .nav-links {
    display: none;
    align-items: center;
    gap: 2rem;
  }
  @media (min-width: 768px) { .nav-links { display: flex; } }
  .hidden { display: none; }
  @media (min-width: 768px) { .hidden.md\\:flex { display: flex; } }

  .nav-link {
    position: relative;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    padding-bottom: 3px;
    transition: color 0.25s ease;
  }
  .nav-link:hover, .nav-link--active { color: var(--ink); }

  .nav-link-bar {
    position: absolute;
    bottom: -1px; left: 0;
    height: 1.5px;
    width: 0;
    background: var(--accent);
    transition: width 0.3s var(--ease);
    border-radius: 2px;
  }
  .nav-link:hover .nav-link-bar,
  .nav-link--active .nav-link-bar { width: 100%; }

  /* ── CTA ────────────────────────────────── */
  .nav-cta {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0;
    padding: 9px 20px;
    border: 1.5px solid var(--ink);
    border-radius: 3px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    flex-shrink: 0;
    transition: color 0.35s ease;
  }
  .nav-cta-fill {
    position: absolute;
    inset: 0;
    background: var(--ink);
    transform: translateY(101%);
    transition: transform 0.4s var(--ease);
  }
  .nav-cta-text { position: relative; z-index: 1; }
  .nav-cta:hover .nav-cta-fill { transform: translateY(0); }
  .nav-cta:hover { color: #fff; }

  /* ── Hamburger ──────────────────────────── */
  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 6px;
    background: none;
    border: none;
    cursor: pointer;
  }
  @media (min-width: 768px) { .hamburger { display: none; } }

  .hamburger span {
    display: block;
    height: 1.5px;
    background: var(--ink);
    border-radius: 2px;
    transform-origin: center;
    transition: width 0.3s var(--ease), transform 0.35s var(--ease), opacity 0.25s ease;
  }
  .hamburger span:nth-child(1) { width: 22px; }
  .hamburger span:nth-child(2) { width: 16px; }
  .hamburger span:nth-child(3) { width: 22px; }

  .hamburger--open span:nth-child(1) { width: 20px; transform: translateY(6.5px) rotate(45deg); }
  .hamburger--open span:nth-child(2) { width: 20px; opacity: 0; transform: scaleX(0); }
  .hamburger--open span:nth-child(3) { width: 20px; transform: translateY(-6.5px) rotate(-45deg); }

  /* ── Drawer backdrop ────────────────────── */
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 110;
    background: rgba(20,18,16,0.5);
    backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }
  .drawer-backdrop--in { opacity: 1; pointer-events: all; }

  /* ── Drawer ─────────────────────────────── */
  .drawer {
    position: fixed;
    top: 0; right: 0;
    z-index: 120;
    width: min(340px, 85vw);
    height: 100dvh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.5s var(--ease);
    box-shadow: -12px 0 48px rgba(20,18,16,0.14);
    overflow-y: auto;
  }
  .drawer--open { transform: translateX(0); }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 1.6rem;
    border-bottom: 1px solid rgba(200,169,110,0.2);
  }

  .drawer-close {
    width: 34px; height: 34px;
    border-radius: 50%;
    border: 1px solid rgba(20,18,16,0.12);
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: var(--muted);
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.3s var(--ease);
  }
  .drawer-close:hover {
    background: var(--ink);
    color: #fff;
    transform: rotate(90deg);
  }

  .drawer-nav {
    flex: 1;
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
  }

  .drawer-link {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 1rem 1.8rem;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--muted);
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: color 0.25s, border-color 0.25s, padding-left 0.3s var(--ease),
                opacity 0.4s var(--ease), transform 0.4s var(--ease);
    opacity: 0;
    transform: translateX(16px);
  }
  .drawer--open .drawer-link {
    opacity: 1;
    transform: translateX(0);
  }
  .drawer-link:hover, .drawer-link--active {
    color: var(--ink);
    border-color: var(--accent);
    padding-left: 2rem;
  }
  .drawer-link-num {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--accent);
    flex-shrink: 0;
  }
  .drawer-link-arrow {
    margin-left: auto;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.2s, transform 0.3s var(--ease);
  }
  .drawer-link:hover .drawer-link-arrow,
  .drawer-link--active .drawer-link-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .drawer-footer {
    padding: 1.5rem 1.8rem;
    border-top: 1px solid rgba(200,169,110,0.2);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .drawer-cta {
    display: inline-block;
    background: var(--ink);
    color: #fff;
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 13px 20px;
    border-radius: 4px;
    text-align: center;
    transition: background 0.25s;
  }
  .drawer-cta:hover { background: var(--accent); }
  .drawer-footer-note {
    font-size: 0.6rem;
    color: var(--muted);
    text-align: center;
    letter-spacing: 0.08em;
    margin: 0;
  }
`;