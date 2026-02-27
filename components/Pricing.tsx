
import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    {
      id: 'pack_inicial',
      name: 'PACK INICIAL',
      price: 25000,
      displayPrice: '$25.000',
      oldPrice: '$50.000',
      description: 'Ideal para proyectos puntuales y spots de redes sociales.',
      features: [
        '20 Locuciones Totales',
        '10 originales + 10 bonificadas',
        'Costo x Locución: $1.250',
        'Sin fecha de vencimiento',
        'Uso en Radio, TV, Web y Redes'
      ],
      button: 'COMPRAR PACK'
    },
    {
      id: 'pack_pro',
      name: 'PACK PRO',
      price: 55000,
      displayPrice: '$55.000',
      oldPrice: '$110.000',
      description: 'Perfecto para campañas de frecuencia diaria y lanzamientos.',
      features: [
        '50 Locuciones Totales',
        '25 originales + 25 bonificadas',
        'Costo x Locución: $1.100 (¡Ahorrás más!)',
        'Sin fecha de vencimiento',
        'Uso en Radio, TV, Web y Redes'
      ],
      button: 'COMPRAR PACK'
    },
    {
      id: 'pack_productora',
      name: 'PACK PRODUCTORA',
      price: 100000,
      displayPrice: '$100.000',
      oldPrice: '$200.000',
      description: 'Para quienes necesitan calidad y rapidez todos los días.',
      features: [
        '100 Locuciones Totales',
        '50 originales + 50 bonificadas',
        'Costo x Locución: $1.000 (Precio Mayorista)',
        'Soporte prioritario',
        'Uso ilimitado sin vencimiento'
      ],
      button: 'COMPRAR PACK'
    }
  ];

  const handlePurchase = () => {
    try {
      if (window.top) {
        window.top.location.href = "https://locuciones-argentinas-ai-version-fi-pi.vercel.app/";
      } else {
        window.location.href = "https://locuciones-argentinas-ai-version-fi-pi.vercel.app/";
      }
    } catch (e) {
      window.location.href = "https://locuciones-argentinas-ai-version-fi-pi.vercel.app/";
    }
  };

  return (
    <section id="pricing" className="py-32 relative bg-gradient-to-b from-transparent to-blue-900/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-500/20">
             VÁLIDO PARA PUBLICIDAD, RADIO, TV, REDES, POLÍTICA Y ARTÍSTICA
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Packs de <span className="text-blue-500">Locuciones</span></h2>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto italic mb-6 leading-relaxed px-4">
            "Nuestras locuciones están habilitadas para todo tipo de uso: Publicidades comerciales, artística de radio, campañas políticas y promociones. Calidad nacional al mejor precio."
          </p>
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             <span className="text-red-400 text-[10px] font-black uppercase tracking-widest">50% OFF LANZAMIENTO - ÚLTIMOS DÍAS</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-20">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative glass p-10 rounded-[3rem] flex flex-col transition-all border-white/5 ${idx === 1 ? 'ring-2 ring-blue-500 scale-105 z-10 bg-white/[0.07] shadow-[0_0_80px_rgba(59,130,246,0.15)]' : 'hover:bg-white/[0.04]'}`}
            >
              {idx === 1 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-black px-8 py-2.5 rounded-full uppercase tracking-[0.3em] shadow-xl shadow-blue-600/50">
                  El más rendidor
                </div>
              )}
              
              <h3 className="text-xl font-black mb-2 tracking-tight uppercase">{plan.name}</h3>
              <p className="text-gray-500 text-[11px] mb-8 leading-snug font-bold italic tracking-wide h-8">{plan.description}</p>
              
              <div className="mb-10 flex flex-col items-start gap-1">
                <span className="text-gray-600 text-xl font-black line-through decoration-red-500/50">{plan.oldPrice}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">{plan.displayPrice}</span>
                  <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">ARS</span>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start text-xs text-gray-400 font-bold uppercase tracking-tight leading-relaxed">
                    <svg className="w-4 h-4 text-blue-500 mr-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={handlePurchase}
                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all transform active:scale-95 flex items-center justify-center gap-2 text-center ${idx === 1 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/30' : 'bg-white/5 hover:bg-white/10 text-white'}`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer con onda */}
        <div className="max-w-3xl mx-auto p-10 glass rounded-[3rem] border-blue-500/20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed italic relative z-10">
            "¿Por qué las locuciones bonificadas? Porque sabemos que a veces querés probar un tono distinto o ajustar una pausa. <span className="text-blue-400 font-black">Con nosotros, el re-take es parte del pack.</span>"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
