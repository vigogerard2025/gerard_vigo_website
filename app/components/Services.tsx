"use client";

import { useInView } from "../hooks/useInView";
import { SERVICES } from "../animaciones/lib/data";

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
            Lo que ofrezco
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
            Servicios diseñados <br />
            <span className="text-gray-400">para resultados reales.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                
                <div className="text-2xl mb-4 text-yellow-400">
                  {s.icon}
                </div>

                <h3 className="font-bold text-[#1a1a1a] text-base mb-2">
                  {s.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}