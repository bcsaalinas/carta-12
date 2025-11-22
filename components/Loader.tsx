import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // simple loading counter
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    const tl = gsap.timeline({
      onComplete: onComplete
    });

    if (count >= 100) {
       tl.to(progressRef.current, {
         width: '100%',
         duration: 0.5
       })
       .to(".loader-item", {
         y: -100,
         opacity: 0,
         stagger: 0.1,
         duration: 0.8,
         ease: "power3.in"
       })
       .to(containerRef.current, {
         y: '-100%',
         duration: 1,
         ease: "expo.inOut",
         delay: 0.2
       });
    }
    
    return () => clearInterval(interval);
  }, [count, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#0c0a09] flex flex-col items-center justify-center text-[#e7e5e4]">
      <div className="absolute bottom-12 left-12 font-mono text-xs">
        <span className="loader-item inline-block">CARGANDO RECURSOS...</span>
      </div>
      
      <div className="relative overflow-hidden mb-4">
        <h1 className="loader-item text-6xl md:text-9xl font-display font-black tracking-tighter">
          CARTA<span className="text-[#ff4d00]">12</span>
        </h1>
      </div>

      <div className="w-64 h-[1px] bg-stone-800 mt-4 relative overflow-hidden loader-item">
        <div 
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-[#ff4d00] transition-all duration-300"
          style={{ width: `${Math.min(count, 100)}%` }}
        ></div>
      </div>
      
      <div className="mt-2 font-mono text-xs text-[#ff4d00] loader-item">
        {Math.min(count, 100)}%
      </div>
    </div>
  );
};

export default Loader;
