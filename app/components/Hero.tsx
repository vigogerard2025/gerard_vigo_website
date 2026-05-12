"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Typewriter ─────────────────────────────────────────── */
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      42
    );
    return () => clearTimeout(t);
  }, [started, displayed, text]);

  return (
    <span className="typewriter-wrap">
      {displayed}
      <span
        className="typewriter-cursor"
        style={{ opacity: displayed.length < text.length ? 1 : 0 }}
      />
    </span>
  );
}

/* ─── Cursor glow ────────────────────────────────────────── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden />;
}

/* ─── Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <section id="inicio" className="hero-section">
        {/* Background layers */}
        <div className="hero-noise" aria-hidden />
        <div className="hero-diagonal" aria-hidden />
        <CursorGlow />

        {/* Floating availability badge */}
        <div className={`avail-badge ${mounted ? "avail-in" : ""}`}>
          <span className="avail-dot" />
          Disponible para proyectos
        </div>

        {/* ── Main content ───────────────────── */}
        <div className="hero-inner">

          {/* Left column — text */}
          <div className="hero-copy">

            {/* Eyebrow */}
            <p className={`hero-eyebrow ${mounted ? "reveal-1" : ""}`}>
              <span className="eyebrow-line-h" />
              Freelance · Frontend Developer
            </p>

            {/* Headline */}
            <h1 className={`hero-h1 ${mounted ? "reveal-2" : ""}`}>
              <span className="h1-line">
                <Typewriter text="Creamos tu" delay={300} />
              </span>
              <span className="h1-line h1-accent">
                <Typewriter text="página web" delay={900} />
              </span>
              <span className="h1-line">
                <Typewriter text="profesional." delay={1700} />
              </span>
            </h1>

            {/* Body */}
            <p className={`hero-body ${mounted ? "reveal-3" : ""}`}>
              Soy un desarrollador web freelancer especializado en construir el
              frontend de sitios y aplicaciones web que impulsan el crecimiento
              de tu negocio online.
            </p>

            {/* CTAs */}
            <div className={`hero-ctas ${mounted ? "reveal-4" : ""}`}>
              <a href="#proyectos" className="cta-primary">
                <span className="cta-bg" />
                <span className="cta-text">Ver proyectos</span>
                <span className="cta-arrow">→</span>
              </a>
              <a href="#contacto" className="cta-secondary">
                Hablemos
              </a>
            </div>

            {/* Stats row */}
            <div className={`hero-stats ${mounted ? "reveal-5" : ""}`}>
              {[
                { value: "3+", label: "Años de experiencia" },
                { value: "20+", label: "Proyectos entregados" },
                { value: "100%", label: "Clientes satisfechos" },
              ].map(({ value, label }) => (
                <div key={label} className="stat-item">
                  <span className="stat-value">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — decorative card stack */}
          <div className={`hero-visual ${mounted ? "visual-in" : ""}`}>
            <div className="card-stack">
              <div className="stack-card stack-card--back" />
              <div className="stack-card stack-card--mid" />
              <div className="stack-card stack-card--front">
                <div className="front-top">
                  <span className="front-tag">Frontend</span>
                  <span className="front-dot-row">
                    <span /><span /><span />
                  </span>
                </div>
                <div className="front-code">
                  <span className="code-line"><em>const</em> web = <em>await</em></span>
                  <span className="code-line indent">build<em>(</em>tuIdea<em>)</em>;</span>
                  <span className="code-line"><em>return</em> success<em>;</em></span>
                </div>
                <div className="front-bar-wrap">
                  <div className="front-bar-label">
                    <span>Performance</span><span>98</span>
                  </div>
                  <div className="front-bar">
                    <div className="front-bar-fill" />
                  </div>
                  <div className="front-bar-label">
                    <span>Accessibility</span><span>100</span>
                  </div>
                  <div className="front-bar">
                    <div className="front-bar-fill" style={{ width: "100%", animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent shapes */}
            <div className="shape shape-circle" aria-hidden />
            <div className="shape shape-square" aria-hidden />
            <div className="shape shape-ring" aria-hidden />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`scroll-hint ${mounted ? "reveal-5" : ""}`}>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg-hero: #f2f0eb;
    --ink:     #141210;
    --muted:   #7a776f;
    --accent:  #c8a96e;
    --yellow:  #ffc500;
    --surface: #ffffff;
    --ease:    cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ─────────────────────────────── */
  .hero-section {
    position: relative;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-hero);
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    padding: 5rem 2rem 3rem;
  }

  /* Noise texture overlay */
  .hero-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c0b090' fill-opacity='0.18'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L13 41l-1-1.73-9-5.2v-6.35H1v8zM15 0v7.5L27.99 15H28v-2.31l-11-6.35V0h-2zm0 49v-7.5l12.99-7.5H28v2.31l-11 6.35V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-size: 112px 196px;
    pointer-events: none;
  }

  /* Diagonal accent strip */
  .hero-diagonal {
    position: absolute;
    top: -10%; right: -5%;
    width: 55%; height: 120%;
    background: linear-gradient(135deg, rgba(200,169,110,0.07) 0%, transparent 60%);
    transform: skewX(-8deg);
    pointer-events: none;
  }

  /* Cursor glow */
  .cursor-glow {
    position: fixed;
    top: 0; left: 0;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    transition: transform 0.08s linear;
  }

  /* ── Availability badge ───────────────────── */
  .avail-badge {
    position: absolute;
    top: 2rem; right: 2rem;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(200,169,110,0.3);
    border-radius: 100px;
    padding: 7px 16px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--ink);
    opacity: 0;
    transform: translateY(-12px);
    transition: opacity 0.6s var(--ease) 0.2s, transform 0.6s var(--ease) 0.2s;
  }
  .avail-in { opacity: 1; transform: translateY(0); }
  .avail-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
    animation: ping 2s ease-in-out infinite;
  }
  @keyframes ping {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
    70%       { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
  }

  /* ── Inner layout ────────────────────────── */
  .hero-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 1180px;
    width: 100%;
    margin: 0 auto;
  }
  @media (max-width: 860px) {
    .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
    .hero-visual { order: -1; }
  }

  /* ── Stagger reveals ─────────────────────── */
  .reveal-1, .reveal-2, .reveal-3, .reveal-4, .reveal-5 {
    animation-fill-mode: both;
    animation-timing-function: var(--ease);
    animation-name: riseIn;
    animation-duration: 0.85s;
  }
  .reveal-1 { animation-delay: 0.05s; }
  .reveal-2 { animation-delay: 0.18s; }
  .reveal-3 { animation-delay: 0.38s; }
  .reveal-4 { animation-delay: 0.55s; }
  .reveal-5 { animation-delay: 0.72s; }
  @keyframes riseIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Copy ────────────────────────────────── */
  .hero-copy { display: flex; flex-direction: column; gap: 1.6rem; }

  .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
    opacity: 0;
  }
  .eyebrow-line-h {
    display: inline-block;
    width: 32px; height: 1px;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* Headline */
  .hero-h1 {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: clamp(2.4rem, 5.5vw, 4.2rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: var(--ink);
    margin: 0;
    opacity: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .h1-line { display: block; }
  .h1-accent {
    color: var(--accent);
    font-style: italic;
  }

  /* Typewriter */
  .typewriter-wrap { position: relative; }
  .typewriter-cursor {
    display: inline-block;
    width: 3px; height: 0.85em;
    background: var(--accent);
    margin-left: 3px;
    vertical-align: middle;
    border-radius: 2px;
    animation: blink 0.9s step-end infinite;
    transition: opacity 0.3s;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }

  /* Body */
  .hero-body {
    font-size: 0.93rem;
    line-height: 1.78;
    color: var(--muted);
    margin: 0;
    max-width: 420px;
    font-weight: 300;
    opacity: 0;
  }

  /* ── CTAs ────────────────────────────────── */
  .hero-ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
    opacity: 0;
  }

  .cta-primary {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    padding: 14px 28px;
    background: transparent;
    border: 2px solid var(--yellow);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    border-radius: 4px;
    transition: color 0.35s ease, transform 0.25s var(--ease), box-shadow 0.35s ease;
  }
  .cta-bg {
    position: absolute;
    inset: 0;
    background: var(--yellow);
    transform: translateX(-101%);
    transition: transform 0.4s var(--ease);
    z-index: 0;
  }
  .cta-text, .cta-arrow { position: relative; z-index: 1; }
  .cta-arrow { transition: transform 0.3s var(--ease); }
  .cta-primary:hover .cta-bg  { transform: translateX(0); }
  .cta-primary:hover .cta-arrow { transform: translateX(4px); }
  .cta-primary:hover {
    box-shadow: 0 10px 28px rgba(255,197,0,0.38);
    transform: translateY(-2px);
  }

  .cta-secondary {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 2px;
    transition: color 0.25s, border-color 0.25s;
  }
  .cta-secondary:hover {
    color: var(--ink);
    border-color: var(--accent);
  }

  /* ── Stats ───────────────────────────────── */
  .hero-stats {
    display: flex;
    gap: 2rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(20,18,16,0.1);
    opacity: 0;
  }
  .stat-item { display: flex; flex-direction: column; gap: 2px; }
  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--ink);
    line-height: 1;
  }
  .stat-label {
    font-size: 0.63rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ── Visual / Card stack ─────────────────── */
  .hero-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 440px;
    opacity: 0;
    transform: translateX(40px) scale(0.95);
    transition: opacity 0.9s var(--ease) 0.4s, transform 0.9s var(--ease) 0.4s;
  }
  .visual-in { opacity: 1; transform: translateX(0) scale(1); }

  .card-stack {
    position: relative;
    width: 300px;
    height: 320px;
  }

  .stack-card {
    position: absolute;
    inset: 0;
    border-radius: 20px;
  }
  .stack-card--back {
    background: rgba(200,169,110,0.25);
    transform: rotate(8deg) scale(0.92);
    animation: floatBack 5s ease-in-out infinite;
  }
  .stack-card--mid {
    background: rgba(200,169,110,0.45);
    transform: rotate(3deg) scale(0.97);
    animation: floatMid 5s ease-in-out infinite 0.3s;
  }
  .stack-card--front {
    background: var(--surface);
    box-shadow: 0 24px 60px rgba(20,18,16,0.18), 0 4px 12px rgba(20,18,16,0.08);
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    animation: floatFront 5s ease-in-out infinite 0.6s;
    transform: rotate(-1deg);
  }
  @keyframes floatBack  { 0%,100%{transform:rotate(8deg) scale(0.92) translateY(0)} 50%{transform:rotate(8deg) scale(0.92) translateY(-10px)} }
  @keyframes floatMid   { 0%,100%{transform:rotate(3deg) scale(0.97) translateY(0)} 50%{transform:rotate(3deg) scale(0.97) translateY(-7px)} }
  @keyframes floatFront { 0%,100%{transform:rotate(-1deg) translateY(0)} 50%{transform:rotate(-1deg) translateY(-12px)} }

  /* Front card contents */
  .front-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .front-tag {
    font-size: 0.63rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: rgba(200,169,110,0.15);
    color: var(--accent);
    border-radius: 100px;
    padding: 4px 12px;
  }
  .front-dot-row {
    display: flex; gap: 5px;
  }
  .front-dot-row span {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.4;
  }
  .front-dot-row span:last-child { opacity: 1; }

  .front-code {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: #f7f5f0;
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 0.8rem;
    font-family: 'Courier New', monospace;
  }
  .code-line { color: #5a5650; }
  .code-line em { color: var(--accent); font-style: normal; }
  .code-line.indent { padding-left: 1.2em; }

  .front-bar-wrap { display: flex; flex-direction: column; gap: 8px; }
  .front-bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.66rem;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.04em;
  }
  .front-bar {
    height: 5px;
    background: rgba(200,169,110,0.15);
    border-radius: 100px;
    overflow: hidden;
  }
  .front-bar-fill {
    height: 100%;
    width: 98%;
    background: linear-gradient(90deg, var(--accent), #e6b84a);
    border-radius: 100px;
    transform-origin: left;
    animation: barGrow 1.2s var(--ease) 0.8s both;
  }
  @keyframes barGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }

  /* Floating shapes */
  .shape {
    position: absolute;
    pointer-events: none;
    animation: shapeFloat 7s ease-in-out infinite;
  }
  .shape-circle {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: var(--yellow);
    opacity: 0.55;
    top: 10px; right: 10px;
    animation-delay: 0s;
  }
  .shape-square {
    width: 36px; height: 36px;
    background: transparent;
    border: 2px solid var(--accent);
    bottom: 60px; left: 0;
    transform: rotate(30deg);
    animation-delay: 1.5s;
    opacity: 0.6;
  }
  .shape-ring {
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 3px solid rgba(200,169,110,0.35);
    bottom: 20px; right: 20px;
    animation-delay: 3s;
  }
  @keyframes shapeFloat {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%      { transform: translateY(-16px) rotate(8deg); }
  }
  .shape-square { animation-name: shapeFloat2; }
  @keyframes shapeFloat2 {
    0%,100% { transform: rotate(30deg) translateY(0); }
    50%      { transform: rotate(42deg) translateY(-12px); }
  }

  /* ── Scroll indicator ────────────────────── */
  .scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .scroll-mouse {
    width: 22px; height: 34px;
    border: 1.5px solid var(--muted);
    border-radius: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 6px;
  }
  .scroll-wheel {
    width: 4px; height: 6px;
    background: var(--accent);
    border-radius: 100px;
    animation: wheelScroll 1.8s ease-in-out infinite;
  }
  @keyframes wheelScroll {
    0%   { transform: translateY(0); opacity: 1; }
    80%  { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 0; }
  }
`;