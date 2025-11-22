import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // scroll progress bar
    gsap.to("#progress-bar", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0
      }
    });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-stone-800">
       <div id="progress-bar" className="h-full bg-[#ff4d00] w-0"></div>
    </div>

    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${scrolled ? 'bg-stone-950/90 backdrop-blur-md py-4 border-b border-stone-800' : 'bg-transparent'}`}>
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="cursor-pointer group relative z-50 flex flex-col items-start"
      >
        <div className="text-white font-display text-2xl tracking-tighter font-bold mix-blend-difference select-none">
          CARTA<span className="text-[#ff4d00] group-hover:text-white transition-colors">12</span>
        </div>
        <span className="text-[9px] font-mono opacity-60 tracking-[0.3em] text-stone-400 mt-3 block group-hover:text-[#ff4d00] transition-colors">
          EST. 2025 // GDL.MX
        </span>
      </div>
      
      <div className="hidden md:flex gap-12 items-center">
        <button onClick={() => scrollToSection('concept')} className="text-stone-400 hover:text-white text-[11px] uppercase tracking-[0.2em] transition-colors relative group">
          <span className="relative z-10">Manifiesto</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button onClick={() => scrollToSection('menu')} className="text-stone-400 hover:text-white text-[11px] uppercase tracking-[0.2em] transition-colors relative group">
          <span className="relative z-10">Activos</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => scrollToSection('menu')} 
          className="bg-white text-black px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-[#ff4d00] hover:text-white transition-all hover:scale-105 flex items-center gap-2 border border-transparent hover:border-white/20"
        >
          <span className="w-1.5 h-1.5 bg-[#ff4d00] rounded-full animate-pulse group-hover:bg-white"></span>
          Invertir (Reservar)
        </button>
      </div>
      
      <div className="md:hidden text-white cursor-pointer group" onClick={() => scrollToSection('menu')}>
        <span className="text-[10px] font-mono uppercase border border-[#ff4d00] text-[#ff4d00] px-2 py-1">Reservar</span>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
