"use client";

import { useEffect, useRef, useState } from "react";

/* ─── useInView ──────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Data ───────────────────────────────────────────────── */
const INFO = [
  { icon: "◎", label: "Ubicación",   val: "Trujillo, Perú" },
  { icon: "◈", label: "Idiomas",     val: "Español · Inglés" },
  { icon: "⬡", label: "Modalidad",   val: "100% remoto" },
  { icon: "✦", label: "Responde en", val: "< 24 horas" },
];

const HIGHLIGHTS = [
  { num: "3+",  desc: "años de exp." },
  { num: "20+", desc: "proyectos" },
  { num: "∞",   desc: "café bebido" },
];

/* ─── CountUp ────────────────────────────────────────────── */
function CountUp({ target, inView }: { target: string; inView: boolean }) {
  const isNum = /^\d+/.test(target);
  const [display, setDisplay] = useState(isNum ? "0" : target);

  useEffect(() => {
    if (!inView || !isNum) { if (inView) setDisplay(target); return; }
    const num = parseInt(target);
    const suffix = target.replace(/\d+/, "");
    let i = 0;
    const steps = 30;
    const id = setInterval(() => {
      i++;
      setDisplay(Math.round((num / steps) * i) + suffix);
      if (i >= steps) { setDisplay(target); clearInterval(id); }
    }, 35);
    return () => clearInterval(id);
  }, [inView, target, isNum]);

  return <>{display}</>;
}

/* ─── Component ──────────────────────────────────────────── */
export default function About() {
  const { ref, inView } = useInView();
  const [hoveredInfo, setHoveredInfo] = useState<number | null>(null);

  return (
    <>
      <style>{CSS}</style>

      <section id="sobre-mí" className="about-section">
        <div className="about-noise" aria-hidden />

        {/* Decorative vertical rule */}
        <div className={`about-rule ${inView ? "rule-in" : ""}`} aria-hidden />

        <div className="about-container" ref={ref}>

          {/* ── Left: Avatar block ───────────────────── */}
          <div className={`about-left ${inView ? "left-in" : ""}`}>

            {/* Avatar card */}
            <div className="avatar-card">
              {/* Stacked background cards */}
              <div className="avatar-shadow avatar-shadow--b" aria-hidden />
              <div className="avatar-shadow avatar-shadow--m" aria-hidden />

              {/* Main card */}
              <div className="avatar-main">
                {/* Monogram */}
                <div className="avatar-mono">
                  <span className="mono-gv">GV</span>
                  <span className="mono-ring" aria-hidden />
                  <span className="mono-ring mono-ring--2" aria-hidden />
                </div>

                {/* Name + role */}
                <div className="avatar-info">
                  <p className="avatar-name">Gerard Vigo</p>
                  <p className="avatar-role">Frontend Developer</p>
                </div>

                {/* Status pill */}
                <div className="avatar-status">
                  <span className="status-dot" />
                  Disponible ahora
                </div>
              </div>
            </div>

            {/* Highlights row */}
            <div className={`highlights ${inView ? "highlights-in" : ""}`}>
              {HIGHLIGHTS.map(({ num, desc }, i) => (
                <div key={desc} className="highlight-item" style={{ transitionDelay: `${i * 100 + 500}ms` }}>
                  <span className="highlight-num">
                    <CountUp target={num} inView={inView} />
                  </span>
                  <span className="highlight-desc">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Text block ────────────────────── */}
          <div className={`about-right ${inView ? "right-in" : ""}`}>

            {/* Eyebrow */}
            <div className="eyebrow-row">
              <span className="eyebrow-bar" />
              <p className="eyebrow">Sobre mí</p>
            </div>

            <h2 className="about-title">
              Hola, soy{" "}
              <span className="title-name">Gerard</span>
              <span className="title-dot">.</span>
            </h2>

            <div className="about-body">
              <p>
                Soy desarrollador web freelance especializado en crear sitios y
                aplicaciones con{" "}
                <mark className="text-mark">Next.js</mark> y{" "}
                <mark className="text-mark">Tailwind CSS</mark>.
                Me apasiona convertir ideas en productos digitales que realmente funcionan.
              </p>
              <p>
                Trabajo con clentes en Trujillo , ayudándolas a tener
                presencia online profesional, captar más clientes y automatizar procesos.
              </p>
              <p>
                Cuando no estoy programando, estoy aprendiendo nuevas tecnologías,
                diseñando interfaces .
              </p>
            </div>

            {/* Info grid */}
            <div className="info-grid">
              {INFO.map(({ icon, label, val }, i) => (
                <div
                  key={label}
                  className={`info-card ${inView ? "info-in" : ""} ${hoveredInfo === i ? "info-hovered" : ""}`}
                  style={{ transitionDelay: `${i * 80 + 400}ms` }}
                  onMouseEnter={() => setHoveredInfo(i)}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  <span className="info-icon">{icon}</span>
                  <div>
                    <p className="info-label">{label}</p>
                    <p className="info-val">{val}</p>
                  </div>
                  <div className={`info-bar ${hoveredInfo === i ? "bar-in" : ""}`} />
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="#contacto" className={`about-cta ${inView ? "cta-in" : ""}`}>
              <span className="cta-fill" />
              <span className="cta-label">Trabajemos juntos</span>
              <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── CSS ────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg-ab:  #f2f0eb;
    --ink:    #141210;
    --muted:  #7a776f;
    --accent: #c8a96e;
    --yellow: #ffc500;
    --surf:   #ffffff;
    --border: rgba(20,18,16,0.09);
    --ease:   cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ─────────────────────────────── */
  .about-section {
    position: relative;
    background: var(--bg-ab);
    padding: 7rem 0 6rem;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }
  .about-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c0b090' fill-opacity='0.10'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L13 41l-1-1.73-9-5.2v-6.35H1v8zM15 0v7.5L27.99 15H28v-2.31l-11-6.35V0h-2zm0 49v-7.5l12.99-7.5H28v2.31l-11 6.35V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Vertical decorative rule */
  .about-rule {
    position: absolute;
    left: 50%; top: 8%; bottom: 8%;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(200,169,110,0.3), transparent);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1.2s var(--ease) 0.3s;
  }
  .rule-in { transform: scaleY(1); }
  @media (max-width: 860px) { .about-rule { display: none; } }

  /* ── Container ──────────────────────────── */
  .about-container {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }
  @media (max-width: 860px) {
    .about-container { grid-template-columns: 1fr; gap: 3.5rem; }
  }

  /* ── Left column ────────────────────────── */
  .about-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    opacity: 0;
    transform: translateX(-36px);
    transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  }
  .left-in { opacity: 1; transform: translateX(0); }

  /* Avatar card stack */
  .avatar-card { position: relative; width: 260px; height: 300px; }

  .avatar-shadow {
    position: absolute;
    inset: 0;
    border-radius: 20px;
  }
  .avatar-shadow--b {
    background: rgba(200,169,110,0.2);
    transform: rotate(7deg) scale(0.93);
    animation: floatB 6s ease-in-out infinite;
  }
  .avatar-shadow--m {
    background: rgba(200,169,110,0.35);
    transform: rotate(3deg) scale(0.97);
    animation: floatM 6s ease-in-out infinite 0.4s;
  }
  @keyframes floatB { 0%,100%{transform:rotate(7deg) scale(0.93) translateY(0)} 50%{transform:rotate(7deg) scale(0.93) translateY(-10px)} }
  @keyframes floatM { 0%,100%{transform:rotate(3deg) scale(0.97) translateY(0)} 50%{transform:rotate(3deg) scale(0.97) translateY(-7px)} }

  .avatar-main {
    position: absolute; inset: 0;
    background: var(--ink);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    box-shadow: 0 28px 64px rgba(20,18,16,0.25), 0 4px 16px rgba(20,18,16,0.12);
    animation: floatF 6s ease-in-out infinite 0.8s;
    overflow: hidden;
  }
  @keyframes floatF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }

  /* subtle grid overlay on card */
  .avatar-main::before {
    content: '';
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  .avatar-mono {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mono-gv {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 900;
    color: var(--yellow);
    line-height: 1;
    position: relative;
    z-index: 1;
  }
  .mono-ring {
    position: absolute;
    width: 90px; height: 90px;
    border-radius: 50%;
    border: 1px solid rgba(200,169,110,0.25);
    animation: spinSlow 12s linear infinite;
  }
  .mono-ring--2 {
    width: 115px; height: 115px;
    border-color: rgba(200,169,110,0.12);
    animation-direction: reverse;
    animation-duration: 18s;
  }
  @keyframes spinSlow { to { transform: rotate(360deg); } }

  .avatar-info { text-align: center; position: relative; z-index: 1; }
  .avatar-name {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #fff;
    margin: 0 0 3px;
  }
  .avatar-role {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin: 0;
  }

  .avatar-status {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.55);
    position: relative; z-index: 1;
  }
  .status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
    animation: ping 2s ease-in-out infinite;
    box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
  }
  @keyframes ping {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
    70%      { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
  }

  /* Highlights */
  .highlights {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.7s var(--ease) 0.4s, transform 0.7s var(--ease) 0.4s;
  }
  .highlights-in { opacity: 1; transform: translateY(0); }

  .highlight-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 12px 18px;
    background: var(--surf);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: transform 0.3s var(--ease), box-shadow 0.3s ease;
  }
  .highlight-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(20,18,16,0.1);
  }
  .highlight-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--ink);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .highlight-desc {
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ── Right column ────────────────────────── */
  .about-right {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    opacity: 0;
    transform: translateX(36px);
    transition: opacity 0.9s var(--ease) 0.15s, transform 0.9s var(--ease) 0.15s;
  }
  .right-in { opacity: 1; transform: translateX(0); }

  .eyebrow-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .eyebrow-bar {
    display: block; width: 32px; height: 1px;
    background: var(--accent); flex-shrink: 0;
  }
  .eyebrow {
    font-size: 0.63rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
  }

  .about-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    font-weight: 900;
    color: var(--ink);
    line-height: 1.1;
    margin: 0;
    letter-spacing: -0.03em;
  }
  .title-name { font-style: italic; }
  .title-dot { color: var(--accent); }

  .about-body {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
.about-body p {
  font-size: 0.9rem;
  line-height: 1.78;
  color: var(--ink);
  margin: 0;
  font-weight: 300;
}
  .text-mark {
    background: rgba(200,169,110,0.18);
    color: var(--ink);
    font-weight: 600;
    padding: 1px 5px;
    border-radius: 3px;
    font-style: normal;
  }

  /* Info cards */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .info-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--surf);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 14px;
    overflow: hidden;
    cursor: default;
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.6s var(--ease),
      transform 0.6s var(--ease),
      box-shadow 0.3s ease,
      border-color 0.3s ease;
  }
  .info-in { opacity: 1; transform: translateY(0); }
  .info-hovered {
    box-shadow: 0 8px 28px rgba(20,18,16,0.1);
    border-color: rgba(200,169,110,0.35);
  }
  .info-icon {
    font-size: 1.1rem;
    color: var(--accent);
    flex-shrink: 0;
    width: 32px; height: 32px;
    background: rgba(200,169,110,0.12);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info-label {
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 2px;
    font-weight: 500;
  }
  .info-val {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0;
  }
  .info-bar {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 0;
    background: var(--accent);
    transition: width 0.4s var(--ease);
    border-radius: 2px;
  }
  .bar-in { width: 60%; }

  /* CTA */
  .about-cta {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    padding: 14px 28px;
    background: transparent;
    border: 1.5px solid var(--ink);
    border-radius: 4px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 0.7s var(--ease) 0.8s,
      transform 0.7s var(--ease) 0.8s,
      color 0.35s ease;
  }
  .cta-in { opacity: 1; transform: translateY(0); }
  .cta-fill {
    position: absolute; inset: 0;
    background: var(--ink);
    transform: translateX(-101%);
    transition: transform 0.4s var(--ease);
  }
  .cta-label, .cta-arrow { position: relative; z-index: 1; }
  .cta-arrow { transition: transform 0.3s var(--ease); }
  .about-cta:hover .cta-fill { transform: translateX(0); }
  .about-cta:hover { color: #fff; }
  .about-cta:hover .cta-arrow { transform: translateX(4px); }
`;