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
    <section id="sobre-mí" className="bg-[#0D0D12] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          id="about-content"
          className={`fade-up ${
            inView ? "visible" : ""
          } grid md:grid-cols-2 gap-16 items-center`}
        >
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-full aspect-square max-w-sm mx-auto rounded-3xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
                border: "1px solid rgba(127,119,221,0.2)",
              }}
            >
              <div className="text-center">
                <div
                  className="font-display text-8xl font-extrabold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #7F77DD, #5DCAA5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  GV
                </div>
                <p className="text-white/20 text-sm">Gerard Vigo</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border border-[#7F77DD]/20 bg-[#7F77DD]/5" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl border border-[#5DCAA5]/20 bg-[#5DCAA5]/5" />
          </div>

          {/* Texto */}
          <div>
            <p className="text-xs text-[#7F77DD] font-semibold tracking-[0.2em] uppercase mb-4">
              Sobre mí
            </p>
            <h2 className="font-display text-4xl font-extrabold mb-6 leading-tight">
              Hola, soy Gerard<span className="text-[#7F77DD]">.</span>
            </h2>
            <div className="space-y-4 text-white/50 leading-relaxed text-sm">
              <p>
                Soy desarrollador web freelance especializado en crear sitios y
                aplicaciones con <span className="text-white">Next.js</span> y{" "}
                <span className="text-white">Tailwind CSS</span>. Me apasiona
                convertir ideas en productos digitales que realmente funcionan.
              </p>
              <p>
                Trabajo principalmente con empresas en Trujillo y todo Perú,
                ayudándolas a tener presencia online profesional, captar más
                clientes y automatizar procesos.
              </p>
              <p>
                Cuando no estoy programando, estoy aprendiendo sobre nuevas
                tecnologías, diseñando interfaces o tomando café.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {INFO.map(({ label, val }) => (
                <div
                  key={label}
                  className="border border-white/[0.07] rounded-xl p-4 bg-[#0B0B0F]"
                >
                  <p className="text-xs text-white/30 mb-1">{label}</p>
                  <p className="text-sm font-medium text-white">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
