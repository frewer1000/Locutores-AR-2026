
import React, { useState, useEffect } from 'react';
import { Instagram, ShieldCheck } from 'lucide-react';
import Hero from './components/Hero.tsx';
import Demos from './components/Demos.tsx';
import Features from './components/Features.tsx';
import AIAnalyzerFeature from './components/AIAnalyzerFeature.tsx';
import PhoneDetectionFeature from './components/PhoneDetectionFeature.tsx';
import Pricing from './components/Pricing.tsx';
import VoiceStudio from './components/VoiceStudio.tsx';
import Store from './components/Store.tsx';
import { WP_CONFIG } from './constants.tsx';

interface AppProps {
  forcedView?: 'landing' | 'app' | 'store' | null;
}

const App: React.FC<AppProps> = ({ forcedView }) => {
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view') as 'landing' | 'app' | 'store' | null;
  
  const isAuthCallback = window.location.hash.includes('access_token');
  const isStudioPath = window.location.pathname.includes('/estudio');
  
  const [view, setView] = useState<'landing' | 'app' | 'store'>(
    forcedView || viewParam || (isAuthCallback || isStudioPath ? 'app' : 'landing')
  );
  const [showTutorials, setShowTutorials] = useState(false);

  useEffect(() => {
    if (forcedView) setView(forcedView);
  }, [forcedView]);

  const handleNavigation = (targetView: 'landing' | 'app' | 'store') => {
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStore = () => setView('store');
  const closeStore = () => setView('app');

  return (
    <div className="min-h-screen">
      {view === 'landing' && (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('landing')}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase leading-none text-white">LOCUTORES<span className="text-blue-500">.AR</span></span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/locutoresargentinosia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all active:scale-95"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
              <button 
                onClick={() => setShowTutorials(true)}
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
              >
                Tutoriales
              </button>
              <a 
                href={WP_CONFIG.STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 inline-block"
              >
                Ir al Estudio
              </a>
            </div>
          </div>
        </nav>
      )}

      {showTutorials && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowTutorials(false)}
          />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowTutorials(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-all border border-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe 
              src="https://www.youtube.com/embed/bUylol8f_cI?list=PLKWf_Hv88D0UJfhJPYbbPqys50M18GJuK&autoplay=1"
              className="w-full h-full"
              title="Tutoriales Locutores.ar"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {view === 'landing' ? (
        <main className="bg-[#050505] text-white">
          <Hero onStart={() => handleNavigation('app')} />
          <Demos onTry={() => handleNavigation('app')} />
          <Features />
          <AIAnalyzerFeature />
          <PhoneDetectionFeature />
          <Pricing />
          <footer className="py-20 border-t border-white/5 bg-black/50">
            <div className="container mx-auto px-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="text-lg font-black tracking-tighter uppercase text-white">LOCUTORES<span className="text-blue-500">.AR</span></span>
              </div>
              <p className="text-gray-500 text-xs font-medium max-w-md mx-auto mb-2 uppercase tracking-widest">
                LA PRIMERA PLATAFORMA DE LOCUCIÓN PROFESIONAL CON IA DE ARGENTINA.
              </p>
              <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                admin@locutoresargentinosia.com.ar
              </p>
              <div className="mb-4">
                <a
                  href="https://locutoresargentinosia.com.ar/politica-de-privacidad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 text-[10px] font-black uppercase tracking-widest transition-colors mb-4"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Política de Privacidad
                </a>
              </div>
              <div className="flex justify-center gap-4 mb-8">
                <a 
                  href="https://www.instagram.com/locutoresargentinosia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:text-white hover:bg-white/10 transition-all"
                >
                  <Instagram size={16} />
                </a>
              </div>
              <div className="text-[10px] font-black text-gray-700 uppercase tracking-[0.3em]">
                © {new Date().getFullYear()} MASTER PRODUCCIONES • TODOS LOS DERECHOS RESERVADOS
              </div>
            </div>
          </footer>
        </main>
      ) : view === 'store' ? (
        <Store onClose={closeStore} />
      ) : (
        <div className="bg-black min-h-screen text-white">
          <nav className="glass border-b border-white/5 px-8 py-6 sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-6 cursor-pointer" onClick={() => handleNavigation('landing')}>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter uppercase leading-none">LOCUTORES<span className="text-blue-500">.AR</span></span>
                  <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.2em] mt-1">ESTUDIO DE IA PROFESIONAL</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/locutoresargentinosia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all active:scale-95"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <button 
                  onClick={openStore}
                  className="px-8 py-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                >
                  Cargar Créditos
                </button>
                <button 
                  onClick={() => handleNavigation('landing')}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
                >
                  Salir
                </button>
              </div>
            </div>
          </nav>
          <VoiceStudio />
        </div>
      )}
    </div>
  );
};

export default App;
