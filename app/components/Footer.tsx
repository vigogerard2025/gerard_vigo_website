export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
  );
}
