import React, { useState, useEffect } from 'react';

const PhoneDetectionFeature: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) => (current === 4 ? 1 : (current + 1) as 1 | 2 | 3 | 4));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const scriptOriginal = "Clínica Dental Dra. Mónica Páez. Turnos al 2342-421800 o escribinos a turnos@clinicapaez.com.ar. Seguinos en Instagram como @dra.monicapaez. Tu sonrisa, nuestra prioridad.";
  
  const suggestions = [
    { type: 'TEL', original: "2342-421800", read: "DOS TRES CUATRO DOS / CUARENTA Y DOS / DIECIOCHO / CERO CERO" },
    { type: 'WEB', original: "TURNOS@CLINICAPAEZ.COM.AR", read: "TURNOS / ARROBA / CLINICA-PAEZ / PUNTO-COM / PUNTO-AR" },
    { type: 'WEB', original: "@DRA.MONICAPAEZ", read: "ARROBA / D-R-A / PUNTO / MONICA-PAEZ" }
  ];

  const scriptFinal = "Clínica Dental Dra. Mónica Páez. Turnos al dos tres cuatro dos / cuarenta y dos / dieciocho / cero cero o escribinos a turnos / arroba / clinica-paez / punto-com / punto-ar. Seguinos en Instagram como arroba / d-r-a / punto / monica-paez. Tu sonrisa, nuestra prioridad.";

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-[4rem] blur opacity-20 transition-opacity duration-1000 ${step === 2 ? 'opacity-60' : 'opacity-20'}`}></div>
            
            <div className="relative glass p-10 md:p-16 rounded-[3.8rem] border-white/10 flex flex-col lg:flex-row items-center gap-16 overflow-hidden bg-black/40">
              
              <div className="lg:w-1/2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                  <span className={`w-2 h-2 rounded-full bg-blue-500 mr-2 ${step === 2 ? 'animate-ping' : ''}`}></span>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">IA DETECCIÓN AUTOMÁTICA</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-tight">
                  📱 Smart <br/>
                  <span className="text-blue-500">Phone Detector</span>
                </h2>
                
                <p className="text-xl text-gray-300 font-medium leading-relaxed mb-8">
                  <span className="text-white font-black">Tu asistente fonético:</span> Detecta automáticamente números de teléfono, correos electrónicos y redes sociales en tu guion, sugiriendo la lectura fonética exacta para evitar errores al aire.
                </p>
              </div>

              <div className="lg:w-1/2 w-full relative">
                <div className="relative glass-dark rounded-[2.5rem] border border-white/10 p-8 shadow-2xl scale-100 lg:scale-110 bg-black/80">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tighter">GUION MAESTRO</span>
                        <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">DETECCIÓN ACTIVA</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-[8px] font-black text-blue-500/80 uppercase tracking-widest">47/100 PALABRAS</span>
                    </div>
                  </div>

                  <div className="bg-black/60 rounded-2xl p-6 mb-6 border border-white/5 min-h-[350px] transition-all duration-500">
                    {step === 1 && <p className="text-gray-300 text-[10px] uppercase font-bold tracking-wide animate-fade-in">{scriptOriginal}</p>}
                    {step === 2 && <p className="text-gray-300 text-[10px] uppercase font-bold tracking-wide animate-fade-in">{scriptOriginal}</p>}
                    {step === 3 && <p className="text-gray-300 text-[10px] uppercase font-bold tracking-wide animate-fade-in">{scriptOriginal}</p>}
                    {step === 4 && <p className="text-gray-300 text-[10px] uppercase font-bold tracking-wide animate-fade-in">{scriptFinal}</p>}
                  </div>

                  {(step === 2 || step === 3) && (
                    <div className="space-y-3 mb-6 animate-fade-in">
                      {suggestions.map((s, i) => (
                        <div key={i} className={`text-[9px] font-black uppercase tracking-widest ${step === 2 ? 'text-red-500' : 'text-green-500'}`}>
                          {s.type}: "{s.original}" → LEER: "{s.read}"
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                       {step === 1 && (
                         <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/5">
                           <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">¿ANALIZAR?</span>
                           <span className="px-3 py-1 rounded-lg bg-orange-500 text-black text-[8px] font-black uppercase tracking-widest">SÍ</span>
                           <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-600 text-[8px] font-black uppercase tracking-widest">NO</span>
                         </div>
                       )}
                       {(step === 2) && (
                         <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/5">
                           <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">¿INCORPORAR?</span>
                           <span className="px-3 py-1 rounded-lg bg-orange-500 text-black text-[8px] font-black uppercase tracking-widest">SÍ</span>
                           <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-600 text-[8px] font-black uppercase tracking-widest">NO</span>
                         </div>
                       )}
                    </div>
                    <button className="bg-white text-black px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">
                      GENERAR MASTER
                    </button>
                  </div>

                  {step === 2 && (
                    <div className="mt-6 flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/5 shadow-inner animate-fade-in">
                      <div className="p-3 bg-blue-500/20 rounded-2xl">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-white font-black uppercase tracking-widest mb-1">Sugerencias Editables</p>
                        <p className="text-sm text-gray-400 font-medium">
                          Antes de incorporar las sugerencias, podés editarlas directamente desde el campo Notas del Director. Ajustá cualquier pronunciación antes de confirmar.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneDetectionFeature;
