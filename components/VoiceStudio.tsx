
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VoiceStyle, AudioGenerationState, VoiceOption, RestorationPoint } from '../types.ts';
import { VOICE_STYLES, VOICE_OPTIONS, APP_VERSION } from '../constants.tsx';
import { generateArgentineVoiceover, audioBufferToBlob } from '../services/geminiService.ts';

const VoiceStudio: React.FC = () => {
  const [script, setScript] = useState('');
  const [style, setStyle] = useState<VoiceStyle>(VoiceStyle.VERSATIL);
  const [selectedGender, setSelectedGender] = useState<'M' | 'F'>('M');
  const [previewLoadingId, setPreviewLoadingId] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1.0);
  const [history, setHistory] = useState<RestorationPoint[]>([]);
  
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedTalentName, setSelectedTalentName] = useState<string>(
    VOICE_OPTIONS.find(v => v.gender === 'M')?.displayName || ''
  );

  const currentTalent = useMemo(() => 
    VOICE_OPTIONS.find(v => v.displayName === selectedTalentName) || VOICE_OPTIONS[0],
  [selectedTalentName]);

  // Cargar historial al iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem('locuciones_ar_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error cargando historial");
      }
    }
  }, []);

  useEffect(() => {
    if (currentTalent) {
      setStyle(currentTalent.defaultStyle);
    }
  }, [selectedTalentName]);

  const talentsToShow = useMemo(() => 
    VOICE_OPTIONS.filter(v => v.gender === selectedGender), 
    [selectedGender]
  );

  const [state, setState] = useState<AudioGenerationState>({
    isGenerating: false,
    error: null,
    audioUrl: null
  });

  const saveRestorationPoint = () => {
    const newPoint: RestorationPoint = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      script,
      style,
      voiceName: selectedTalentName,
      gender: selectedGender,
      speed
    };
    const updatedHistory = [newPoint, ...history].slice(0, 10); // Guardamos los últimos 10
    setHistory(updatedHistory);
    localStorage.setItem('locuciones_ar_history', JSON.stringify(updatedHistory));
  };

  const handleRestore = (point: RestorationPoint) => {
    setScript(point.script);
    setStyle(point.style);
    setSelectedGender(point.gender);
    setSelectedTalentName(point.voiceName);
    setSpeed(point.speed);
  };

  const handleGenerate = async () => {
    if (!script.trim()) {
      setState(prev => ({ ...prev, error: "Escribí algo en el guion primero." }));
      return;
    }
    
    // Guardamos punto de restauración antes de generar
    saveRestorationPoint();

    setState(prev => ({ ...prev, isGenerating: true, error: null }));
    try {
      const buffer = await generateArgentineVoiceover(
        script, 
        style, 
        currentTalent.id, 
        speed, 
        currentTalent.gender,
        currentTalent.displayName
      );
      const blob = await audioBufferToBlob(buffer);
      const url = URL.createObjectURL(blob);
      setState({ isGenerating: false, error: null, audioUrl: url });
    } catch (err: any) {
      setState({ isGenerating: false, error: err.message, audioUrl: null });
    }
  };

  const handlePreview = async (e: React.MouseEvent, talent: VoiceOption) => {
    e.stopPropagation();
    if (previewLoadingId === talent.displayName) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        setPreviewLoadingId(null);
      }
      return;
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setPreviewLoadingId(talent.displayName);
    try {
      const buffer = await generateArgentineVoiceover(
        talent.referenceScript, 
        talent.defaultStyle, 
        talent.id, 
        1.0,
        talent.gender,
        talent.displayName
      );
      const blob = await audioBufferToBlob(buffer);
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudioRef.current = audio;
      audio.onplaying = () => setPreviewLoadingId(talent.displayName);
      audio.onended = () => { setPreviewLoadingId(null); currentAudioRef.current = null; };
      audio.onerror = () => setPreviewLoadingId(null);
      await audio.play();
    } catch (err) {
      setPreviewLoadingId(null);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-white/10 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-4xl font-black tracking-tighter">
                Estudio de <span className="gradient-text">Grabación</span>
              </h2>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-blue-400 font-black tracking-tighter border border-white/5 uppercase">
                V. {APP_VERSION}
              </span>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Talento: {currentTalent.displayName} • <span className="text-blue-400">{VOICE_STYLES[style]}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 self-start">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Masterización en Alta Fidelidad</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          
          {/* COLUMNA IZQUIERDA: CONTROLES */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Intención</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(VoiceStyle).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s as VoiceStyle)}
                    className={`relative py-3 px-2 rounded-xl text-[10px] font-black transition-all border ${style === s ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Puntos de Restauración</label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {history.length === 0 ? (
                  <div className="text-[10px] text-gray-600 font-bold uppercase italic p-4 border border-dashed border-white/5 rounded-xl text-center">Sin capturas recientes</div>
                ) : (
                  history.map((point) => (
                    <button
                      key={point.id}
                      onClick={() => handleRestore(point)}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all text-left group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[8px] font-black text-blue-400 uppercase">{new Date(point.timestamp).toLocaleTimeString()}</span>
                        <span className="text-[7px] font-black text-gray-600 uppercase italic">Deshacer</span>
                      </div>
                      <p className="text-[9px] text-gray-400 font-bold truncate">"{point.script}"</p>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Talentos</label>
              <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-4">
                <button onClick={() => setSelectedGender('M')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedGender === 'M' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>Hombres</button>
                <button onClick={() => setSelectedGender('F')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedGender === 'F' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>Mujeres</button>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {talentsToShow.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedTalentName(t.displayName)}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${selectedTalentName === t.displayName ? 'bg-blue-600/10 border-blue-500 shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${selectedTalentName === t.displayName ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-500'}`}>
                        <span className="text-[10px] font-black">{t.displayName[0]}</span>
                      </div>
                      <div>
                        <span className="font-black tracking-tight text-xs text-white block">{t.displayName}</span>
                        <span className="text-[7px] text-gray-500 font-bold uppercase tracking-widest">{t.id}</span>
                      </div>
                    </div>
                    <button onClick={(e) => handlePreview(e, t)} className="p-2 rounded-lg bg-white/5 text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: GUION */}
          <div className="lg:col-span-8">
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Guion Maestro</label>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.2rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value.slice(0, 500))}
                placeholder="Escribí aquí tu spot, separando con puntos para las pausas."
                className="relative w-full h-[580px] bg-black/40 border border-white/10 rounded-[2rem] p-8 text-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none placeholder:text-gray-800 leading-relaxed shadow-2xl"
              />
              <div className="absolute bottom-6 right-8 text-[10px] font-black text-gray-700 tracking-widest uppercase">
                {script.length} / 500
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4 flex-grow px-4">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Velocidad</span>
                  <input type="range" min="0.7" max="1.3" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="flex-grow h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  <span className="text-xs font-black text-blue-400 w-10">{speed.toFixed(1)}x</span>
                </div>
            </div>
          </div>
        </div>

        {/* FOOTER ESTUDIO: BOTÓN GENERAR */}
        <div className="flex flex-col items-center gap-8 border-t border-white/5 pt-10">
          <button
            onClick={handleGenerate}
            disabled={state.isGenerating}
            className={`w-full max-w-3xl py-6 rounded-[2rem] font-black text-xl tracking-tight transition-all transform flex items-center justify-center gap-4 relative overflow-hidden group shadow-[0_20px_50px_rgba(59,130,246,0.3)] ${state.isGenerating ? 'bg-blue-900 text-white cursor-wait' : 'bg-white text-black hover:bg-blue-50 active:scale-95'}`}
          >
            {state.isGenerating ? (
              <><div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> PROCESANDO MASTER...</>
            ) : (
              <><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg> GENERAR VERSIÓN FINAL</>
            )}
          </button>

          {state.error && (
            <div className="text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20 text-center animate-shake">
              ⚠️ {state.error}
            </div>
          )}

          {state.audioUrl && (
            <div className="w-full max-w-3xl p-8 glass rounded-[3rem] border-blue-500/30 flex flex-col md:flex-row items-center gap-6 animate-scale-up shadow-[0_0_80px_rgba(59,130,246,0.2)]">
              <div className="flex-grow w-full">
                <div className="flex justify-between items-center mb-3">
                   <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Master Final Finalizado</span>
                   <span className="text-[9px] font-black text-gray-600 uppercase italic">{selectedTalentName} • {speed}x</span>
                </div>
                <audio controls src={state.audioUrl} className="w-full h-12 custom-audio" />
              </div>
              <button 
                onClick={() => { const a = document.createElement('a'); a.href = state.audioUrl!; a.download = `Locucion-Master-${selectedTalentName}.wav`; a.click(); }} 
                className="bg-blue-600 text-white h-20 px-10 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center gap-3 shadow-xl shrink-0"
              >
                Descargar WAV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceStudio;
