"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

/* ─── Types ──────────────────────────────────────────────── */
interface Project {
  id: number;
  src: string;       // cover image (grid card)
  images: string[];  // all images shown in modal gallery
  alt: string;
  title: string;
  tag: string;
  year: string;
  description: string;
  url: string;
  urlLabel: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    src: "/proyecto1.png",
    images: ["/proyecto1.png", "/proyecto2.png", "/proyecto6.png"],
    alt: "Página web de hotelería - Hostal Rivera",
    title: "Hostal Rivera",
    tag: "Web Design",
    year: "2024",
    description:
      "Diseño y desarrollo web completo para Hostal Rivera. Enfocado en transmitir calidez y confianza al visitante, con una experiencia de reserva clara, galería de habitaciones y sección de contacto optimizada para conversión.",
    url: "https://hostal-rivera-page.vercel.app/",
    urlLabel: "hostal-rivera-page.vercel.app",
  },
  {
    id: 2,
    src: "/proyecto3.png",
    images: ["/proyecto3.png", "/proyecto4.png", "/proyecto5.png"],
    alt: "Tienda online - E-commerce",
    title: "E-Commerce Store",
    tag: "Frontend",
    year: "2024",
    description:
      "Tienda online moderna con catálogo de productos, carrito de compras y flujo de pago optimizado. Diseño limpio y rápido centrado en la conversión, con una experiencia de usuario fluida en todos los dispositivos.",
    url: "https://e-commerce-ruddy-tau.vercel.app/",
    urlLabel: "e-commerce-ruddy-tau.vercel.app",
  },
];

/* ─── Hook: useInView ────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Component ──────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, inView } = useInView();

  // Reset gallery index when a new project opens
  const openProject = (project: Project) => {
    setActive(project);
    setActiveImg(0);
  };

  const closeModal = useCallback(() => setActive(null), []);

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!active) return;
    setActiveImg((i) => (i - 1 + active.images.length) % active.images.length);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!active) return;
    setActiveImg((i) => (i + 1) % active.images.length);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  // Close on Escape / arrow key navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight" && active)
        setActiveImg((i) => (i + 1) % active.images.length);
      if (e.key === "ArrowLeft" && active)
        setActiveImg((i) => (i - 1 + active.images.length) % active.images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, closeModal]);

  return (
    <>
      <style>{CSS}</style>

      <section id="proyectos" className="projects-section">
        <div className="bg-grid" aria-hidden />
        <div className="bg-blob" aria-hidden />

        <div className="projects-container" ref={ref}>

          {/* ── Header ── */}
          <header className={`projects-header ${inView ? "header-visible" : ""}`}>
            <div className="eyebrow-wrap">
              <span className="eyebrow-line" />
              <p className="eyebrow-text">Trabajo actual</p>
              <span className="eyebrow-line" />
            </div>

            <h2 className="projects-title">
              Proyectos en los que
              <span className="title-muted"> estoy trabajando ahora.</span>
            </h2>

            <p className="projects-subtitle">
              Haz clic en cualquier proyecto para ver más detalles
            </p>
          </header>

          {/* ── Grid ── */}
          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <article
                key={project.id}
                className={`project-card ${inView ? "card-visible" : ""}`}
                style={{ animationDelay: `${i * 160 + 200}ms` }}
                onClick={() => openProject(project)}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="card-number">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="card-img-wrap">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    width={700}
                    height={500}
                    className="card-img"
                    priority
                  />
                  <div className={`card-overlay ${hovered === project.id ? "overlay-visible" : ""}`}>
                    <div className="overlay-content">
                      <span className="overlay-icon">↗</span>
                      <p className="overlay-label">Ver proyecto</p>
                    </div>
                  </div>
                </div>

                <div className="card-meta">
                  <div className="card-meta-left">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-tag">{project.tag}</p>
                  </div>
                  <span className="card-year">{project.year}</span>
                </div>

                <div className={`card-border ${hovered === project.id ? "border-active" : ""}`} />
              </article>
            ))}
          </div>

          {/* ── Footer ── */}
          <div className={`footer-line ${inView ? "line-visible" : ""}`}>
            <span className="footer-dot" />
            <span className="footer-text">2 proyectos en curso</span>
            <span className="footer-dot" />
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {active && (
        <div
          className="modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal
          aria-label={active.title}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <button className="modal-close" onClick={closeModal} aria-label="Cerrar">✕</button>

            {/* Gallery */}
            <div className="modal-gallery">
              <div className="modal-img-wrap">
                {active.images.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${active.alt} – imagen ${idx + 1}`}
                    width={1200}
                    height={800}
                    className={`modal-img ${idx === activeImg ? "modal-img-active" : ""}`}
                    priority={idx === 0}
                  />
                ))}
              </div>

              {/* Arrows — only show if more than 1 image */}
              {active.images.length > 1 && (
                <>
                  <button className="gallery-arrow gallery-prev" onClick={prevImg} aria-label="Anterior">
                    ←
                  </button>
                  <button className="gallery-arrow gallery-next" onClick={nextImg} aria-label="Siguiente">
                    →
                  </button>

                  {/* Dots */}
                  <div className="gallery-dots">
                    {active.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`gallery-dot ${idx === activeImg ? "dot-active" : ""}`}
                        onClick={(e) => { e.stopPropagation(); setActiveImg(idx); }}
                        aria-label={`Imagen ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <span className="gallery-counter">
                    {activeImg + 1} / {active.images.length}
                  </span>
                </>
              )}
            </div>

            {/* Info */}
            <div className="modal-info">
              <p className="modal-tag">{active.tag} · {active.year}</p>
              <h3 className="modal-title">{active.title}</h3>
              <p className="modal-desc">{active.description}</p>

              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="modal-link-icon">↗</span>
                <span>{active.urlLabel}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #f2f0eb;
    --ink: #141210;
    --muted: #8a8680;
    --accent: #c8a96e;
    --surface: #fff;
    --border: rgba(20,18,16,0.10);
    --radius: 12px;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  }

  .projects-section {
    position: relative;
    background: var(--bg);
    padding: 7rem 0 6rem;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .bg-blob {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%);
    top: -100px; right: -150px;
    pointer-events: none;
    animation: blobFloat 8s ease-in-out infinite;
  }
  @keyframes blobFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(30px) scale(1.05); }
  }

  .projects-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Header */
  .projects-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
  }
  .header-visible { opacity: 1; transform: translateY(0); }

  .eyebrow-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 1.2rem;
  }
  .eyebrow-line { display: block; width: 40px; height: 1px; background: var(--accent); }
  .eyebrow-text {
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--accent); margin: 0;
  }
  .projects-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 900; color: var(--ink);
    line-height: 1.15; margin: 0 0 1rem;
    letter-spacing: -0.02em;
  }
  .title-muted { color: var(--muted); }
  .projects-subtitle {
    font-size: 0.82rem; color: var(--muted);
    letter-spacing: 0.06em; margin: 0;
  }

  /* Grid — 2 columns on desktop, 1 on mobile */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
  @media (max-width: 640px) {
    .projects-grid { grid-template-columns: 1fr; }
  }

  /* Card */
  .project-card {
    position: relative;
    cursor: pointer;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--surface);
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    opacity: 0;
    transform: translateY(48px) scale(0.97);
    transition:
      opacity 0.7s var(--ease-out),
      transform 0.7s var(--ease-out),
      box-shadow 0.4s ease;
  }
  .card-visible { opacity: 1; transform: translateY(0) scale(1); }
  .project-card:hover {
    box-shadow: 0 16px 48px rgba(0,0,0,0.14);
    transform: translateY(-6px) !important;
  }

  .card-number {
    position: absolute; top: 12px; left: 14px; z-index: 10;
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em;
    color: var(--surface);
    background: rgba(20,18,16,0.55);
    backdrop-filter: blur(6px);
    border-radius: 6px; padding: 3px 8px;
    pointer-events: none;
  }

  .card-img-wrap {
    position: relative; width: 100%;
    aspect-ratio: 16/10; overflow: hidden;
  }
  .card-img {
    width: 100% !important; height: 100% !important;
    object-fit: cover;
    transition: transform 0.7s var(--ease-out);
  }
  .project-card:hover .card-img { transform: scale(1.06); }

  .card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(200,169,110,0.82) 0%, rgba(20,18,16,0.75) 100%);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.4s ease;
  }
  .overlay-visible { opacity: 1; }
  .overlay-content {
    text-align: center;
    transform: translateY(8px);
    transition: transform 0.4s var(--ease-out);
  }
  .overlay-visible .overlay-content { transform: translateY(0); }
  .overlay-icon {
    display: block; font-size: 2.2rem; color: #fff;
    line-height: 1; margin-bottom: 6px;
    animation: iconPulse 1.8s ease-in-out infinite;
  }
  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.15); }
  }
  .overlay-label {
    font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(255,255,255,0.9); margin: 0;
  }

  .card-meta {
    display: flex; align-items: flex-end;
    justify-content: space-between;
    padding: 14px 16px 16px; gap: 8px;
  }
  .card-meta-left { flex: 1; min-width: 0; }
  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem; font-weight: 700; color: var(--ink);
    margin: 0 0 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .card-tag {
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); margin: 0;
  }
  .card-year { font-size: 0.68rem; font-weight: 300; color: var(--muted); white-space: nowrap; }

  .card-border {
    position: absolute; bottom: 0; left: 50%;
    height: 2px; width: 0;
    background: var(--accent);
    transform: translateX(-50%);
    transition: width 0.4s var(--ease-out);
  }
  .border-active { width: 100%; }

  /* Footer */
  .footer-line {
    display: flex; align-items: center;
    justify-content: center; gap: 14px;
    margin-top: 4rem;
    opacity: 0; transform: translateY(16px);
    transition: opacity 1s var(--ease-out) 0.6s, transform 1s var(--ease-out) 0.6s;
  }
  .line-visible { opacity: 1; transform: translateY(0); }
  .footer-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); display: inline-block; }
  .footer-text { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }

  /* ── Modal ── */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(10,9,8,0.80);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-box {
    position: relative;
    background: var(--surface);
    border-radius: 18px; overflow: hidden;
    max-width: 820px; width: 100%;
    max-height: 92vh; overflow-y: auto;
    box-shadow: 0 40px 100px rgba(0,0,0,0.40);
    animation: slideUp 0.45s var(--ease-out);
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-close {
    position: absolute; top: 14px; right: 16px; z-index: 20;
    background: rgba(20,18,16,0.55);
    backdrop-filter: blur(6px);
    border: none; border-radius: 50%;
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .modal-close:hover { background: rgba(200,169,110,0.9); transform: scale(1.1) rotate(90deg); }

  /* Gallery */
  .modal-gallery { position: relative; width: 100%; }

  .modal-img-wrap {
    position: relative; width: 100%;
    aspect-ratio: 16/10; overflow: hidden;
    background: var(--ink);
  }

  .modal-img {
    position: absolute !important;
    inset: 0;
    width: 100% !important; height: 100% !important;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s var(--ease-out);
    transform: scale(1.03);
  }
  .modal-img-active {
    opacity: 1;
    transform: scale(1);
  }

  /* Arrows */
  .gallery-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    z-index: 10;
    background: rgba(20,18,16,0.55);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    width: 42px; height: 42px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .gallery-arrow:hover { background: var(--accent); transform: translateY(-50%) scale(1.1); }
  .gallery-prev { left: 14px; }
  .gallery-next { right: 14px; }

  /* Dots */
  .gallery-dots {
    position: absolute; bottom: 14px; left: 50%;
    transform: translateX(-50%);
    display: flex; gap: 7px; z-index: 10;
  }
  .gallery-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.45);
    cursor: pointer;
    transition: background 0.25s, transform 0.25s;
    padding: 0;
  }
  .dot-active { background: var(--accent); transform: scale(1.35); }

  /* Counter */
  .gallery-counter {
    position: absolute; bottom: 14px; right: 16px;
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.7);
    background: rgba(20,18,16,0.50);
    backdrop-filter: blur(4px);
    border-radius: 6px; padding: 3px 8px;
    pointer-events: none; z-index: 10;
  }

  /* Info */
  .modal-info { padding: 1.6rem 1.8rem 1.8rem; }
  .modal-tag {
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 6px;
  }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem; font-weight: 900;
    color: var(--ink); margin: 0 0 10px;
    letter-spacing: -0.02em;
  }
  .modal-desc {
    font-size: 0.88rem; line-height: 1.75;
    color: var(--muted); margin: 0 0 1.2rem;
  }

  /* Link button */
  .modal-link {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--ink); color: var(--surface);
    text-decoration: none;
    font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.08em;
    padding: 10px 18px;
    border-radius: 8px;
    transition: background 0.25s, transform 0.2s;
  }
  .modal-link:hover { background: var(--accent); transform: translateY(-2px); }
  .modal-link-icon { font-size: 1rem; line-height: 1; }
`;