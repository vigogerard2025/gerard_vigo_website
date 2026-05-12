"use client";

import { useEffect, useRef, useState } from "react";

/* ─── useInView ──────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref  = useRef<HTMLDivElement>(null);
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

/* ─── Data (replace with your import) ───────────────────── */
const SERVICES = [
  {
    icon: "✦",
    title: "Diseño Web",
    desc:  "Interfaces modernas y atractivas que convierten visitantes en clientes, con foco en UX/UI.",
    tag:   "UI / UX",
  },
  {
    icon: "⬡",
    title: "Desarrollo Frontend",
    desc:  "Código limpio en React y Next.js, optimizado para rendimiento, SEO y accesibilidad.",
    tag:   "React · Next.js",
  },
  {
    icon: "◈",
    title: "Sitios Responsivos",
    desc:  "Experiencias perfectas en cualquier dispositivo: móvil, tablet y escritorio.",
    tag:   "Mobile First",
  },
  {
    icon: "◎",
    title: "Optimización SEO",
    desc:  "Mejora tu visibilidad en Google con prácticas técnicas y contenido estructurado.",
    tag:   "SEO · Core Web Vitals",
  },
  {
    icon: "⬟",
    title: "Integraciones API",
    desc:  "Conecto tu sitio con servicios externos: pagos, CRMs, bases de datos y más.",
    tag:   "REST · GraphQL",
  },
  {
    icon: "◇",
    title: "Mantenimiento Web",
    desc:  "Soporte continuo, actualizaciones y mejoras para que tu sitio siempre esté al día.",
    tag:   "Soporte",
  },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Services() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{CSS}</style>

      <section id="servicios" className="services-section">
        {/* Decorative top border */}
        <div className="services-top-line" aria-hidden />

        <div className="services-container" ref={ref}>

          {/* ── Header ──────────────────────────────── */}
          <header className={`services-header ${inView ? "header-in" : ""}`}>
            <div className="eyebrow-row">
              <span className="eyebrow-bar" />
              <p className="eyebrow">Lo que ofrezco</p>
              <span className="eyebrow-bar" />
            </div>

            <h2 className="services-title">
              Servicios diseñados
              <span className="title-dim"> para resultados reales.</span>
            </h2>

            <p className="services-sub">
              Cada servicio está pensado para que tu negocio crezca online — desde la primera línea de código hasta el lanzamiento.
            </p>
          </header>

          {/* ── Grid ────────────────────────────────── */}
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className={`svc-card ${inView ? "card-in" : ""} ${hovered === i ? "card-hovered" : ""}`}
                style={{ animationDelay: `${i * 100 + 200}ms` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top row */}
                <div className="svc-top">
                  <div className="svc-icon-wrap">
                    <span className="svc-icon">{s.icon}</span>
                  </div>
                  <span className="svc-tag">{s.tag}</span>
                </div>

                {/* Content */}
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>

                {/* Hover arrow */}
                <span className={`svc-arrow ${hovered === i ? "arrow-in" : ""}`}>→</span>

                {/* Animated corner accent */}
                <div className={`svc-corner ${hovered === i ? "corner-in" : ""}`} aria-hidden />
                {/* Animated bottom border */}
                <div className={`svc-border ${hovered === i ? "border-in" : ""}`} aria-hidden />
              </article>
            ))}
          </div>

          {/* ── Footer note ─────────────────────────── */}
          <p className={`services-note ${inView ? "note-in" : ""}`}>
            ¿Tienes un proyecto en mente?{" "}
            <a href="#contacto" className="note-link">Hablemos →</a>
          </p>
        </div>
      </section>
    </>
  );
}

/* ─── CSS ────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg-svc:  #ffffff;
    --ink:     #141210;
    --muted:   #7a776f;
    --faint:   #f2f0eb;
    --accent:  #c8a96e;
    --yellow:  #ffc500;
    --border:  rgba(20,18,16,0.09);
    --ease:    cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ─────────────────────────────── */
  .services-section {
    position: relative;
    background: var(--bg-svc);
    padding: 7rem 0 6rem;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }
  .services-top-line {
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }

  .services-container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* ── Header ─────────────────────────────── */
  .services-header {
    text-align: center;
    margin-bottom: 4.5rem;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
  }
  .header-in { opacity: 1; transform: translateY(0); }

  .eyebrow-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 1.2rem;
  }
  .eyebrow-bar {
    display: block;
    width: 36px; height: 1px;
    background: var(--accent);
    flex-shrink: 0;
  }
  .eyebrow {
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
  }

  .services-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 900;
    color: var(--ink);
    line-height: 1.12;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
  }
  .title-dim { color: #bbb; }

  .services-sub {
    font-size: 0.88rem;
    line-height: 1.75;
    color: var(--muted);
    max-width: 460px;
    margin: 0 auto;
    font-weight: 300;
  }

  /* ── Grid ────────────────────────────────── */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  @media (max-width: 960px) { .services-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 580px) { .services-grid { grid-template-columns: 1fr; } }

  /* ── Card ────────────────────────────────── */
  .svc-card {
    position: relative;
    background: var(--faint);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.8rem 1.6rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow: hidden;
    cursor: default;

    opacity: 0;
    transform: translateY(40px);
    animation-fill-mode: both;
    animation-timing-function: var(--ease);
    animation-duration: 0.75s;
    transition: box-shadow 0.4s ease, border-color 0.35s ease, transform 0.4s var(--ease);
  }
  .card-in {
    animation-name: cardRise;
  }
  @keyframes cardRise {
    from { opacity:0; transform:translateY(40px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .svc-card.card-hovered {
    box-shadow: 0 20px 52px rgba(20,18,16,0.12);
    border-color: rgba(200,169,110,0.35);
    transform: translateY(-5px);
  }

  /* Top row */
  .svc-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  .svc-icon-wrap {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: rgba(200,169,110,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, transform 0.4s var(--ease);
  }
  .card-hovered .svc-icon-wrap {
    background: rgba(200,169,110,0.28);
    transform: scale(1.08);
  }
  .svc-icon {
    font-size: 1.3rem;
    color: var(--accent);
    line-height: 1;
  }
  .svc-tag {
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    background: rgba(20,18,16,0.06);
    border-radius: 100px;
    padding: 4px 10px;
  }

  .svc-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.08rem;
    font-weight: 700;
    color: var(--ink);
    margin: 0;
    letter-spacing: -0.01em;
  }
  .svc-desc {
    font-size: 0.84rem;
    line-height: 1.7;
    color: var(--muted);
    margin: 0;
    font-weight: 300;
    flex: 1;
  }

  /* Hover arrow */
  .svc-arrow {
    font-size: 0.9rem;
    color: var(--accent);
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.3s, transform 0.35s var(--ease);
    margin-top: auto;
    align-self: flex-end;
  }
  .arrow-in { opacity: 1; transform: translateX(0); }

  /* Corner accent */
  .svc-corner {
    position: absolute;
    top: 0; right: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 0 0 0 0;
    border-color: transparent var(--accent) transparent transparent;
    transition: border-width 0.4s var(--ease);
    border-top-right-radius: 14px;
  }
  .corner-in { border-width: 0 36px 36px 0; opacity: 0.4; }

  /* Bottom border slide */
  .svc-border {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    transition: width 0.5s var(--ease);
  }
  .border-in { width: 80%; }

  /* ── Footer note ─────────────────────────── */
  .services-note {
    text-align: center;
    margin-top: 3.5rem;
    font-size: 0.82rem;
    color: var(--muted);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 1s var(--ease) 1s, transform 1s var(--ease) 1s;
  }
  .note-in { opacity: 1; transform: translateY(0); }
  .note-link {
    color: var(--accent);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s;
  }
  .note-link:hover { border-color: var(--accent); }
`;