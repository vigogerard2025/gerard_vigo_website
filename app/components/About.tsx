"use client";

import { useInView } from "../hooks/useInView";

const INFO = [
  { label: "Ubicación", val: "Trujillo, Perú" },
  { label: "Idiomas", val: "Español · Inglés" },
  { label: "Modalidad", val: "100% remoto" },
  { label: "Responde en", val: "< 24 horas" },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="sobre-mí" className="section-alt py-24">
      <div className="max-w-5xl mx-auto px-6 pl-16 md:pl-6">
        <div
          ref={ref}
          className={`fade-up ${inView ? "visible" : ""} grid md:grid-cols-2 gap-14 items-center`}
        >
          {/* Avatar */}
          <div className="relative flex justify-center">
            <div
              className="w-56 h-56 flex items-center justify-center"
              style={{ background: "#1a1a1a" }}
            >
              <div className="text-center">
                <div
                  className="font-black text-7xl mb-1"
                  style={{ color: "#ffc500" }}
                >
                  GV
                </div>
                <p className="text-white/40 text-xs tracking-widest uppercase">
                  Gerard Vigo
                </p>
              </div>
            </div>
            {/* Decorative border */}
            <div
              className="absolute -bottom-3 -right-3 w-56 h-56 border-2 border-[#ffc500]"
              style={{ zIndex: -1 }}
            />
          </div>

          {/* Text */}
          <div>
            <p className="section-label">Sobre mí</p>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
              Hola, soy Gerard<span style={{ color: "#ffc500" }}>.</span>
            </h2>
            <div className="space-y-4 text-[#555] text-sm leading-relaxed">
              <p>
                Soy desarrollador web freelance especializado en crear sitios y
                aplicaciones con <span className="text-[#1a1a1a] font-semibold">Next.js</span> y{" "}
                <span className="text-[#1a1a1a] font-semibold">Tailwind CSS</span>.
                Me apasiona convertir ideas en productos digitales que realmente funcionan.
              </p>
              <p>
                Trabajo con empresas en Trujillo y todo Perú, ayudándolas a tener presencia
                online profesional, captar más clientes y automatizar procesos.
              </p>
              <p>
                Cuando no estoy programando, estoy aprendiendo nuevas tecnologías,
                diseñando interfaces o tomando café.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {INFO.map(({ label, val }) => (
                <div
                  key={label}
                  className="border border-[#e0e0e0] bg-white p-3"
                >
                  <p className="text-xs text-[#aaa] mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-[#1a1a1a]">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}