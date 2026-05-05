export default function Hero() {
  return (
    <section
      id="inicio"
      className="hex-bg min-h-screen flex items-center justify-center"
    >
      {/* Centered content — offset slightly right to account for social sidebar */}
      <div className="text-center px-6 md:pl-14 w-full max-w-3xl mx-auto py-28">
        <h1
          className="font-black leading-tight tracking-tight text-[#1a1a1a] mb-6"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
        >
          HEY, SOY<br />
          GERARD VIGO
        </h1>

        <p className="text-[#555] text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto font-light">
          Desarrollador web freelance especializado en construir el Frontend
          de Sitios y Aplicaciones Web que impulsan el éxito y crecimiento
          de tu negocio online.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#proyectos"
            className="btn-yellow px-10 py-3.5"
          >
            Proyectos
          </a>
          <a
            href="#contacto"
            className="btn-outline-dark px-10 py-3.5"
          >
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}