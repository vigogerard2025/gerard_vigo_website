"use client";

import { useInView } from "../hooks/useInView";
import { SKILLS } from "../animaciones/lib/data";

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section className="section-white py-24">
      <div className="max-w-5xl mx-auto px-6 pl-16 md:pl-6">
        <div
          ref={ref}
          className={`fade-up ${inView ? "visible" : ""}`}
        >
          <p className="section-label">Stack técnico</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight mb-16">
            Tecnologías con las que<br />
            <span className="text-[#aaa]">trabajo a diario.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {SKILLS.map((skill, i) => (
              <div key={skill.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-[#1a1a1a]">
                    {skill.label}
                  </span>
                  <span className="text-xs text-[#888] font-medium">{skill.level}%</span>
                </div>
                <div className="h-1 bg-[#e8e8e8] overflow-hidden">
                  <div
                    className="skill-bar h-full"
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
      </div>
    </section>
  );
}