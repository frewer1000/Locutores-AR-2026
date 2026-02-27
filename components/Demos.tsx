
import React, { useState, useRef, useMemo } from 'react';
import { VOICE_OPTIONS, WP_CONFIG } from '../constants';
import { VoiceStyle, VoiceOption } from '../types';
import FeaturedDemos from './FeaturedDemos';

interface DemosProps {
  onTry: (script: string, style: VoiceStyle) => void;
}

const Demos: React.FC<DemosProps> = ({ onTry }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'M' | 'F'>('M');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredVoices = useMemo(() => 
    VOICE_OPTIONS.filter(v => v.gender === filter), 
  [filter]);

  const handlePlayVoice = (voice: VoiceOption) => {
    if (playingId === voice.displayName) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = `${WP_CONFIG.DEMOS_BASE_URL}${voice.displayName}.mp3`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.onplaying = () => setPlayingId(voice.displayName);
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => {
      setPlayingId(null);
      alert("Demo no disponible temporalmente para " + voice.displayName);
    };

    audio.play();
  };

  return (
    <section id="demos" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8">
            Staff Profesional Argentino
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            Galería de <span className="gradient-text">Talentos</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto italic mb-16 leading-relaxed">
            "Escuchá la calidad final de nuestros talentos. Locuciones procesadas con entrega garantizada en menos de 60 segundos."
          </p>
          
          <FeaturedDemos />

          <div className="mt-32">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="text-left">
                <h3 className="text-2xl md:text-4xl font-black tracking-tight uppercase">Staff de <span className="text-blue-500">14 Voces Reales</span></h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Personalidad única para cada proyecto</p>
              </div>

              <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 shadow-2xl">
                <button 
                  onClick={() => setFilter('M')}
                  className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'M' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Voces Masculinas
                </button>
                <button 
                  onClick={() => setFilter('F')}
                  className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'F' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Voces Femeninas
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVoices.map((voice) => (
                <div 
                  key={voice.displayName} 
                  className={`glass p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-all group border-white/5 flex flex-col items-center text-center relative overflow-hidden ${playingId === voice.displayName ? 'border-blue-500/50 bg-blue-500/5' : ''}`}
                >
                  <div className={`w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 transition-all relative ${playingId === voice.displayName ? 'bg-blue-600/20 scale-110' : 'group-hover:bg-blue-600/10'}`}>
                    <span className={`text-2xl font-black ${playingId === voice.displayName ? 'text-blue-400' : 'text-gray-600'}`}>
                      {voice.displayName[0]}
                    </span>
                    {playingId === voice.displayName && (
                      <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    )}
                  </div>

                  <h3 className="font-black text-xl mb-1 tracking-tighter text-white uppercase">{voice.displayName}</h3>
                  <div className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] mb-4">
                     Voice Talent | Arg
                  </div>
                  
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed mb-8 h-20 overflow-hidden line-clamp-4 px-2 italic">
                    {voice.description}
                  </p>

                  <button 
                    onClick={() => handlePlayVoice(voice)}
                    className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${playingId === voice.displayName ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                  >
                    {playingId === voice.displayName ? (
                       'DETENER'
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                        OÍR DEMO
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demos;
