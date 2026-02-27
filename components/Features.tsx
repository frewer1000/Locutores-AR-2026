
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Motor Rioplatense',
      description: 'A diferencia de las voces neutras, nuestro motor está optimizado para el voseo auténtico. Respeta la cadencia de Buenos Aires, el interior y el rehilamiento característico, logrando una identidad local perfecta.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="21.3" fill="#74ACDF"/>
          <rect y="21.3" width="64" height="21.4" fill="white"/>
          <rect y="42.7" width="64" height="21.3" fill="#74ACDF"/>
          <circle cx="32" cy="32" r="6" fill="#F6B000"/>
          <path d="M32 23V26M32 38V41M41 32H44M20 32H23M38.3 25.7L36.2 27.8M27.8 36.2L25.7 38.3M38.3 38.3L36.2 36.2M27.8 27.8L25.7 25.7" stroke="#F6B000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'IA Emocional',
      description: 'Gracias a nuestra avanzada tecnología de voces neurales, el sistema entiende el contexto del guion. Puede interpretar desde un flash informativo urgente hasta una narración melosa, ajustando la voz a tu necesidad.',
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Entrega Inmediata',
      description: 'No necesitás un técnico de sonido ni esperar días. El audio se procesa y se entrega en formato .WAV de alta fidelidad en menos de 60 segundos, listo para salir al aire.',
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Locución <span className="gradient-text">Instantánea</span></h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Combinamos los modelos de lenguaje más avanzados para entregarte locuciones profesionales listas para descargar en menos de un minuto.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-start p-10 glass rounded-[3rem] border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform overflow-hidden">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
