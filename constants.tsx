
import { VoiceStyle, VoiceOption } from './types';

export const GEMINI_MODEL = 'gemini-2.5-flash-preview-tts';
export const APP_VERSION = '11.0.1-MASTER';
export const GITHUB_REPO = 'https://github.com/'; 

export const WP_CONFIG = {
  HOME_URL: '/',           
  STUDIO_URL: 'https://locuciones-argentinas-ai-version-fi-pi.vercel.app/',  
  PRICING_URL: '/tienda/',
  DEMOS_BASE_URL: 'https://locutoresargentinosia.com.ar/demos/'
};

export const SYSTEM_INSTRUCTION = `OBJETIVO: ACTUAR COMO PROFESIONAL DE LA VOZ ARGENTINO (RIOPLATENSE).`;

export const VOICE_OPTIONS: VoiceOption[] = [
  // MASCULINOS (7)
  { 
    id: 'Charon', 
    displayName: 'Mariano', 
    gender: 'M', 
    description: 'Solidez y autoridad inquebrantable. Voz de noticias con credibilidad absoluta para mensajes que requieren liderazgo institucional.', 
    defaultStyle: VoiceStyle.NOTICIAS, 
    referenceScript: 'Servicio Informativo. El tránsito en los accesos registra demoras importantes en la Avenida General Paz.' 
  },
  { 
    id: 'Charon', 
    displayName: 'Santiago', 
    gender: 'M', 
    description: 'El sonido de la innovación. Voz ágil y tecnológica, perfecta para unboxing y marcas con un ritmo moderno y dicción impecable.', 
    defaultStyle: VoiceStyle.VERSATIL, 
    referenceScript: '¡Hola! Bienvenidos. Hoy les traigo un análisis exhaustivo de lo último en tecnología móvil.' 
  },
  { 
    id: 'Fenrir', 
    displayName: 'Facundo', 
    gender: 'M', 
    description: 'Estándar del lujo y distinción. Una voz que respira solidez y prestigio, diseñada para marcas de alta gama y autoridad absoluta.', 
    defaultStyle: VoiceStyle.EPICA, 
    referenceScript: 'El estándar internacional del lujo moderno para tu marca, proyectando seguridad absoluta.' 
  },
  { 
    id: 'Charon', 
    displayName: 'Mateo', 
    gender: 'M', 
    description: 'Narración cálida y envolvente. Ideal para documentales y e-learning, generando un clima de confianza y aprendizaje único.', 
    defaultStyle: VoiceStyle.VERSATIL, 
    referenceScript: 'La estepa patagónica es el hogar de especies únicas que han desafiado el tiempo.' 
  },
  { 
    id: 'Charon', 
    displayName: 'Bautista', 
    gender: 'M', 
    description: 'Voz Cálida. Proyecta empatía, cercanía y un tono amable con peso, ideal para mensajes humanos, sinceros y spots institucionales.', 
    defaultStyle: VoiceStyle.URBANA, 
    referenceScript: 'Bienvenidos. Hoy les quiero contar una historia de esfuerzo y dedicación constante.' 
  },
  { 
    id: 'Fenrir', 
    displayName: 'Horacio', 
    gender: 'M', 
    description: 'Comercial Adulto. Voz grave con peso y tono cotidiano que evoca trayectoria, sabiduría y confianza absoluta en cada palabra.', 
    defaultStyle: VoiceStyle.EPICA, 
    referenceScript: 'Hay momentos que merecen ser contados con la pausa y el respeto que el tiempo les otorga.' 
  },
  { 
    id: 'Puck', 
    displayName: 'Tomás', 
    gender: 'M', 
    description: 'Voz joven y enérgica. Motivador nato para ofertas y eventos que requieren dinamismo, frescura e impacto positivo inmediato.', 
    defaultStyle: VoiceStyle.URBANA, 
    referenceScript: '¡Vení ya! Solo por hoy, aprovechá las mejores ofertas en tecnología y accesorios.' 
  },

  // FEMENINOS (7)
  { 
    id: 'Zephyr', 
    displayName: 'Lucía', 
    gender: 'F', 
    description: 'La estrella de las mañanas de FM. Energía ascendente y un brillo vocal contagioso que ilumina cualquier tanda publicitaria.', 
    defaultStyle: VoiceStyle.VERSATIL, 
    referenceScript: '¡Muy pero muy buenos días! Arriba esa energía que arranca el programa más escuchado.' 
  },
  { 
    id: 'Kore', 
    displayName: 'Juana', 
    gender: 'F', 
    description: 'Publicidad Empática. Voz cercana que conecta desde la emoción genuina, ideal para mensajes que requieren calidez y honestidad.', 
    defaultStyle: VoiceStyle.ENERGETICA, 
    referenceScript: 'Te entiendo perfectamente porque a mí me pasó lo mismo. Hoy te traigo una solución real.' 
  },
  { 
    id: 'Zephyr', 
    displayName: 'Micaela', 
    gender: 'F', 
    description: 'Precisión técnica y profesionalismo. Voz corporativa definitiva con claridad absoluta para manuales sonoros y capacitaciones.', 
    defaultStyle: VoiceStyle.VERSATIL, 
    referenceScript: 'Para configurar su nuevo dispositivo, por favor siga los pasos descritos en la pantalla.' 
  },
  { 
    id: 'Zephyr', 
    displayName: 'Camila', 
    gender: 'F', 
    description: 'Sofisticación refinada. Maneja los matices de la dulzura como nadie, siendo la voz ideal para cosmética de lujo y bienestar.', 
    defaultStyle: VoiceStyle.SENSUAL, 
    referenceScript: 'Dejá que el aroma te envuelva por completo. Sentí la suavidad que tu piel siempre mereció.' 
  },
  { 
    id: 'Kore', 
    displayName: 'Martina', 
    gender: 'F', 
    description: 'Voz influencer nativa. Habla el lenguaje de hoy: rápido y descontracturado, perfecto para Reels, TikTok y contenidos virales.', 
    defaultStyle: VoiceStyle.URBANA, 
    referenceScript: '¡Hola chicos! No saben lo que es este lugar, me volví loca. Tienen que venir sí o sí.' 
  },
  { 
    id: 'Kore', 
    displayName: 'Paula', 
    gender: 'F', 
    description: 'La fuerza de la oferta. Ataque brillante diseñado para destacar promociones, liquidaciones y avisos de impacto inmediato.', 
    defaultStyle: VoiceStyle.ENERGETICA, 
    referenceScript: '¡Atención! Liquidamos todo el stock al costo. ¡Vení antes de que se agote!' 
  },
  { 
    id: 'Zephyr', 
    displayName: 'Clara', 
    gender: 'F', 
    description: 'Voz sensual y global. El sonido de las grandes marcas internacionales con una elegancia pura y presencia premium refinada.', 
    defaultStyle: VoiceStyle.SENSUAL, 
    referenceScript: 'Elegancia pura en cada palabra. El estándar internacional del lujo moderno para tu marca.' 
  }
];

export const VOICE_STYLES: Record<VoiceStyle, string> = {
  [VoiceStyle.NOTICIAS]: 'Informativo / Radio',
  [VoiceStyle.URBANA]: 'Narración / Podcast',
  [VoiceStyle.EPICA]: 'Cine / Tráiler',
  [VoiceStyle.ENERGETICA]: 'Venta / Promo',
  [VoiceStyle.SENSUAL]: 'Lujo / Bienestar',
  [VoiceStyle.VERSATIL]: 'FM / Podcast'
};
