const METRICS = [
  { n: "4+", label: "Proyectos en curso" },
  { n: "3", label: "Proyectos entregados" },
  { n: "<1s", label: "Tiempo de carga objetivo" },
  { n: "100%", label: "Clientes satisfechos" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center grid-bg pt-20">
      {/* Orb de fondo */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(127,119,221,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        {/* Badge disponible */}
        <div className="hero-badge inline-flex items-center gap-2 border border-[#7F77DD]/30 bg-[#7F77DD]/10 rounded-full px-4 py-1.5 mb-10">
          <span className="w-2 h-2 rounded-full bg-[#5DCAA5] animate-pulse" />
          <span className="text-xs text-[#9F9AE8] font-semibold tracking-wide">
            Disponible para proyectos · Trujillo, PE
          </span>
        </div>

        {/* Titular */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-8">
          <span className="block text-white">Webs que</span>
          <span className="block text-[#7F77DD]">hacen crecer</span>
          <span className="block text-white">tu negocio.</span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-light">
          Soy <span className="text-white font-medium">Gerard Vigo</span>,
          desarrollador web freelance. Diseño y construyo experiencias digitales
          rápidas, modernas y a medida para empresas que quieren destacar
          online.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#proyectos"
            className="btn-primary px-8 py-3.5 rounded-full font-medium text-sm tracking-wide"
          >
            Ver proyectos →
          </a>
          <a
            href="#contacto"
            className="btn-outline px-8 py-3.5 rounded-full font-medium text-sm tracking-wide"
          >
            Solicitar presupuesto
          </a>
        </div>

        {/* Métricas */}
        <div className="flex flex-wrap gap-10 mt-20 pt-10 border-t border-white/[0.07]">
          {METRICS.map(({ n, label }) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold text-white mb-1">
                {n}
              </p>
              <p className="text-sm text-white/40">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
