"use client";

import { useInView } from "../hooks/useInView";

const SOCIAL = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Twitter/X", href: "#" },
];

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contacto" className="max-w-6xl mx-auto px-6 py-28">
      <div
        ref={ref}
        id="contact-content"
        className={`fade-up ${inView ? "visible" : ""}`}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-[#5DCAA5] font-semibold tracking-[0.2em] uppercase mb-4">
            Hablemos
          </p>
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
            {SOCIAL.map(({ label, href }) => (
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
  );
}
