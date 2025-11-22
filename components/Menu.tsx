import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CURRENT_CONCEPT } from '../constants';
import { CourseType } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Menu: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLImageElement>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // ticker scroll animation
      gsap.to(".ticker-track", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });

      // fade rows on scroll
      gsap.utils.toArray('.menu-row').forEach((row: any) => {
        gsap.from(row, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          }
        });
      });

      // cursor image on desktop
      const xTo = gsap.quickTo(revealImgRef.current, "x", {duration: 0.4, ease: "power3"});
      const yTo = gsap.quickTo(revealImgRef.current, "y", {duration: 0.4, ease: "power3"});

      const moveImage = (e: MouseEvent) => {
        if (!revealImgRef.current) return;
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', moveImage);
      return () => window.removeEventListener('mousemove', moveImage);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (img: string | undefined) => {
    if (!img || window.innerWidth < 1024) return; // skip on small screens
    setActiveImage(img);
    if (revealImgRef.current) {
        gsap.to(revealImgRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  };

  const handleMouseLeave = () => {
    if (!revealImgRef.current) return;
    gsap.to(revealImgRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  const categories = [CourseType.STARTER, CourseType.MAIN, CourseType.DESSERT, CourseType.COCKTAIL];

  return (
    <section 
      id="menu" 
      ref={sectionRef} 
      className="bg-stone-950 text-stone-200 pb-32 relative z-20 overflow-hidden cursor-default w-full"
    >
      
      {/* ticker strip */}
      <div className="w-full bg-[#ff4d00] text-black py-2 overflow-hidden border-y border-black relative z-30 mb-16 md:mb-20">
        <div className="ticker-track flex gap-8 whitespace-nowrap font-mono text-[9px] md:text-xs font-bold uppercase tracking-widest">
           {[...Array(10)].map((_, i) => (
             <React.Fragment key={i}>
               <span>WAGYU A5 ▲ 12%</span>
               <span>•</span>
               <span>TRUFA NEGRA ▼ 2%</span>
               <span>•</span>
               <span>MEZCAL TOBALÁ ▲ 5%</span>
               <span>•</span>
               <span>CAVIAR OSSETRA ▲ 8%</span>
               <span>•</span>
               <span>TIEMPO RESTANTE: 14 DÍAS</span>
               <span>•</span>
             </React.Fragment>
           ))}
        </div>
      </div>

      {/* hover image for desktop */}
      <img 
        ref={revealImgRef}
        src={activeImage}
        alt="Dish Preview"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        className="hidden lg:block fixed top-0 left-0 w-[300px] h-[400px] object-cover pointer-events-none z-[100] opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2 rounded-sm shadow-2xl shadow-black/50 filter contrast-125 border border-stone-800 bg-stone-900"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="border-b border-stone-800 pb-8 md:pb-12 mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="w-full">
               <span className="font-mono text-[#ff4d00] text-[10px] md:text-sm tracking-widest mb-2 block">PORTAFOLIO</span>
               <h2 className="text-[12vw] md:text-[8rem] leading-[0.9] font-display font-black uppercase tracking-tighter text-white break-words">
                 ACTIVOS<br/>COMESTIBLES
               </h2>
            </div>
            <div className="text-left md:text-right max-w-xs">
              <p className="font-mono text-[10px] md:text-xs text-stone-500 uppercase tracking-widest leading-relaxed">
                El valor de estos platillos fluctúa. Consumo bajo su propio riesgo financiero.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-24 md:space-y-32">
          {categories.map((cat, catIdx) => {
            const items = CURRENT_CONCEPT.menu.filter(i => i.type === cat);
            if (items.length === 0) return null;

            return (
              <div key={cat} className="relative">
                {/* faint section number */}
                <div className="absolute -top-12 md:-top-16 -left-2 md:-left-4 font-display text-[20vw] md:text-[12rem] text-stone-900/30 md:text-stone-900/50 font-black -z-10 select-none leading-none pointer-events-none">
                  0{catIdx + 1}
                </div>
                
                <div className="flex items-center gap-4 mb-10 md:mb-12 border-l-2 md:border-l-4 border-[#ff4d00] pl-4 md:pl-6 relative z-10">
                  <h3 className="text-xl md:text-3xl font-serif italic text-white">
                    {cat === 'STARTER' ? 'Apertura de Mercado' : 
                     cat === 'MAIN' ? 'Capital Principal' : 
                     cat === 'DESSERT' ? 'Liquidación' : 'Dividendos Líquidos'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-12 md:gap-0">
                  {items.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="menu-row group relative border-b md:border-b-0 md:border-t border-stone-800 md:border-stone-800 pb-8 md:py-10 hover:bg-stone-900/30 transition-colors duration-300 px-0 md:px-4 lg:cursor-none cursor-default last:border-b-0 md:last:border-b-0"
                      onMouseEnter={() => handleMouseEnter(dish.image)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 relative z-10">
                        <div className="flex-1">
                            <div className="flex justify-between items-start gap-4">
                                <h4 className="text-2xl md:text-4xl font-display font-bold text-stone-200 group-hover:text-white transition-all md:group-hover:tracking-wide duration-500 uppercase leading-none">
                                  {dish.name}
                                </h4>
                                <span className="md:hidden font-display text-xl text-white whitespace-nowrap">
                                    ${dish.price}
                                </span>
                            </div>

                            <p className="text-sm md:text-sm font-mono text-stone-300 md:text-stone-400 mt-3 md:mt-3 uppercase tracking-wide max-w-md group-hover:text-[#ff4d00] transition-colors leading-relaxed">
                               {dish.description}
                            </p>
                            
                            {/* mobile image box */}
                            <div className="lg:hidden w-full mt-6 mb-2 aspect-video overflow-hidden border border-stone-800 bg-stone-900 relative rounded-sm shadow-lg">
                                {dish.image ? (
                                  <img 
                                    src={dish.image} 
                                    alt={dish.name}
                                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90" 
                                    loading="lazy"
                                  />
                                ) : (
                                    <div className="w-full h-full bg-stone-900 flex items-center justify-center text-stone-700 text-[10px] font-mono uppercase">Imagen no disponible</div>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 md:gap-8 mt-2 md:mt-0 justify-between md:justify-end">
                          {dish.pairing && (
                             <span className="text-[9px] font-mono border border-stone-800 px-2 py-1 text-stone-500 uppercase tracking-wider">
                               Pair: {dish.pairing}
                             </span>
                          )}
                          <span className="hidden md:block font-display text-2xl md:text-3xl text-white md:group-hover:scale-110 transition-transform duration-300">
                            ${dish.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-32 md:mt-40 text-center">
            <h3 className="text-xl md:text-2xl font-mono text-stone-500 mb-8 uppercase tracking-[0.5em]">Fin del Reporte</h3>
            <div className="w-[1px] h-32 bg-gradient-to-b from-[#ff4d00] to-transparent mx-auto"></div>
        </div>

      </div>
    </section>
  );
};

export default Menu;
