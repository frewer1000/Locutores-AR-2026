
import React from 'react';
import { WP_CONFIG } from '../constants.tsx';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const scrollToDemos = (e: React.MouseEvent) => {
    e.preventDefault();
    const demosSection = document.getElementById('demos');
    if (demosSection) {
      const headerOffset = 80;
      const elementPosition = demosSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-12 lg:pt-32 lg:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm font-medium text-blue-300">Calidad de Estudio Profesional</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight uppercase">
          Tu Radio con <span className="gradient-text">Aire de Primera</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Locuciones argentinas profesionales en segundos. Acento rioplatense real, 
          naturalidad absoluta y descarga inmediata para potenciar tu contenido.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
            <a 
              href={WP_CONFIG.STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20 active:scale-95 inline-block text-center"
            >
              Probar el Estudio Ahora
            </a>
            <button 
              onClick={scrollToDemos}
              className="w-full sm:w-auto px-10 py-4 glass hover:bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95"
            >
              Ver Staff de Voces
            </button>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 max-w-xl animate-fade-in">
            <p className="text-[11px] md:text-xs font-black text-blue-300 uppercase tracking-widest leading-relaxed">
              Regístrate automáticamente desde <span className="text-white">PROBAR EL ESTUDIO AHORA</span> y <span className="text-white underline decoration-blue-500 underline-offset-4">obtené 3 locuciones gratis</span>.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tighter">CHAPELCO</span>
            <span className="text-[8px] uppercase tracking-widest font-bold">Pura Música</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tighter">SONAR</span>
            <span className="text-[8px] uppercase tracking-widest font-bold">Sonido Buenos Aires</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tighter">HIT 105</span>
            <span className="text-[8px] uppercase tracking-widest font-bold">Tu Compañía</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tighter">CIUDAD 90.3</span>
            <span className="text-[8px] uppercase tracking-widest font-bold">La Voz de la City</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
