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
    <section id="contacto" className="section-white py-24">
      <div className="max-w-5xl mx-auto px-6 pl-16 md:pl-6">
        <div
          ref={ref}
          className={`fade-up ${inView ? "visible" : ""} max-w-2xl mx-auto text-center`}
        >
          <p className="section-label">Hablemos</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
            ¿Tienes un proyecto<br />en mente?
          </h2>
          <p className="text-[#666] text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Cuéntame sobre tu negocio y lo que necesitas. Respondo en menos de
            24 horas y la primera consulta es totalmente gratuita.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:gerard@gerardvigo.com" className="btn-yellow px-8 py-3.5">
              Enviar email →
            </a>
            <a href="https://wa.me/51999999999" className="btn-outline-dark px-8 py-3.5">
              WhatsApp
            </a>
          </div>

          <div className="mt-10 flex justify-center gap-8">
            {SOCIAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-[#aaa] hover:text-[#1a1a1a] transition-colors font-medium tracking-wider uppercase"
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