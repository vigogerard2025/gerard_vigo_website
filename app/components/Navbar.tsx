"use client";

import { useEffect, useState, useRef } from "react";

const NAV_LINKS = [
  { label: "Inicio",    href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Mí",  href: "#sobre-mí" },
  { label: "Contacto",  href: "#contacto" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("#inicio");
  const [mounted,    setMounted]    = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...ids].reverse()) {
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{CSS}</style>

      {/* ── Navbar ── */}
      <nav className={`nb ${scrolled ? "nb--scrolled" : ""} ${mounted ? "nb--in" : ""}`}>
        <div className="nb-inner">

          {/* Logo */}
          <a href="#inicio" className="nb-logo" onClick={() => setMenuOpen(false)}>
            <div className="nb-logo-mark">
              <span>GV</span>
              <div className="nb-logo-ring" />
            </div>
            <div className="nb-logo-text">
              <span className="nb-logo-name">Gerard Vigo</span>
              <span className="nb-logo-role">Frontend Developer</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nb-links">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`nb-link ${activeLink === link.href ? "nb-link--active" : ""}`}
                style={{ animationDelay: mounted ? `${i * 70 + 100}ms` : "0ms" }}
              >
                {link.label}
                <span className="nb-link-bar" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href="#contacto" className="nb-cta nb-cta--desktop">
            <span className="nb-cta-fill" />
            <span className="nb-cta-text">Trabajemos juntos</span>
          </a>

          {/* Hamburger */}
          <button
            className={`nb-ham ${menuOpen ? "nb-ham--open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`nb-backdrop ${menuOpen ? "nb-backdrop--in" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`nb-drawer ${menuOpen ? "nb-drawer--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="nb-drawer-head">
          <div className="nb-logo-mark nb-logo-mark--sm">
            <span>GV</span>
            <div className="nb-logo-ring" />
          </div>
          <button
            className="nb-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >✕</button>
        </div>

        <nav className="nb-drawer-nav">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`nb-drawer-link ${activeLink === link.href ? "nb-drawer-link--active" : ""}`}
              style={{ transitionDelay: menuOpen ? `${i * 65}ms` : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nb-drawer-num">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
              <span className="nb-drawer-arrow">→</span>
            </a>
          ))}
        </nav>

        <div className="nb-drawer-foot">
          <a href="#contacto" className="nb-cta nb-cta--drawer" onClick={() => setMenuOpen(false)}>
            <span className="nb-cta-fill" />
            <span className="nb-cta-text">Trabajemos juntos ↗</span>
          </a>
          <p className="nb-drawer-copy">© 2025 Gerard Vigo</p>
        </div>
      </div>
    </>
  );
}

/* ── CSS ── */
const CSS = `
  :root {
    --nb-ink:    #141210;
    --nb-muted:  #7a776f;
    --nb-accent: #c8a96e;
    --nb-bg:     #f2f0eb;
    --nb-ease:   cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Bar ── */
  .nb {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    font-family: 'DM Sans', sans-serif;
    border-bottom: 1px solid transparent;
    background: transparent;
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity   0.6s var(--nb-ease),
      transform 0.6s var(--nb-ease),
      background 0.4s ease,
      box-shadow 0.4s ease,
      border-color 0.4s ease;
  }
  .nb--in {
    opacity: 1;
    transform: translateY(0);
  }
  .nb--scrolled {
    background: rgba(242, 240, 235, 0.94);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 1px 24px rgba(20,18,16,0.08);
    border-color: rgba(200,169,110,0.2);
  }

  .nb-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  /* ── Logo ── */
  .nb-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .nb-logo-mark {
    position: relative;
    width: 38px; height: 38px;
    border-radius: 50%;
    background: var(--nb-ink);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .nb-logo-mark span {
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #fff;
    position: relative; z-index: 1;
  }
  .nb-logo-ring {
    position: absolute; inset: -3px;
    border-radius: 50%;
    border: 1.5px solid var(--nb-accent);
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.3s ease, transform 0.4s var(--nb-ease);
  }
  .nb-logo:hover .nb-logo-ring { opacity: 1; transform: scale(1); }

  .nb-logo-mark--sm { width: 32px; height: 32px; }
  .nb-logo-mark--sm span { font-size: 0.52rem; }

  .nb-logo-text { display: flex; flex-direction: column; gap: 2px; }
  .nb-logo-name {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--nb-ink);
    line-height: 1;
  }
  .nb-logo-role {
    font-size: 0.52rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--nb-accent);
    line-height: 1;
  }

  /* ── Desktop links ── */
  .nb-links {
    display: none;
    align-items: center;
    gap: 2rem;
  }
  @media (min-width: 768px) { .nb-links { display: flex; } }

  .nb-link {
    position: relative;
    font-size: 0.63rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--nb-ink);
    text-decoration: none;
    padding-bottom: 3px;
    opacity: 0;
    animation: nbLinkIn 0.5s var(--nb-ease) forwards;
    transition: color 0.2s ease;
  }
  @keyframes nbLinkIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .nb-link:hover { color: var(--nb-ink); }
  .nb-link--active { color: var(--nb-ink); }

  .nb-link-bar {
    position: absolute;
    bottom: -1px; left: 0;
    height: 1.5px; width: 0;
    background: var(--nb-accent);
    border-radius: 2px;
    transition: width 0.3s var(--nb-ease);
  }
  .nb-link:hover .nb-link-bar,
  .nb-link--active .nb-link-bar { width: 100%; }

  /* ── CTA button ── */
  .nb-cta {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    padding: 9px 20px;
    border: 1.5px solid var(--nb-ink);
    border-radius: 3px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--nb-ink);
    text-decoration: none;
    flex-shrink: 0;
    transition: color 0.35s ease;
  }
  .nb-cta--desktop { display: none; }
  @media (min-width: 768px) { .nb-cta--desktop { display: inline-flex; } }
  .nb-cta--drawer { display: flex; text-align: center; justify-content: center; }

  .nb-cta-fill {
    position: absolute; inset: 0;
    background: var(--nb-ink);
    transform: translateY(101%);
    transition: transform 0.4s var(--nb-ease);
  }
  .nb-cta-text { position: relative; z-index: 1; }
  .nb-cta:hover .nb-cta-fill { transform: translateY(0); }
  .nb-cta:hover { color: #fff; }

  /* ── Hamburger ── */
  .nb-ham {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    padding: 6px;
    background: none;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
  }
  @media (min-width: 768px) { .nb-ham { display: none; } }

  .nb-ham span {
    display: block;
    height: 1.5px;
    background: var(--nb-ink);
    border-radius: 2px;
    transform-origin: center;
    transition: width 0.3s var(--nb-ease), transform 0.35s var(--nb-ease), opacity 0.25s ease;
  }
  .nb-ham span:nth-child(1) { width: 22px; }
  .nb-ham span:nth-child(2) { width: 16px; }
  .nb-ham span:nth-child(3) { width: 22px; }
  .nb-ham--open span:nth-child(1) { width: 20px; transform: translateY(6.5px) rotate(45deg); }
  .nb-ham--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nb-ham--open span:nth-child(3) { width: 20px; transform: translateY(-6.5px) rotate(-45deg); }

  /* ── Backdrop ── */
  .nb-backdrop {
    position: fixed; inset: 0;
    z-index: 210;
    background: rgba(20,18,16,0.45);
    backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }
  .nb-backdrop--in { opacity: 1; pointer-events: all; }

  /* ── Drawer ── */
  .nb-drawer {
    position: fixed;
    top: 0; right: 0;
    z-index: 220;
    width: min(340px, 88vw);
    height: 100dvh;
    background: var(--nb-bg);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.5s var(--nb-ease);
    box-shadow: -16px 0 48px rgba(20,18,16,0.12);
    overflow-y: auto;
  }
  .nb-drawer--open { transform: translateX(0); }

  .nb-drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 1.6rem;
    border-bottom: 1px solid rgba(200,169,110,0.18);
    flex-shrink: 0;
  }

  .nb-drawer-close {
    width: 34px; height: 34px;
    border-radius: 50%;
    border: 1px solid rgba(20,18,16,0.12);
    background: none;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem;
    color: var(--nb-ink);
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.35s var(--nb-ease);
  }
  .nb-drawer-close:hover {
    background: var(--nb-ink);
    color: #fff;
    transform: rotate(90deg);
  }

  .nb-drawer-nav {
    flex: 1;
    padding: 1.2rem 0;
    display: flex;
    flex-direction: column;
  }

  .nb-drawer-link {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0.95rem 1.8rem;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--nb-ink);
    text-decoration: none;
    border-left: 2px solid transparent;
    opacity: 0;
    transform: translateX(18px);
    transition:
      color 0.22s ease,
      border-color 0.22s ease,
      padding-left 0.3s var(--nb-ease),
      opacity 0.4s var(--nb-ease),
      transform 0.4s var(--nb-ease);
  }
  .nb-drawer--open .nb-drawer-link {
    opacity: 1;
    transform: translateX(0);
  }
  .nb-drawer-link:hover,
  .nb-drawer-link--active {
    border-color: var(--nb-accent);
    padding-left: 2.1rem;
    color: var(--nb-ink);
  }
  .nb-drawer-num {
    font-size: 0.54rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--nb-accent);
    flex-shrink: 0;
  }
  .nb-drawer-arrow {
    margin-left: auto;
    color: var(--nb-ink);
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.2s ease, transform 0.3s var(--nb-ease);
  }
  .nb-drawer-link:hover .nb-drawer-arrow,
  .nb-drawer-link--active .nb-drawer-arrow {
    opacity: 0.5;
    transform: translateX(0);
  }

  .nb-drawer-foot {
    padding: 1.4rem 1.6rem;
    border-top: 1px solid rgba(200,169,110,0.18);
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
  }
  .nb-drawer-copy {
    font-size: 0.58rem;
    color: var(--nb-muted);
    text-align: center;
    letter-spacing: 0.1em;
    margin: 0;
  }
`;