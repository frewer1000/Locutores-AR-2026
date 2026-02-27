
import React, { useState, useRef } from 'react';
import { WP_CONFIG } from '../constants';

const FeaturedDemos: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const featuredDemos = [
    {
      id: 'mariano',
      name: 'Mariano',
      tag: 'INSTITUCIONAL / NOTICIAS',
      description: 'Solidez y autoridad inquebrantable. Proyecta la confianza y el liderazgo que las grandes marcas nacionales demandan.',
      color: 'blue'
    },
    {
      id: 'lucia',
      name: 'Lucía',
      tag: 'RADIO FM PRIME',
      description: 'La estrella de las mañanas. Energía ascendente y un brillo vocal contagioso que conecta de inmediato con cualquier audiencia.',
      color: 'purple'
    },
    {
      id: 'facundo',
      name: 'Facundo',
      tag: 'LUJO / PRESTIGIO',
      description: 'El estándar de la distinción. Una voz profunda y sofisticada diseñada para posicionar marcas de alta gama con autoridad absoluta.',
      color: 'amber'
    }
  ];

  const handlePlay = (name: string) => {
    if (playingId === name) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = `${WP_CONFIG.DEMOS_BASE_URL}${name}.mp3`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.onplaying = () => setPlayingId(name);
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => {
      setPlayingId(null);
      console.error("No se pudo cargar el demo de " + name);
    };

    audio.play();
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-24 px-4">
      {featuredDemos.map((demo) => (
        <div 
          key={demo.id}
          className={`glass p-8 rounded-[3.5rem] border-white/5 relative group overflow-hidden transition-all hover:border-white/20 shadow-2xl flex flex-col ${playingId === demo.name ? `ring-2 ring-${demo.color === 'amber' ? 'yellow' : demo.color}-500/50 bg-${demo.color === 'amber' ? 'yellow' : demo.color}-950/10` : ''}`}
        >
          <div className={`absolute -top-12 -right-12 w-32 h-32 bg-${demo.color === 'amber' ? 'yellow' : demo.color}-500/10 blur-[50px] pointer-events-none group-hover:bg-${demo.color === 'amber' ? 'yellow' : demo.color}-500/20 transition-all`}></div>
          
          <div className="mb-6 text-left">
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full bg-${demo.color === 'amber' ? 'yellow' : demo.color}-500/10 text-${demo.color === 'amber' ? 'yellow' : demo.color}-400 text-[8px] font-black uppercase tracking-widest border border-${demo.color === 'amber' ? 'yellow' : demo.color}-500/20 mb-4`}>
               {demo.tag}
            </div>
            <h4 className="text-3xl font-black tracking-tighter uppercase">{demo.name}</h4>
          </div>
          
          <p className="text-gray-400 text-sm font-medium leading-relaxed mb-10 italic text-left">
            "{demo.description}"
          </p>
          
          <div className="mt-auto">
            <button 
              onClick={() => handlePlay(demo.name)}
              className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-lg ${playingId === demo.name ? `bg-${demo.color === 'amber' ? 'yellow' : demo.color}-600 text-white` : `bg-white text-black hover:bg-gray-100 active:scale-95`}`}
            >
              {playingId === demo.name ? (
                <>
                  <div className="flex gap-1 items-end h-3">
                    <span className="w-1 bg-white animate-pulse h-3"></span>
                    <span className="w-1 bg-white animate-pulse h-2" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-1 bg-white animate-pulse h-4" style={{animationDelay: '0.4s'}}></span>
                  </div>
                  PAUSAR DEMO
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  ESCUCHAR MASTER
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedDemos;
