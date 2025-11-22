import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CURRENT_CONCEPT } from '../constants';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // intro animation
    gsap.set(".hero-text-line", { y: 100, opacity: 0 });
    
    tl.to(videoBgRef.current, {
      scale: 1,
      duration: 2,
      ease: "power3.out"
    })
    .to(".hero-text-line", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    }, "-=1.5")
    .fromTo("#hero-cta", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      "-=0.5"
    );

    // scroll parallax
    gsap.to(titleWrapperRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(videoBgRef.current, {
      yPercent: 20,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  const scrollToContent = () => {
    const conceptSection = document.getElementById('concept');
    if (conceptSection) {
      conceptSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative h-[100dvh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden bg-stone-950">
      
      {/* background layers */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div ref={videoBgRef} className="absolute inset-0 scale-110">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2668&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale mix-blend-luminosity"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-stone-950"></div>
        </div>
      </div>

      <div className="z-10 text-center flex flex-col items-center max-w-full px-6 relative">
        
        <div className="mb-4 md:mb-8 flex items-center gap-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-forwards">
           <div className="px-3 py-1 border border-[#ff4d00]/50 rounded-full bg-[#ff4d00]/10 backdrop-blur-md">
             <span className="text-[#ff4d00] text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-[#ff4d00] rounded-full animate-pulse"></div>
               Series A Ready
             </span>
           </div>
        </div>

        <div ref={titleWrapperRef} className="relative mix-blend-difference flex flex-col items-center">
          {/* using vw for scaling */}
          <div className="overflow-hidden w-full flex justify-center">
            <h1 className="hero-text-line text-[18vw] font-display font-black text-white tracking-tighter uppercase leading-[0.85]">
              CARTA
            </h1>
          </div>
          <div className="overflow-hidden w-full flex justify-center">
             <h1 className="hero-text-line text-[18vw] font-display font-black text-transparent stroke-text tracking-tighter uppercase leading-[0.85]">
               <span style={{ WebkitTextStroke: '2px white' }}>12</span>
             </h1>
          </div>
        </div>

        <div className="mt-8 md:mt-12 overflow-hidden flex flex-col items-center gap-4 max-w-2xl mx-auto">
            <h3 className="hero-text-line font-mono text-[#ff4d00] text-xs md:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase text-center">
                {CURRENT_CONCEPT.title}
            </h3>
            <h2 className="hero-text-line text-sm md:text-2xl font-light text-stone-300 leading-relaxed font-sans text-center px-4">
              {CURRENT_CONCEPT.description}
            </h2>
        </div>

        <div id="hero-cta" className="mt-12 md:mt-16 flex flex-col items-center gap-6">
          <button 
            onClick={scrollToContent}
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-transparent border border-white/20 hover:border-[#ff4d00] overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[#ff4d00] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white flex items-center gap-3">
              Explorar Activos <ArrowDown size={14} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
