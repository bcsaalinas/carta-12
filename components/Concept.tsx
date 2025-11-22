import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CURRENT_CONCEPT } from "../constants";
import { ArrowRight, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Concept: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Animation (Horizontal Scroll)
      mm.add("(min-width: 768px)", () => {
        const sections = gsap.utils.toArray(".story-panel");

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + (triggerRef.current?.offsetWidth || 0),
          },
        });

        // Desktop Parallax
        sections.forEach((section: any) => {
          const img = section.querySelector(".parallax-img");
          if (img) {
            gsap.to(img, {
              xPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                containerAnimation: gsap.getById("storyTween"),
                start: "left right",
                end: "right left",
                scrub: true,
              },
            });
          }
        });
      });

      // Mobile Animation (Simple Fade In)
      mm.add("(max-width: 767px)", () => {
        const sections = gsap.utils.toArray(".story-panel");
        sections.forEach((section: any) => {
          gsap.from(section.querySelector(".mobile-content"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="bg-stone-950 overflow-hidden w-full"
    >
      {/* Container: Vertical on Mobile, Horizontal on Desktop */}
      <div
        ref={triggerRef}
        className="flex flex-col md:flex-row w-full md:w-[300vw] h-auto md:h-[100vh] relative"
      >
        {/* PANEL 1: THE HOOK */}
        <div className="story-panel w-full md:w-screen min-h-[100dvh] md:h-screen relative flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-900/50 bg-stone-950 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=2665&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale mix-blend-overlay"></div>

          <div className="mobile-content w-full px-6 md:px-12 relative z-10 py-24 md:py-0 flex flex-col justify-center h-full">
            <span className="text-[#ff4d00] font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] block mb-6 md:mb-6 animate-pulse">
              Capítulo 01: El Problema
            </span>

            {/* Typography adjusted for mobile fit */}
            <h2 className="text-[8.5vw] md:text-7xl lg:text-9xl font-display font-black text-white leading-[1.1] md:leading-[0.85] uppercase mix-blend-difference">
              La <br className="block md:hidden" />
              Permanencia
              <br className="hidden md:block" />
              <span className="block md:inline">
                {" "}
                es{" "}
                <span className="text-stone-600 italic font-serif lowercase">
                  muerte.
                </span>
              </span>
            </h2>

            <p className="mt-8 md:mt-12 text-sm md:text-xl lg:text-2xl text-stone-400 font-light max-w-md md:max-w-2xl leading-relaxed border-l-2 border-[#ff4d00] pl-4 md:pl-8">
              Guadalajara está llena de lugares que se repiten a sí mismos.
              Mismo menú. Mismas caras. Mismo aburrimiento.
              <br />
              <br />
              Nosotros rechazamos la idea de un restaurante estático.
            </p>

            <div className="mt-12 md:mt-12 flex items-center gap-4 text-stone-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">
              <span className="hidden md:flex items-center gap-2">
                <ArrowRight className="animate-bounce" size={16} /> DESLIZA
              </span>
              <span className="md:hidden flex items-center gap-2">
                <ArrowDown className="animate-bounce" size={16} /> SCROLL
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 2: THE SOLUTION */}
        <div className="story-panel w-full md:w-screen min-h-[100dvh] md:h-screen relative flex items-center bg-[#0c0a09] overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
            <div className="h-full w-full bg-stone-950 relative overflow-hidden hidden md:block">
              <div className="parallax-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vh] font-display font-black text-stone-900 whitespace-nowrap opacity-50">
                CHAOS
              </div>
            </div>
            {/* Mobile Background / Desktop Side Panel */}
            <div className="h-full w-full bg-stone-900 relative overflow-hidden absolute md:relative inset-0 md:inset-auto z-0 md:z-auto">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop"
                className="parallax-img absolute inset-0 h-full w-full md:w-[120%] object-cover opacity-20 md:opacity-40 grayscale"
                alt="Chaos concept"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent md:hidden"></div>
            </div>
          </div>

          <div className="mobile-content absolute md:inset-0 relative inset-auto z-10 w-full h-full flex flex-col justify-center px-6 md:px-32 py-24 md:py-0 pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 md:mb-8 bg-black w-fit px-2 inline-block">
                Capítulo 02: La Metodología
              </span>
              <h2 className="text-[9vw] md:text-6xl lg:text-8xl font-display font-bold text-white mb-6 md:mb-8 max-w-4xl leading-[1.1] md:leading-none">
                QUEMAMOS <br className="md:hidden" /> EL MENÚ{" "}
                <span className="text-[#ff4d00] block md:inline">
                  CADA 30 DÍAS.
                </span>
              </h2>
              <div className="bg-black/80 backdrop-blur-sm p-6 md:p-8 border border-stone-800 w-full md:max-w-xl">
                <p className="text-stone-300 text-sm md:text-lg leading-relaxed md:leading-loose font-light">
                  Carta 12 es un lienzo en blanco mensual. Cambiamos el chef.
                  Cambiamos la vajilla. Cambiamos la música. Cambiamos la
                  historia.
                  <br />
                  <br />
                  Si te gusta algo, disfrútalo hoy. Mañana no existirá.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: THE CURRENT REALITY */}
        <div className="story-panel w-full md:w-screen min-h-[100dvh] md:h-screen relative flex items-center justify-center bg-[#ff4d00] text-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="mobile-content w-full px-6 lg:px-0 max-w-[100vw] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10 py-24 md:py-0">
            <div className="lg:col-span-7 flex flex-col justify-center z-30 order-2 lg:order-1 lg:pl-20">
              <div className="border-b-4 border-black pb-4 lg:pb-8 mb-6 lg:mb-8">
                {/* Adjusted size for mobile fit */}
                <h2 className="text-[15vw] lg:text-[10rem] font-display font-black leading-[0.9] lg:leading-[0.8] tracking-tighter uppercase break-words relative">
                  AHORA.
                </h2>
              </div>
              <div className="bg-[#ff4d00]/90 backdrop-blur-sm md:backdrop-blur-none inline-block">
                <h3 className="text-xl md:text-4xl font-serif italic font-bold mb-4 lg:mb-6">
                  Vol. 12: {CURRENT_CONCEPT.title.split(":")[0]}
                </h3>
                <p className="text-sm md:text-xl font-medium leading-relaxed max-w-lg">
                  {CURRENT_CONCEPT.description}
                  <br />
                  <br />
                  La experiencia más volátil de Latinoamérica. No vendemos
                  cenas, vendemos acceso.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-[30vh] md:h-[40vh] lg:h-[60vh] w-full z-10 order-1 lg:order-2 lg:pr-20">
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 hidden md:block"></div>
              <div className="w-full h-full bg-black overflow-hidden relative group border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.2)] md:shadow-none">
                <img
                  src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2670&auto=format&fit=crop"
                  className="object-cover w-full h-full opacity-90 group-hover:scale-110 transition-transform duration-1000 ease-out filter grayscale hover:grayscale-0"
                  alt="Restaurant interior"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 bg-black/20 lg:bg-black/40">
                  <button
                    onClick={() =>
                      document
                        .getElementById("menu")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-white text-black px-6 py-3 md:px-8 md:py-4 font-mono font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors transform scale-100 lg:scale-90 lg:group-hover:scale-100 duration-300 shadow-lg"
                  >
                    Ver Menú
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Concept;
