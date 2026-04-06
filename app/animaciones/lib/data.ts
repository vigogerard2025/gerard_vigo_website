export interface Skill {
  label: string;
  level: number;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
}

export interface Project {
  name: string;
  type: string;
  year: string;
  status: "En curso" | "Entregado";
  color: string;
  desc: string;
  stack: string[];
}

export const SKILLS: Skill[] = [
  { label: "Next.js", level: 95 },
  { label: "React", level: 92 },
  { label: "Tailwind CSS", level: 90 },
  { label: "Node.js", level: 80 },
  { label: "PostgreSQL", level: 75 },
  { label: "UI/UX Design", level: 78 },
];

export const SERVICES: Service[] = [
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

export const PROJECTS: Project[] = [
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
