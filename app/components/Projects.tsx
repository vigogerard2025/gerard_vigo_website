"use client";

import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { PROJECTS, type Project } from "../animaciones/lib/data";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const { ref, inView } = useInView();

  return (
    <section id="proyectos" className="section-alt py-24">
      <div className="max-w-5xl mx-auto px-6 pl-16 md:pl-6">
        <div
          ref={ref}
          className={`fade-up ${inView ? "visible" : ""} mb-14`}
        >
          <p className="section-label">Trabajo actual</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
            Proyectos en los que<br />
            <span className="text-[#aaa]">estoy trabajando ahora.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              onClick={() => setActive(active?.name === p.name ? null : p)}
              className={`card-light fade-up delay-${i + 1} ${
                inView ? "visible" : ""
              } p-6 cursor-pointer`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center text-sm font-extrabold"
                  style={{
                    background: p.color + "18",
                    color: p.color,
                    border: `1px solid ${p.color}44`,
                  }}
                >
                  {p.name[0]}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#aaa]">{p.year}</span>
                  <span
                    className="text-xs px-2.5 py-0.5 font-medium"
                    style={{
                      background:
                        p.status === "En curso" ? "#e6f9f2" : "#f0eeff",
                      color: p.status === "En curso" ? "#1a8a5a" : "#6c5ce7",
                      border: `1px solid ${
                        p.status === "En curso" ? "#b2f0d9" : "#d4c5ff"
                      }`,
                    }}
                  >
                    {p.status === "En curso" ? "● " : "✓ "}
                    {p.status}
                  </span>
                </div>
              </div>

              <h3 className="font-extrabold text-xl text-[#1a1a1a] mb-1">{p.name}</h3>
              <p className="text-xs text-[#888] mb-4 uppercase tracking-wider">{p.type}</p>

              {/* Expandible description */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: active?.name === p.name ? "120px" : "0px" }}
              >
                <p className="text-sm text-[#555] leading-relaxed mb-4">{p.desc}</p>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 bg-[#f0f0f0] text-[#555] border border-[#e0e0e0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#aaa] text-xs mt-8 tracking-wider uppercase">
          Haz clic en un proyecto para ver más detalles
        </p>
      </div>
    </section>
  );
}