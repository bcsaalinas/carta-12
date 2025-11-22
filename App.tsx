import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Concept from './components/Concept';
import Menu from './components/Menu';
import Concierge from './components/Concierge';
import Footer from './components/Footer';
import Loader from './components/Loader';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const followerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // Only run on desktop
    if (window.innerWidth < 768) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleHover = () => {
       gsap.to(cursor, { scale: 0.5, opacity: 0, duration: 0.2 });
       gsap.to(follower, { scale: 3, backgroundColor: '#ff4d00', mixBlendMode: 'difference', duration: 0.2 });
    };

    const handleLeave = () => {
       gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
       gsap.to(follower, { scale: 1, backgroundColor: 'transparent', mixBlendMode: 'normal', duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Add event listeners to clickable elements
    const clickables = document.querySelectorAll('button, a, .cursor-hover');
    clickables.forEach(el => {
       el.addEventListener('mouseenter', handleHover);
       el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
       window.removeEventListener('mousemove', moveCursor);
       clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
     });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff4d00] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      ></div>
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#ff4d00]/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors"
      ></div>
    </>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    // Only hide cursor on md (desktop) screens. Mobile keeps default interaction.
    <div className="bg-stone-950 min-h-screen text-stone-200 selection:bg-[#ff4d00] selection:text-black md:cursor-none cursor-auto overflow-x-hidden">
      <CustomCursor />
      
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Concept />
          <Menu />
          <Footer />
          <Concierge />
        </>
      )}
    </div>
  );
};

export default App;