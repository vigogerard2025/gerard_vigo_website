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
const SKILL_GROUPS = [
  {
    category: "Frontend",
    icon: "◈",
    skills: [
      { label: "React / Next.js", level: 95 },
      { label: "TypeScript",      level: 88 },
      { label: "CSS / Tailwind",  level: 92 },
      { label: "Animations",      level: 85 },
    ],
  },
  {
    category: "Herramientas",
    icon: "⬡",
    skills: [
      { label: "Git / GitHub",    level: 90 },
      { label: "Figma",           level: 80 },
      { label: "Node.js",         level: 75 },
      { label: "REST APIs",       level: 87 },
    ],
  },
];

/* ─── Single skill bar ───────────────────────────────────── */
function SkillBar({
  label, level, inView, index,
}: { label: string; level: number; inView: boolean; index: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const delay = index * 120 + 300;
    const duration = 1100;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        setCount(Math.round((level / steps) * step));
        if (step >= steps) { setCount(level); clearInterval(interval); }
      }, stepTime);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, level, index]);

  return (
    <div className="skill-row">
      <div className="skill-meta">
        <span className="skill-label">{label}</span>
        <span className="skill-pct">{count}%</span>
      </div>

      <div className="skill-track">
        {/* Background tick marks */}
        {[25, 50, 75].map(t => (
          <div key={t} className="skill-tick" style={{ left: `${t}%` }} />
        ))}
        {/* Animated fill */}
        <div
          className="skill-fill"
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${index * 120 + 300}ms`,
          }}
        />
        {/* Glowing tip */}
        <div
          className="skill-tip"
          style={{
            left: inView ? `${level}%` : "0%",
            transitionDelay: `${index * 120 + 300}ms`,
            opacity: inView ? 1 : 0,
          }}
        />
      </div>

      {/* Level label */}
      <span className={`skill-badge ${level >= 90 ? "badge-gold" : level >= 80 ? "badge-mid" : "badge-low"}`}>
        {level >= 90 ? "Experto" : level >= 80 ? "Avanzado" : "Intermedio"}
      </span>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <>
      <style>{CSS}</style>

      <section id="habilidades" className="skills-section">
        {/* Background texture */}
        <div className="skills-noise" aria-hidden />

        <div className="skills-container" ref={ref}>

          {/* ── Header ──────────────────────────────── */}
          <header className={`skills-header ${inView ? "header-in" : ""}`}>
            <div className="eyebrow-row">
              <span className="eyebrow-bar" />
              <p className="eyebrow">Stack técnico</p>
              <span className="eyebrow-bar" />
            </div>

            <h2 className="skills-title">
              Tecnologías con las que
              <span className="title-dim"> trabajo a diario.</span>
            </h2>
          </header>

          {/* ── Two column groups ───────────────────── */}
          <div className="skills-grid">
            {SKILL_GROUPS.map((group, gi) => (
              <div
                key={group.category}
                className={`skill-group ${inView ? "group-in" : ""}`}
                style={{ transitionDelay: `${gi * 150}ms` }}
              >
                {/* Group header */}
                <div className="group-header">
                  <span className="group-icon">{group.icon}</span>
                  <h3 className="group-title">{group.category}</h3>
                  <span className="group-count">{group.skills.length} skills</span>
                </div>

                {/* Bars */}
                <div className="group-bars">
                  {group.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.label}
                      label={skill.label}
                      level={skill.level}
                      inView={inView}
                      index={gi * 4 + si}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Tech pill cloud ─────────────────────── */}
          <div className={`pill-cloud ${inView ? "cloud-in" : ""}`}>
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion",
              "Node.js", "Git", "Figma", "REST API", "Vercel"].map((tech, i) => (
              <span
                key={tech}
                className="tech-pill"
                style={{ animationDelay: `${i * 60 + 700}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── CSS ────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg-sk:   #f2f0eb;
    --ink:     #141210;
    --muted:   #7a776f;
    --accent:  #c8a96e;
    --yellow:  #ffc500;
    --border:  rgba(20,18,16,0.10);
    --ease:    cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ─────────────────────────────── */
  .skills-section {
    position: relative;
    background: var(--bg-sk);
    padding: 7rem 0 6rem;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }
  .skills-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c0b090' fill-opacity='0.1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L13 41l-1-1.73-9-5.2v-6.35H1v8zM15 0v7.5L27.99 15H28v-2.31l-11-6.35V0h-2zm0 49v-7.5l12.99-7.5H28v2.31l-11 6.35V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .skills-container {
    max-width: 1060px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
  }

  /* ── Header ─────────────────────────────── */
  .skills-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
  }
  .header-in { opacity:1; transform:translateY(0); }

  .eyebrow-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 1.1rem;
  }
  .eyebrow-bar { display:block; width:36px; height:1px; background:var(--accent); }
  .eyebrow {
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
  }
  .skills-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 900;
    color: var(--ink);
    line-height: 1.12;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .title-dim { color: #bbb; }

  /* ── Two-col groups ──────────────────────── */
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3.5rem;
  }
  @media (max-width: 700px) { .skills-grid { grid-template-columns: 1fr; } }

  .skill-group {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem 1.8rem;
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
  }
  .group-in { opacity:1; transform:translateY(0); }

  .group-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.8rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }
  .group-icon {
    font-size: 1.2rem;
    color: var(--accent);
    width: 36px; height: 36px;
    background: rgba(200,169,110,0.12);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .group-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--ink);
    margin: 0;
    flex: 1;
  }
  .group-count {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ── Skill bars ──────────────────────────── */
  .group-bars { display: flex; flex-direction: column; gap: 1.4rem; }

  .skill-row { display: flex; flex-direction: column; gap: 7px; }

  .skill-meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .skill-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--ink);
  }
  .skill-pct {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--accent);
    font-variant-numeric: tabular-nums;
    min-width: 2.8ch;
    text-align: right;
  }

  .skill-track {
    position: relative;
    height: 4px;
    background: rgba(20,18,16,0.08);
    border-radius: 100px;
    overflow: visible;
  }
  .skill-tick {
    position: absolute;
    top: -3px;
    width: 1px;
    height: 10px;
    background: rgba(20,18,16,0.12);
    transform: translateX(-50%);
  }
  .skill-fill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    background: linear-gradient(90deg, var(--accent) 0%, #e6b84a 100%);
    border-radius: 100px;
    transition: width 1.1s var(--ease);
    width: 0;
  }
  .skill-tip {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #e6b84a;
    border: 2px solid #fff;
    box-shadow: 0 0 0 3px rgba(200,169,110,0.3);
    transition: left 1.1s var(--ease), opacity 0.5s ease;
  }

  .skill-badge {
    align-self: flex-start;
    font-size: 0.56rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 100px;
    padding: 2px 9px;
  }
  .badge-gold { background: rgba(200,169,110,0.18); color: var(--accent); }
  .badge-mid  { background: rgba(20,18,16,0.07);   color: var(--muted); }
  .badge-low  { background: rgba(20,18,16,0.05);   color: var(--muted); }

  /* ── Tech pill cloud ─────────────────────── */
  .pill-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.8s var(--ease) 0.8s;
  }
  .cloud-in { opacity: 1; }

.tech-pill {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: #000;
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 7px 16px;
  background: #fff;
  opacity: 0;
  transform: translateY(10px) scale(0.95);
  animation-fill-mode: both;
  animation-timing-function: var(--ease);
  animation-duration: 0.55s;
  animation-name: pillIn;
  transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.3s var(--ease);
}
  .cloud-in .tech-pill { }
  .tech-pill:hover {
    background: rgba(200,169,110,0.12);
    color: var(--accent);
    border-color: rgba(200,169,110,0.4);
    transform: translateY(-2px) scale(1.03);
  }
  @keyframes pillIn {
    from { opacity:0; transform:translateY(10px) scale(0.95); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
`;