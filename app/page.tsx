import Navbar from "./components/Navbar";
import SocialSidebar from "./components/SocialSidebar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-[#1a1a1a] overflow-x-hidden">
      <Navbar />
      <SocialSidebar />
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}