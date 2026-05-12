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
const SOCIAL = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "GitHub",   href: "#", icon: "gh" },
  { label: "Twitter",  href: "#", icon: "tw" },
];

const PERKS = [
  { icon: "◎", text: "Primera consulta gratuita" },
  { icon: "✦", text: "Respuesta en menos de 24h" },
  { icon: "⬡", text: "Sin compromiso inicial" },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Contact() {
  const { ref, inView } = useInView();
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <>
      <style>{CSS}</style>

      <section id="contacto" className="contact-section">
        {/* Background layers */}
        <div className="contact-grid"  aria-hidden />
        <div className="contact-blob"  aria-hidden />
        <div className="contact-lines" aria-hidden />

        <div className="contact-container" ref={ref}>

          {/* ── Header ──────────────────────────────── */}
          <header className={`contact-header ${inView ? "header-in" : ""}`}>
            <div className="eyebrow-row">
              <span className="eyebrow-bar" />
              <p className="eyebrow">Hablemos</p>
              <span className="eyebrow-bar" />
            </div>

            <h2 className="contact-title">
              ¿Tienes un proyecto
              <br />
              <span className="title-accent">en mente?</span>
            </h2>

            <p className="contact-sub">
              Cuéntame sobre tu negocio y lo que necesitas. La primera consulta
              es totalmente gratuita y sin compromiso.
            </p>
          </header>

          {/* ── Main grid ───────────────────────────── */}
          <div className="contact-grid-main">

            {/* Left: perks + social */}
            <div className={`contact-left ${inView ? "left-in" : ""}`}>
              <div className="perks-list">
                {PERKS.map(({ icon, text }, i) => (
                  <div
                    key={text}
                    className={`perk-item ${inView ? "perk-in" : ""}`}
                    style={{ transitionDelay: `${i * 120 + 300}ms` }}
                  >
                    <span className="perk-icon">{icon}</span>
                    <span className="perk-text">{text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className={`left-divider ${inView ? "divider-in" : ""}`} />

              {/* Social links */}
              <div className={`social-row ${inView ? "social-in" : ""}`}>
             
                
              </div>

              {/* Email display */}
              <div className={`email-display ${inView ? "email-in" : ""}`}>
                
              </div>
            </div>

            {/* Right: CTA card */}
            <div className={`contact-right ${inView ? "right-in" : ""}`}>
              <div className="cta-card">
                {/* Card top decoration */}
                <div className="card-top-bar" aria-hidden />

                <div className="cta-card-inner">
                  <p className="cta-card-title">Empieza hoy</p>
                  <p className="cta-card-sub">
                    Elige cómo prefieres contactarme y hablamos sobre tu proyecto.
                  </p>

                  {/* Primary button — email */}
                 

                  {/* Secondary button — WhatsApp */}
                  <a
                    href="https://wa.me/51973474568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-secondary ${hoveredBtn === "wa" ? "btn-sec-hovered" : ""}`}
                    onMouseEnter={() => setHoveredBtn("wa")}
                    onMouseLeave={() => setHoveredBtn(null)}
                  >
                    <span className="btn-sec-fill" />
                    <span className="btn-icon btn-icon--dark">◎</span>
                    <span className="btn-label">WhatsApp</span>
                    <span className="btn-arrow">→</span>
                  </a>

                  {/* Availability note */}
                  <div className="avail-note">
                    <span className="avail-dot" />
                    <span>Disponible para nuevos proyectos en 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer strip ────────────────────────── */}
          <div className={`contact-footer ${inView ? "footer-in" : ""}`}>
            <span className="footer-copy">© 2024 Gerard Vigo</span>
            <span className="footer-sep">·</span>
            <span className="footer-copy">Trujillo, Perú</span>
            <span className="footer-sep">·</span>
            <span className="footer-copy">Hecho con ♥ y café</span>
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
    --bg-ct:  #141210;
    --ink-ct: #f2f0eb;
    --muted:  rgba(242,240,235,0.45);
    --accent: #c8a96e;
    --yellow: #ffc500;
    --border: rgba(242,240,235,0.1);
    --ease:   cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ─────────────────────────────── */
  .contact-section {
    position: relative;
    background: var(--bg-ct);
    padding: 7rem 0 4rem;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }

  /* Grid pattern */
  .contact-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(242,240,235,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(242,240,235,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    pointer-events: none;
  }

  /* Warm glow blob */
  .contact-blob {
    position: absolute;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 65%);
    top: -200px; right: -150px;
    pointer-events: none;
    animation: blobPulse 8s ease-in-out infinite;
  }
  @keyframes blobPulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.1); opacity: 0.7; }
  }

  /* Diagonal lines accent */
  .contact-lines {
    position: absolute;
    bottom: 0; left: 0;
    width: 300px; height: 300px;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 18px,
      rgba(200,169,110,0.05) 18px,
      rgba(200,169,110,0.05) 19px
    );
    pointer-events: none;
  }

  /* ── Container ──────────────────────────── */
  .contact-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  /* ── Header ─────────────────────────────── */
  .contact-header {
    text-align: center;
    margin-bottom: 5rem;
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
    display: block; width: 36px; height: 1px;
    background: var(--accent);
  }
  .eyebrow {
    font-size: 0.63rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
  }

  .contact-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 900;
    color: var(--ink-ct);
    line-height: 1.08;
    margin: 0 0 1.2rem;
    letter-spacing: -0.03em;
  }
  .title-accent { font-style: italic; color: var(--accent); }

  .contact-sub {
    font-size: 0.9rem;
    line-height: 1.75;
    color: var(--muted);
    max-width: 420px;
    margin: 0 auto;
    font-weight: 300;
  }

  /* ── Main two-col grid ───────────────────── */
  .contact-grid-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  @media (max-width: 820px) {
    .contact-grid-main { grid-template-columns: 1fr; gap: 3rem; }
  }

  /* ── Left ────────────────────────────────── */
  .contact-left {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    opacity: 0;
    transform: translateX(-32px);
    transition: opacity 0.9s var(--ease) 0.1s, transform 0.9s var(--ease) 0.1s;
  }
  .left-in { opacity: 1; transform: translateX(0); }

  /* Perks */
  .perks-list { display: flex; flex-direction: column; gap: 1rem; }
  .perk-item {
    display: flex;
    align-items: center;
    gap: 14px;
    opacity: 0;
    transform: translateX(-16px);
    transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
  }
  .perk-in { opacity: 1; transform: translateX(0); }
  .perk-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(200,169,110,0.12);
    border: 1px solid rgba(200,169,110,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    color: var(--accent);
    flex-shrink: 0;
  }
  .perk-text {
    font-size: 0.84rem;
    color: var(--ink-ct);
    font-weight: 400;
  }

  /* Divider */
  .left-divider {
    height: 1px;
    background: linear-gradient(90deg, var(--border), rgba(200,169,110,0.3), var(--border));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s var(--ease) 0.6s;
  }
  .divider-in { transform: scaleX(1); }

  /* Social */
  .social-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    opacity: 0;
    transition: opacity 0.7s var(--ease) 0.7s;
  }
  .social-in { opacity: 1; }
  .social-label {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0;
  }
  .social-links { display: flex; gap: 1rem; flex-wrap: wrap; }
  .social-link {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(242,240,235,0.65);
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.25s;
  }
  .social-link:hover { color: var(--accent); }
  .social-arrow {
    font-size: 0.65rem;
    opacity: 0.5;
    transition: opacity 0.25s, transform 0.3s var(--ease);
  }
  .social-link:hover .social-arrow { opacity: 1; transform: translate(2px,-2px); }

  /* Email */
  .email-display {
    opacity: 0;
    transition: opacity 0.7s var(--ease) 0.9s;
  }
  .email-in { opacity: 1; }
  .email-hint {
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 5px;
  }
  .email-addr {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--ink-ct);
    text-decoration: none;
    border-bottom: 1px solid rgba(200,169,110,0.3);
    padding-bottom: 2px;
    transition: color 0.25s, border-color 0.25s;
  }
  .email-addr:hover { color: var(--accent); border-color: var(--accent); }

  /* ── Right: CTA card ─────────────────────── */
  .contact-right {
    opacity: 0;
    transform: translateX(32px);
    transition: opacity 0.9s var(--ease) 0.25s, transform 0.9s var(--ease) 0.25s;
  }
  .right-in { opacity: 1; transform: translateX(0); }

  .cta-card {
    background: rgba(242,240,235,0.05);
    border: 1px solid rgba(242,240,235,0.1);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    transition: box-shadow 0.4s ease;
  }
  .cta-card:hover {
    box-shadow: 0 0 60px rgba(200,169,110,0.12);
  }

  .card-top-bar {
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--yellow), var(--accent));
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }
  @keyframes shimmer {
    0%,100% { background-position: 0% 0%; }
    50%      { background-position: 100% 0%; }
  }

  .cta-card-inner {
    padding: 2.2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .cta-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--ink-ct);
    margin: 0;
  }
  .cta-card-sub {
    font-size: 0.82rem;
    line-height: 1.7;
    color: var(--muted);
    margin: 0;
    font-weight: 300;
  }

  /* Buttons */
  .btn-primary, .btn-secondary {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.35s ease, transform 0.3s var(--ease);
  }
  .btn-primary {
    background: var(--yellow);
    color: var(--bg-ct);
    border: none;
  }
  .btn-fill {
    position: absolute; inset: 0;
    background: #e6b000;
    transform: translateX(-101%);
    transition: transform 0.4s var(--ease);
  }
  .btn-primary:hover .btn-fill { transform: translateX(0); }
  .btn-primary:hover { transform: translateY(-2px); }

  .btn-secondary {
    background: transparent;
    color: rgba(242,240,235,0.75);
    border: 1px solid rgba(242,240,235,0.15);
  }
  .btn-sec-fill {
    position: absolute; inset: 0;
    background: rgba(242,240,235,0.08);
    transform: translateX(-101%);
    transition: transform 0.4s var(--ease);
  }
  .btn-secondary:hover .btn-sec-fill { transform: translateX(0); }
  .btn-secondary:hover { color: var(--ink-ct); transform: translateY(-2px); }

  .btn-icon {
    font-size: 0.9rem;
    flex-shrink: 0;
    position: relative; z-index: 1;
  }
  .btn-icon--dark { color: rgba(242,240,235,0.5); }
  .btn-label { flex: 1; position: relative; z-index: 1; }
  .btn-arrow {
    position: relative; z-index: 1;
    transition: transform 0.3s var(--ease);
    opacity: 0.5;
  }
  .btn-primary:hover .btn-arrow,
  .btn-secondary:hover .btn-arrow {
    opacity: 1;
    transform: translateX(4px);
  }

  /* Availability note */
  .avail-note {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }
  .avail-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
    animation: ping2 2s ease-in-out infinite;
    box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
  }
  @keyframes ping2 {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
    70%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
  }

  /* ── Footer strip ────────────────────────── */
  .contact-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    opacity: 0;
    transition: opacity 1s var(--ease) 1.2s;
  }
  .footer-in { opacity: 1; }
  .footer-copy {
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    color: var(--muted);
  }
  .footer-sep { color: var(--accent); font-size: 0.7rem; }
`;