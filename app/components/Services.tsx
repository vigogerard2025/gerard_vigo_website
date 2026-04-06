"use client";

import { useInView } from "../hooks/useInView";
import { SERVICES } from "../animaciones/lib/data";

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="servicios" className="max-w-6xl mx-auto px-6 py-28">
      <div
        ref={ref}
        id="servicios-inner"
        className={`fade-up ${inView ? "visible" : ""}`}
      >
        <p className="text-xs text-[#7F77DD] font-semibold tracking-[0.2em] uppercase mb-4">
          Lo que ofrezco
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16 leading-tight">
          Servicios diseñados
          <br />
          <span className="text-white/30">para resultados reales.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`fade-up delay-${i + 1} ${
              inView ? "visible" : ""
            } bg-[#0B0B0F] p-8 hover:bg-[#13131A] transition-colors group`}
          >
            <div className="text-2xl mb-5 text-[#7F77DD] group-hover:scale-110 transition-transform inline-block">
              {s.icon}
            </div>
            <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
