"use client";

import { useInView } from "../hooks/useInView";
import { SKILLS } from "../animaciones/lib/data";

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section className="max-w-6xl mx-auto px-6 py-28">
      <div
        ref={ref}
        id="skills-section"
        className={`fade-up ${inView ? "visible" : ""}`}
      >
        <p className="text-xs text-[#D85A30] font-semibold tracking-[0.2em] uppercase mb-4">
          Stack técnico
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16 leading-tight">
          Tecnologías con las que
          <br />
          <span className="text-white/30">trabajo a diario.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {SKILLS.map((skill, i) => (
            <div key={skill.label}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-white/80">
                  {skill.label}
                </span>
                <span className="text-sm text-white/30">{skill.level}%</span>
              </div>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="skill-bar h-full rounded-full"
                  style={{
                    width: inView ? `${skill.level}%` : "0%",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
