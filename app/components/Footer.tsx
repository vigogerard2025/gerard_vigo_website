export default function Footer() {
  return (
    <footer className="border-t border-[#e0e0e0] bg-[#1a1a1a] py-8">
      <div className="max-w-5xl mx-auto px-6 pl-16 md:pl-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-black text-white tracking-wider">
          GV<span style={{ color: "#ffc500" }}>.</span>
        </span>
        <p className="text-xs text-white/30">
          © 2025 Gerard Vigo · Freelance Web Developer · Trujillo, Perú
        </p>
        <p className="text-xs text-white/30">Hecho con Next.js & Tailwind CSS</p>
      </div>
    </footer>
  );
}