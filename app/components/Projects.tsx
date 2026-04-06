"use client";

import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { PROJECTS, type Project } from "../animaciones/lib/data";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { ref, inView } = useInView();

  return (
    <section id="proyectos" className="bg-[#0D0D12] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          id="proyectos-title"
          className={`fade-up ${inView ? "visible" : ""} mb-16`}
        >
          <p className="text-xs text-[#5DCAA5] font-semibold tracking-[0.2em] uppercase mb-4">
            Trabajo actual
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight">
            Proyectos en los que
            <br />
            <span className="text-white/30">estoy trabajando ahora.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className={`project-card fade-up delay-${i + 1} ${
                inView ? "visible" : ""
              } border border-white/[0.07] rounded-2xl p-7 bg-[#0F0F15] cursor-pointer glow-purple`}
              onClick={() =>
                setActiveProject(activeProject?.name === p.name ? null : p)
              }
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-display font-extrabold"
                  style={{
                    background: p.color + "22",
                    color: p.color,
                    border: `1px solid ${p.color}44`,
                  }}
                >
                  {p.name[0]}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/30">{p.year}</span>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background:
                        p.status === "En curso" ? "#1D9E7522" : "#7F77DD22",
                      color: p.status === "En curso" ? "#5DCAA5" : "#9F9AE8",
                      border: `1px solid ${
                        p.status === "En curso" ? "#1D9E7544" : "#7F77DD44"
                      }`,
                    }}
                  >
                    {p.status === "En curso" ? "● " : "✓ "}
                    {p.status}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-extrabold mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-white/40 mb-4">{p.type}</p>

              {/* Expandible */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: activeProject?.name === p.name ? "200px" : "0px",
                }}
              >
                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  {p.desc}
                </p>
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mt-2">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-white/40 border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/20 text-sm mt-8">
          Haz clic en un proyecto para ver más detalles
        </p>
      </div>
    </section>
  );
}
