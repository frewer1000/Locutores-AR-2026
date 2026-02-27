
import React from 'react';

interface StoreProps {
  onClose: () => void;
}

const Store: React.FC<StoreProps> = ({ onClose }) => {
  const packs = [
    {
      name: 'PACK INICIAL',
      description: 'Ideal para proyectos puntuales y spots de redes sociales.',
      oldPrice: '$50.000',
      price: '$25.000',
      features: [
        '20 LOCUCIONES TOTALES',
        '10 ORIGINALES + 10 BONIFICADAS',
        'COSTO X LOCUCIÓN: $1.250',
        'SIN FECHA DE VENCIMIENTO',
        'USO EN RADIO, TV, WEB Y REDES'
      ],
      highlight: false
    },
    {
      name: 'PACK PRO',
      description: 'Perfecto para campañas de frecuencia diaria y lanzamientos.',
      oldPrice: '$110.000',
      price: '$55.000',
      features: [
        '50 LOCUCIONES TOTALES',
        '25 ORIGINALES + 25 BONIFICADAS',
        'COSTO X LOCUCIÓN: $1.100 (¡AHORRÁS!)',
        'SIN FECHA DE VENCIMIENTO',
        'USO EN RADIO, TV, WEB Y REDES'
      ],
      highlight: true
    },
    {
      name: 'PACK PRODUCTORA',
      description: 'Para quienes necesitan calidad y rapidez todos los días.',
      oldPrice: '$200.000',
      price: '$100.000',
      features: [
        '100 LOCUCIONES TOTALES',
        '50 ORIGINALES + 50 BONIFICADAS',
        'COSTO X LOCUCIÓN: $1.000 (MAYORISTA)',
        'SOPORTE PRIORITARIO',
        'USO ILIMITADO SIN VENCIMIENTO'
      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-8 py-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none">LOCUTORES<span className="text-blue-500">.AR</span></span>
              <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.2em] mt-1">ESTUDIO DE IA PROFESIONAL</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">CONEXIÓN AUTORIZADA • CRÉDITOS REAL-TIME</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-3 flex flex-col items-center">
                 <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1">SALDO DISPONIBLE</span>
                 <span className="text-4xl font-black text-blue-500 leading-none">40</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="bg-red-600 hover:bg-red-500 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg shadow-red-900/20 active:scale-95"
            >
              CERRAR
            </button>

            <div className="flex items-center gap-3 ml-4">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-black text-white block leading-none mb-1">VANESA MELO</span>
                <span className="text-[8px] font-black text-red-500 uppercase tracking-widest cursor-pointer hover:underline">SALIR</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 overflow-hidden border border-white/10 shadow-xl">
                <img src="https://locuciones-argentinas-ai-version-fi-pi.vercel.app/avatar-placeholder.png" alt="Profile" className="w-full h-full object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=vanesa';
                }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase mb-6 leading-tight">
            CARGÁ <span className="text-blue-500">CRÉDITOS</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-3xl mx-auto italic leading-relaxed mb-12">
            "Seleccioná el pack que mejor se adapte a tu flujo de trabajo. Tu pago se procesa de forma segura mediante Mercado Pago."
          </p>

          <div className="flex items-center justify-center gap-4 mb-20 opacity-40">
            <img src="https://locutoresargentinosia.com.ar/wp-content/uploads/2024/mercado-pago.png" alt="Mercado Pago" className="h-6 grayscale brightness-200" />
            <div className="w-px h-4 bg-white/20"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">MASTER STUDIO CHECKOUT</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packs.map((pack, idx) => (
              <div 
                key={idx}
                className={`relative group glass p-12 rounded-[3.5rem] flex flex-col text-left transition-all border-white/5 ${pack.highlight ? 'ring-2 ring-blue-500 scale-105 bg-white/[0.04] shadow-[0_0_100px_rgba(59,130,246,0.1)]' : 'hover:bg-white/[0.02]'}`}
              >
                {pack.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-blue-600/50">
                    MÁS RENDIDOR
                  </div>
                )}

                <h3 className="text-2xl font-black mb-1 tracking-tighter uppercase">{pack.name}</h3>
                <p className="text-gray-600 text-[10px] font-black uppercase italic mb-10 h-10 leading-snug">{pack.description}</p>

                <div className="mb-12 flex flex-col">
                  <span className="text-gray-700 text-xl font-black line-through mb-1 tracking-tight">{pack.oldPrice}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[64px] font-black tracking-tighter leading-none">{pack.price}</span>
                    <span className="text-gray-600 text-xs font-black tracking-widest">ARS</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-14 flex-grow">
                  {pack.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all transform active:scale-95 ${pack.highlight ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                  ADQUIRIR AHORA
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Store;
