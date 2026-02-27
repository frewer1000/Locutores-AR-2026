
import React, { useState, useEffect } from 'react';

const AIAnalyzerFeature: React.FC = () => {
  const [step, setStep] = useState<'idle' | 'analyzing' | 'done'>('idle');

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) => {
        if (current === 'idle') return 'analyzing';
        if (current === 'analyzing') return 'done';
        return 'idle';
      });
    }, step === 'analyzing' ? 2500 : 5000); // El análisis dura menos que la visualización

    return () => clearInterval(timer);
  }, [step]);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative group">
            {/* Brillo perimetral dinámico */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-[4rem] blur opacity-20 transition-opacity duration-1000 ${step === 'analyzing' ? 'opacity-60' : 'opacity-20'}`}></div>
            
            <div className="relative glass p-10 md:p-16 rounded-[3.8rem] border-white/10 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
              
              {/* Texto Descriptivo */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                  <span className={`w-2 h-2 rounded-full bg-blue-500 mr-2 ${step === 'analyzing' ? 'animate-ping' : ''}`}></span>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">IA DIRECCIÓN DE ARTE</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-tight">
                  🧠 AI Analyzer: <br/>
                  <span className="text-blue-500">Tu Director Virtual</span>
                </h2>
                
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 font-medium leading-relaxed">
                    <span className="text-white font-black">Nuestro cerebro de IA:</span> Analiza tu guion y redacta automáticamente las mejores indicaciones de dirección artística para lograr una pieza de radio perfecta.
                  </p>
                  
                  <div className="flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/5 shadow-inner">
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-white font-black uppercase tracking-widest mb-1">Sugerencias Editables</p>
                      <p className="text-sm text-gray-400 font-medium">
                        Una vez que la IA cargue las notas, podés borrarlas, corregirlas o ajustar cualquier detalle antes de generar el audio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulación de Interfaz Real */}
              <div className="lg:w-1/2 w-full relative">
                <div className="relative glass-dark rounded-[2.5rem] border border-white/10 p-6 shadow-2xl scale-100 lg:scale-110">
                  {/* Header de la interfaz */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tighter">GUION MAESTRO</span>
                        <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">ACENTO ARGENTINO</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-[8px] font-black text-blue-500/80 uppercase tracking-widest">67/100 PALABRAS</span>
                    </div>
                  </div>

                  {/* Campo Título */}
                  <div className="bg-black/60 rounded-xl p-4 mb-4 border border-white/5">
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">EFECTO VERANO</span>
                  </div>

                  {/* Sección NOTAS DEL DIRECTOR */}
                  <div className="mb-4">
                    <span className="text-[7px] font-black text-gray-600 uppercase tracking-widest mb-2 block">NOTAS DEL DIRECTOR</span>
                    <div className={`relative min-h-[80px] bg-black/60 rounded-xl p-4 border transition-all duration-500 ${step === 'done' ? 'border-blue-500/30' : 'border-white/5'}`}>
                      {step === 'idle' && (
                        <span className="text-[9px] text-gray-800 font-bold uppercase italic">Indicaciones técnicas: ej. más cercano, con aire...</span>
                      )}
                      {step === 'analyzing' && (
                        <div className="flex flex-col gap-2">
                          <div className="h-2 w-full bg-blue-500/10 rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-blue-500/40 animate-shimmer"></div>
                          </div>
                          <div className="h-2 w-2/3 bg-blue-500/10 rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-blue-500/40 animate-shimmer" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      )}
                      {step === 'done' && (
                        <p className="text-[9px] text-gray-300 font-black uppercase leading-relaxed animate-fade-in">
                          INTRO SOFOCANTE, RISA PÍCARA Y EXPLOSIÓN DE FRESCURA. RITMO PICADO. PISAR FUERTE "ATR VERANO" CON BRILLO. CIERRE AL PALO. ¡QUE SEA UN HIT!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Controles y Botones */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                      {['RISA', 'SUSPIRO', 'TOS'].map(tag => (
                        <span key={tag} className="px-2 py-1 text-[7px] font-black text-gray-500 uppercase">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <button className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${step === 'analyzing' ? 'bg-blue-600 border-blue-400 text-white animate-pulse' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                        {step === 'analyzing' ? 'ANALIZANDO...' : 'ANALYSER IA'}
                        <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center text-[6px]">i</div>
                      </button>
                      <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                        ÉNFASIS
                        <div className="w-3 h-3 rounded-full bg-white/10 flex items-center justify-center text-[6px]">i</div>
                      </button>
                    </div>
                  </div>

                  {/* Área del Guion */}
                  <div className="bg-black/80 rounded-2xl p-6 border border-white/10 min-h-[120px]">
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                      Sentís el calor? El sol quema, la arena arde, pero tu radio (Risa)... tu radio es un freezer. Se viene 'ATR Verano'. De lunes a viernes, de dos a seis de la tarde...
                    </p>
                  </div>

                  {/* Footer de la interfaz */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex-grow mr-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-[7px] font-black text-gray-600 uppercase">RITMO</span>
                        <span className="text-[7px] font-black text-blue-400">1.0X</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full relative">
                        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-black"></div>
                      </div>
                    </div>
                    <button className="bg-white text-black px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">
                      GENERAR MASTER
                    </button>
                  </div>
                </div>

                {/* Etiquetas flotantes decorativas */}
                <div className={`absolute -right-4 top-1/4 bg-blue-600 text-white text-[8px] font-black px-4 py-2 rounded-lg shadow-2xl transition-all duration-1000 ${step === 'done' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  DIRECCIÓN AUTOMÁTICA
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .glass-dark {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(20px);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}} />
    </section>
  );
};

export default AIAnalyzerFeature;
