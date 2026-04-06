"use client";

import { useState, useEffect, useRef } from "react";

// ── Datos de contenido ────────────────────────────────────────────────────────
const SKILLS = [
  { label: "Next.js", level: 95 },
  { label: "React", level: 92 },
  { label: "Tailwind CSS", level: 90 },
  { label: "Node.js", level: 80 },
  { label: "PostgreSQL", level: 75 },
  { label: "UI/UX Design", level: 78 },
];

const SERVICES = [
  {
    icon: "✦",
    title: "Web Corporativa",
    desc: "Sitios web modernos que representan la identidad de tu marca y convierten visitantes en clientes.",
  },
  {
    icon: "◈",
    title: "E-commerce",
    desc: "Tiendas online rápidas y seguras con pasarela de pago integrada y panel de administración.",
  },
  {
    icon: "⬡",
    title: "Aplicaciones Web",
    desc: "Soluciones a medida: dashboards, CRMs, portales de cliente y herramientas internas.",
  },
  {
    icon: "◎",
    title: "Optimización SEO",
    desc: "Performance y posicionamiento: tu web carga en < 1 s y escala los primeros resultados de Google.",
  },
];

const PROJECTS = [
  {
    name: "VinasPeru",
    type: "E-commerce · Bodega",
    year: "2025",
    status: "En curso",
    color: "#7F77DD",
    desc: "Tienda online para viñedo artesanal con catálogo dinámico, suscripciones mensuales y pasarela de pago.",
    stack: ["Next.js 15", "Stripe", "Supabase"],
  },
  {
    name: "MediLab Norte",
    type: "Portal de citas · Salud",
    year: "2025",
    status: "En curso",
    color: "#1D9E75",
    desc: "Sistema de agendamiento online para laboratorio clínico con recordatorios SMS y panel de pacientes.",
    stack: ["React", "Twilio", "PostgreSQL"],
  },
  {
    name: "Constructora Alfa",
    type: "Web Corporativa",
    year: "2024",
    status: "Entregado",
    color: "#D85A30",
    desc: "Sitio institucional con portafolio de obras, formularios de cotización y optimización SEO local.",
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    name: "FlowDesk",
    type: "SaaS · Productividad",
    year: "2025",
    status: "En curso",
    color: "#378ADD",
    desc: "Herramienta de gestión de tareas para equipos pequeños con tablero Kanban y analíticas.",
    stack: ["Next.js", "Prisma", "Clerk"],
  },
];

// ── Componente principal ──────────────────────────────────────────────────────
export default function GerardVigoLanding() {
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef(/** @type {Record<string, Element | null>} */ ({}));

  // Navbar scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer para animaciones
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [e.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 },
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el instanceof Element) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const registerRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const isVisible = (id) => !!visibleSections[id];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #0B0B0F; }
        .font-display { font-family: 'Syne', sans-serif; }
        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up.delay-1 { transition-delay: 0.1s; }
        .fade-up.delay-2 { transition-delay: 0.2s; }
        .fade-up.delay-3 { transition-delay: 0.3s; }
        .fade-up.delay-4 { transition-delay: 0.4s; }
        .skill-bar {
          background: linear-gradient(90deg, #7F77DD, #5DCAA5);
          transition: width 1.2s cubic-bezier(.4,0,.2,1);
        }
        .project-card:hover { transform: translateY(-4px); }
        .project-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #7F77DD;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .hero-badge {
          animation: badgePulse 2.5s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .grid-bg {
          background-image: linear-gradient(rgba(127,119,221,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,119,221,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .glow-purple {
          box-shadow: 0 0 60px rgba(127,119,221,0.18);
        }
        .btn-primary {
          background: #7F77DD;
          color: white;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #534AB7; transform: scale(1.02); }
        .btn-outline {
          border: 1.5px solid rgba(255,255,255,0.15);
          color: white;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline:hover { border-color: #7F77DD; background: rgba(127,119,221,0.08); }
        ::selection { background: #7F77DD; color: white; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0B0B0F; }
        ::-webkit-scrollbar-thumb { background: #3C3489; border-radius: 4px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0B0F]/90 backdrop-blur-md border-b border-white/[0.06]"
            : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* FIX: font-800 → font-extrabold */}
          <span className="font-display font-extrabold text-lg tracking-tight">
            GV<span className="text-[#7F77DD]">.</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {["Servicios", "Proyectos", "Sobre mí", "Contacto"].map((item) => (
              <a
                key={item}
                /* FIX: replace(" ", "-") → replaceAll(" ", "-") para múltiples espacios */
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="nav-link text-sm text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contacto"
            className="btn-primary text-sm px-5 py-2 rounded-full font-medium"
          >
            Hablemos
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
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
            {/* FIX: font-600 → font-semibold */}
            <span className="text-xs text-[#9F9AE8] font-semibold tracking-wide">
              Disponible para proyectos · Trujillo, PE
            </span>
          </div>

          {/* Titular */}
          {/* FIX: font-800 → font-extrabold */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-8">
            <span className="block text-white">Webs que</span>
            <span className="block text-[#7F77DD]">hacen crecer</span>
            <span className="block text-white">tu negocio.</span>
          </h1>

          {/* FIX: font-300 → font-light  |  font-500 → font-medium */}
          <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-light">
            Soy <span className="text-white font-medium">Gerard Vigo</span>,
            desarrollador web freelance. Diseño y construyo experiencias
            digitales rápidas, modernas y a medida para empresas que quieren
            destacar online.
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
            {[
              { n: "4+", label: "Proyectos en curso" },
              { n: "3", label: "Proyectos entregados" },
              { n: "<1s", label: "Tiempo de carga objetivo" },
              { n: "100%", label: "Clientes satisfechos" },
            ].map(({ n, label }) => (
              <div key={label}>
                {/* FIX: font-800 → font-extrabold */}
                <p className="font-display text-3xl font-extrabold text-white mb-1">
                  {n}
                </p>
                <p className="text-sm text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section
        id="servicios"
        ref={registerRef("servicios")}
        className="max-w-6xl mx-auto px-6 py-28"
      >
        <div
          id="servicios-inner"
          ref={registerRef("servicios-inner")}
          className={`fade-up ${isVisible("servicios-inner") ? "visible" : ""}`}
        >
          {/* FIX: font-600 → font-semibold */}
          <p className="text-xs text-[#7F77DD] font-semibold tracking-[0.2em] uppercase mb-4">
            Lo que ofrezco
          </p>
          {/* FIX: font-800 → font-extrabold */}
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
                isVisible("servicios-inner") ? "visible" : ""
              } bg-[#0B0B0F] p-8 hover:bg-[#13131A] transition-colors group`}
            >
              <div className="text-2xl mb-5 text-[#7F77DD] group-hover:scale-110 transition-transform inline-block">
                {s.icon}
              </div>
              {/* FIX: font-700 → font-bold */}
              <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section
        id="proyectos"
        ref={registerRef("proyectos")}
        className="bg-[#0D0D12] py-28"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            id="proyectos-title"
            ref={registerRef("proyectos-title")}
            className={`fade-up ${isVisible("proyectos-title") ? "visible" : ""} mb-16`}
          >
            {/* FIX: font-600 → font-semibold */}
            <p className="text-xs text-[#5DCAA5] font-semibold tracking-[0.2em] uppercase mb-4">
              Trabajo actual
            </p>
            {/* FIX: font-800 → font-extrabold */}
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
                  isVisible("proyectos-title") ? "visible" : ""
                } border border-white/[0.07] rounded-2xl p-7 bg-[#0F0F15] cursor-pointer glow-purple`}
                onClick={() =>
                  setActiveProject(activeProject?.name === p.name ? null : p)
                }
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    {/* FIX: font-800 → font-extrabold */}
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

                {/* FIX: font-800 → font-extrabold */}
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

      {/* ── HABILIDADES ── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div
          id="skills-section"
          ref={registerRef("skills-section")}
          className={`fade-up ${isVisible("skills-section") ? "visible" : ""}`}
        >
          {/* FIX: font-600 → font-semibold */}
          <p className="text-xs text-[#D85A30] font-semibold tracking-[0.2em] uppercase mb-4">
            Stack técnico
          </p>
          {/* FIX: font-800 → font-extrabold */}
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16 leading-tight">
            Tecnologías con las que
            <br />
            <span className="text-white/30">trabajo a diario.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {SKILLS.map((skill, i) => (
              <div key={skill.label}>
                <div className="flex justify-between mb-2">
                  {/* FIX: font-500 → font-medium */}
                  <span className="text-sm font-medium text-white/80">
                    {skill.label}
                  </span>
                  <span className="text-sm text-white/30">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full rounded-full"
                    style={{
                      width: isVisible("skills-section")
                        ? `${skill.level}%`
                        : "0%",
                      transitionDelay: `${i * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE MÍ ── */}
      <section
        id="sobre-mí"
        ref={registerRef("about")}
        className="bg-[#0D0D12] py-28"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            id="about-content"
            ref={registerRef("about-content")}
            className={`fade-up ${
              isVisible("about-content") ? "visible" : ""
            } grid md:grid-cols-2 gap-16 items-center`}
          >
            {/* Avatar placeholder */}
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
                    {/* FIX: font-800 → font-extrabold */}
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
              {/* Decoración */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border border-[#7F77DD]/20 bg-[#7F77DD]/5" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl border border-[#5DCAA5]/20 bg-[#5DCAA5]/5" />
            </div>

            {/* Texto */}
            <div>
              {/* FIX: font-600 → font-semibold */}
              <p className="text-xs text-[#7F77DD] font-semibold tracking-[0.2em] uppercase mb-4">
                Sobre mí
              </p>
              {/* FIX: font-800 → font-extrabold */}
              <h2 className="font-display text-4xl font-extrabold mb-6 leading-tight">
                Hola, soy Gerard<span className="text-[#7F77DD]">.</span>
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed text-sm">
                <p>
                  Soy desarrollador web freelance especializado en crear sitios
                  y aplicaciones con <span className="text-white">Next.js</span>{" "}
                  y <span className="text-white">Tailwind CSS</span>. Me
                  apasiona convertir ideas en productos digitales que realmente
                  funcionan.
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
                {[
                  { label: "Ubicación", val: "Trujillo, Perú" },
                  { label: "Idiomas", val: "Español · Inglés" },
                  { label: "Modalidad", val: "100% remoto" },
                  { label: "Responde en", val: "< 24 horas" },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    className="border border-white/[0.07] rounded-xl p-4 bg-[#0B0B0F]"
                  >
                    <p className="text-xs text-white/30 mb-1">{label}</p>
                    {/* FIX: font-500 → font-medium */}
                    <p className="text-sm font-medium text-white">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section
        id="contacto"
        ref={registerRef("contact")}
        className="max-w-6xl mx-auto px-6 py-28"
      >
        <div
          id="contact-content"
          ref={registerRef("contact-content")}
          className={`fade-up ${isVisible("contact-content") ? "visible" : ""}`}
        >
          <div className="max-w-2xl mx-auto text-center">
            {/* FIX: font-600 → font-semibold */}
            <p className="text-xs text-[#5DCAA5] font-semibold tracking-[0.2em] uppercase mb-4">
              Hablemos
            </p>
            {/* FIX: font-800 → font-extrabold */}
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              ¿Tienes un proyecto
              <br />
              en mente?
            </h2>
            <p className="text-white/40 mb-10 leading-relaxed">
              Cuéntame sobre tu negocio y lo que necesitas. Respondo en menos de
              24 horas y la primera consulta es totalmente gratuita.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:gerard@gerardvigo.com"
                className="btn-primary px-8 py-4 rounded-full font-medium text-sm"
              >
                Enviar email →
              </a>
              <a
                href="https://wa.me/51999999999"
                className="btn-outline px-8 py-4 rounded-full font-medium text-sm"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-10 flex justify-center gap-6">
              {[
                { label: "LinkedIn", href: "#" },
                { label: "GitHub", href: "#" },
                { label: "Twitter/X", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-white/30 hover:text-[#7F77DD] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* FIX: font-800 → font-extrabold */}
          <span className="font-display font-extrabold text-white/60">
            GV<span className="text-[#7F77DD]">.</span>
          </span>
          <p className="text-xs text-white/20">
            © 2025 Gerard Vigo · Freelance Web Developer · Trujillo, Perú
          </p>
          <p className="text-xs text-white/20">
            Hecho con Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}