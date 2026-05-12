"use client";

import { useEffect, useRef, useState } from "react";

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

const SERVICES = [
  { icon: "✦", title: "Diseño Web",          desc: "Interfaces modernas y atractivas que convierten visitantes en clientes, con foco en UX/UI.",                          tag: "UI / UX" },
  { icon: "⬡", title: "Desarrollo Frontend",  desc: "Código limpio en React y Next.js, optimizado para rendimiento, SEO y accesibilidad.",                                 tag: "React · Next.js" },
  { icon: "◈", title: "Sitios Responsivos",   desc: "Experiencias perfectas en cualquier dispositivo: móvil, tablet y escritorio.",                                        tag: "Mobile First" },
  { icon: "◎", title: "Optimización SEO",     desc: "Mejora tu visibilidad en Google con prácticas técnicas y contenido estructurado.",                                    tag: "SEO · Core Web Vitals" },
  { icon: "⬟", title: "Integraciones API",    desc: "Conecto tu sitio con servicios externos: pagos, CRMs, bases de datos y más.",                                        tag: "REST · GraphQL" },
  { icon: "◇", title: "Mantenimiento Web",    desc: "Soporte continuo, actualizaciones y mejoras para que tu sitio siempre esté al día.",                                  tag: "Soporte" },
];

export default function Services() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{CSS}</style>
      <section id="servicios" className="svc-section">
        <div className="svc-top-line" aria-hidden />
        <div className="svc-container" ref={ref}>

          <header className={`svc-header ${inView ? "svc-header--in" : ""}`}>
            <div className="svc-eyebrow-row">
              <span className="svc-eyebrow-bar" />
              <p className="svc-eyebrow">Lo que ofrezco</p>
              <span className="svc-eyebrow-bar" />
            </div>
            <h2 className="svc-title">
              Servicios diseñados
              <span className="svc-title-dim"> para resultados reales.</span>
            </h2>
            <p className="svc-sub">
              Cada servicio está pensado para que tu negocio crezca online — desde la primera línea de código hasta el lanzamiento.
            </p>
          </header>

          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className={`svc-card ${inView ? "svc-card--in" : ""} ${hovered === i ? "svc-card--hovered" : ""}`}
                style={{ animationDelay: `${i * 100 + 200}ms` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="svc-card-top">
                  <div className="svc-icon-wrap">
                    <span className="svc-icon">{s.icon}</span>
                  </div>
                  <span className="svc-tag">{s.tag}</span>
                </div>
                <h3 className="svc-card-title">{s.title}</h3>
                <p className="svc-card-desc">{s.desc}</p>
                <span className={`svc-arrow ${hovered === i ? "svc-arrow--in" : ""}`}>→</span>
                <div className={`svc-corner ${hovered === i ? "svc-corner--in" : ""}`} aria-hidden />
                <div className={`svc-border-bot ${hovered === i ? "svc-border-bot--in" : ""}`} aria-hidden />
              </article>
            ))}
          </div>

          <p className={`svc-note ${inView ? "svc-note--in" : ""}`}>
            ¿Tienes un proyecto en mente?{" "}
            <a href="#contacto" className="svc-note-link">Hablemos →</a>
          </p>
        </div>
      </section>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --svc-bg:     #ffffff;
    --svc-ink:    #141210;
    --svc-muted:  #5a5650;
    --svc-faint:  #f2f0eb;
    --svc-accent: #c8a96e;
    --svc-border: rgba(20,18,16,0.09);
    --svc-ease:   cubic-bezier(0.22, 1, 0.36, 1);
  }

  .svc-section {
    position: relative;
    background: var(--svc-bg);
    padding: 7rem 0 6rem;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }
  .svc-top-line {
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--svc-accent), transparent);
  }
  .svc-container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Header */
  .svc-header {
    text-align: center;
    margin-bottom: 4.5rem;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s var(--svc-ease), transform 0.8s var(--svc-ease);
  }
  .svc-header--in { opacity: 1; transform: translateY(0); }

  .svc-eyebrow-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 1.2rem;
  }
  .svc-eyebrow-bar { display: block; width: 36px; height: 1px; background: var(--svc-accent); flex-shrink: 0; }
  .svc-eyebrow {
    font-size: 0.64rem; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--svc-accent); margin: 0;
  }

  .svc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 900; color: var(--svc-ink);
    line-height: 1.12; margin: 0 0 1rem;
    letter-spacing: -0.02em;
  }
  /* FIX: was #bbb — now a readable dark gray */
  .svc-title-dim { color: #6b6860; }

  .svc-sub {
    font-size: 0.88rem; line-height: 1.75;
    color: var(--svc-muted);
    max-width: 460px; margin: 0 auto;
    font-weight: 400;
  }

  /* Grid */
  .svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  @media (max-width: 960px) { .svc-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 580px) { .svc-grid { grid-template-columns: 1fr; } }

  /* Card */
  .svc-card {
    position: relative;
    background: var(--svc-faint);
    border: 1px solid var(--svc-border);
    border-radius: 14px;
    padding: 1.8rem 1.6rem 2rem;
    display: flex; flex-direction: column; gap: 0.75rem;
    overflow: hidden; cursor: default;
    opacity: 0; transform: translateY(40px);
    animation-fill-mode: both;
    animation-timing-function: var(--svc-ease);
    animation-duration: 0.75s;
    transition: box-shadow 0.4s ease, border-color 0.35s ease, transform 0.4s var(--svc-ease);
  }
  .svc-card--in { animation-name: svcCardRise; }
  @keyframes svcCardRise {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .svc-card--hovered {
    box-shadow: 0 20px 52px rgba(20,18,16,0.12);
    border-color: rgba(200,169,110,0.35);
    transform: translateY(-5px);
  }

  .svc-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
  .svc-icon-wrap {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(200,169,110,0.15);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.3s, transform 0.4s var(--svc-ease);
  }
  .svc-card--hovered .svc-icon-wrap { background: rgba(200,169,110,0.28); transform: scale(1.08); }
  .svc-icon { font-size: 1.3rem; color: var(--svc-accent); line-height: 1; }

  .svc-tag {
    font-size: 0.58rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--svc-muted);
    background: rgba(20,18,16,0.06);
    border-radius: 100px; padding: 4px 10px;
  }

  .svc-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.08rem; font-weight: 700;
    color: var(--svc-ink); margin: 0;
    letter-spacing: -0.01em;
  }
  .svc-card-desc {
    font-size: 0.84rem; line-height: 1.7;
    color: var(--svc-muted);
    margin: 0; font-weight: 400; flex: 1;
  }

  .svc-arrow {
    font-size: 0.9rem; color: var(--svc-accent);
    opacity: 0; transform: translateX(-6px);
    transition: opacity 0.3s, transform 0.35s var(--svc-ease);
    margin-top: auto; align-self: flex-end;
  }
  .svc-arrow--in { opacity: 1; transform: translateX(0); }

  .svc-corner {
    position: absolute; top: 0; right: 0;
    width: 0; height: 0; border-style: solid;
    border-width: 0; border-color: transparent var(--svc-accent) transparent transparent;
    transition: border-width 0.4s var(--svc-ease);
    border-top-right-radius: 14px;
  }
  .svc-corner--in { border-width: 0 36px 36px 0; opacity: 0.4; }

  .svc-border-bot {
    position: absolute; bottom: 0; left: 50%;
    transform: translateX(-50%);
    height: 2px; width: 0;
    background: linear-gradient(90deg, transparent, var(--svc-accent), transparent);
    transition: width 0.5s var(--svc-ease);
  }
  .svc-border-bot--in { width: 80%; }

  /* Note */
  .svc-note {
    text-align: center; margin-top: 3.5rem;
    font-size: 0.82rem; color: var(--svc-muted);
    opacity: 0; transform: translateY(12px);
    transition: opacity 1s var(--svc-ease) 1s, transform 1s var(--svc-ease) 1s;
  }
  .svc-note--in { opacity: 1; transform: translateY(0); }
  .svc-note-link {
    color: var(--svc-accent); font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s;
  }
  .svc-note-link:hover { border-color: var(--svc-accent); }
`;