import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerard Vigo | Freelance Web Developer",
  description:
    "Desarrollador web freelance en Trujillo, Perú. Especializado en Next.js y Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}