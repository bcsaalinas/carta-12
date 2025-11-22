import React from 'react';
import { PAST_EDITIONS } from '../constants';
import { Instagram, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 max-w-6xl mx-auto">
        
        <div>
          <h3 className="text-4xl font-display font-bold text-white mb-6">CARTA<span className="text-[#ff4d00]">12</span></h3>
          <p className="text-stone-500 text-xs leading-loose max-w-xs mb-6 uppercase tracking-wide">
            Conceptos efímeros.<br/>
            Cambiamos todo cada mes.<br/>
            La permanencia está sobrevalorada.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-stone-400 hover:text-[#ff4d00] transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-stone-400 hover:text-[#ff4d00] transition-colors"><MapPin size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-6 flex items-center gap-2">
            <MapPin size={14} className="text-[#ff4d00]"/> Ubicación
          </h4>
          <address className="text-stone-400 text-sm not-italic leading-loose font-light">
            Calle Libertad 1900<br />
            Colonia Americana<br />
            44160 Guadalajara, Jal.<br />
            Acceso por el callejón trasero.
          </address>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-6">Archivo / Historial</h4>
          <ul className="space-y-4">
            {PAST_EDITIONS.map(edition => (
              <li key={edition.id} className="group cursor-pointer flex items-center justify-between text-sm border-b border-stone-900 pb-2 hover:border-[#ff4d00] transition-colors">
                <span className="text-stone-500 group-hover:text-white transition-colors">{edition.title}</span>
                <ArrowRight size={12} className="text-[#ff4d00] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-stone-800 text-[10px] uppercase tracking-widest">© 2025 Carta 12 Inc. Guadalajara, MX.</p>
        <p className="text-stone-800 text-[10px] uppercase tracking-widest">Powered by Gemini AI</p>
      </div>
    </footer>
  );
};

export default Footer;