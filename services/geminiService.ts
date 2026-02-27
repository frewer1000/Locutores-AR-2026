
import { GoogleGenAI, Modality } from "@google/genai";
import { VoiceStyle } from "../types.ts";
import { SYSTEM_INSTRUCTION, VOICE_OPTIONS } from "../constants.tsx";

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateArgentineVoiceover(
  text: string, 
  style: VoiceStyle, 
  voiceName: string = 'Kore',
  speed: number = 1.0,
  gender: 'M' | 'F' = 'M',
  talentDisplayName: string = '',
  attempt: number = 1
): Promise<AudioBuffer> {
  if (!process.env.API_KEY) throw new Error("API_KEY no detectada.");

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const talentInfo = VOICE_OPTIONS.find(v => v.displayName === talentDisplayName);

  // BLINDAJE DE GÉNERO NIVEL 2 (CAMALEÓNICO)
  // Estas instrucciones son órdenes directas al sintetizador neural
  const genderDirectives = gender === 'F' 
    ? "DIRECTIVA DE IDENTIDAD TTS: Voz FEMENINA absoluta. Rango de frecuencia: 200Hz - 350Hz (Agudo). Resonancia frontal. PROHIBIDO registros graves o masculinos. La voz debe ser dulce, clara y brillantemente femenina. Cualquier rastro de voz de hombre es un error crítico. SOS UNA MUJER."
    : "DIRECTIVA DE IDENTIDAD TTS: Voz MASCULINA. Rango de frecuencia: 80Hz - 160Hz (Varonil). SOS UN HOMBRE.";

  const talentArchetypes: Record<string, string> = {
    'Lucía': "PERFIL: Lucía, conductora de FM. Voz femenina brillante, aguda, con mucha 'sonrisa fonética'.",
    'Sofía': "PERFIL: Sofía, ancla de noticias. Voz femenina profesional, segura, de tono medio-agudo impecable.",
    'Valentina': "PERFIL: Valentina, locutora joven. Voz femenina muy aguda, fresca, juvenil y súper alegre.",
    'Clara': "PERFIL: Clara, institucional. Voz femenina sólida, madura pero refinada y claramente mujer."
  };

  const styleInstructions = {
    [VoiceStyle.NOTICIAS]: "INTENCIÓN: Flash informativo. Dicción metálica, rítmica y autoritaria.",
    [VoiceStyle.URBANA]: "INTENCIÓN: Charla cotidiana. Fluidez humana irregular, nada de robot.",
    [VoiceStyle.EPICA]: "INTENCIÓN: Tráiler de cine. Profundidad, tensión y pausas dramáticas.",
    [VoiceStyle.ENERGETICA]: "INTENCIÓN: Venta comercial agresiva. ¡Energía al 100%!",
    [VoiceStyle.SENSUAL]: "INTENCIÓN: Dulzura extrema. Voz melosa, cálida y muy cercana.",
    [VoiceStyle.VERSATIL]: "INTENCIÓN: Locución FM profesional. Aire de mañana brillante."
  };

  const currentArchetype = talentArchetypes[talentDisplayName] || 
    (talentInfo ? `PERFIL ${talentDisplayName.toUpperCase()}: ${talentInfo.description}` : "Locutor/a profesional.");

  const fullPrompt = `${genderDirectives}
${currentArchetype}
${SYSTEM_INSTRUCTION}

ACTUACIÓN:
${styleInstructions[style]}
FLUIDEZ: 100% HUMANA. Usá entonación natural argentina (voseo rioplatense).
GÉNERO: ${gender === 'F' ? 'MUJER (INDISCUTIBLE)' : 'HOMBRE'}

GUION A LOCUTAR:
"${text}"

IMPORTANTE: Devolvé solo el audio. La voz debe ser estable y no cambiar de género durante la locución.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("Error en la señal de audio.");

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBytes = decodeBase64(base64Audio);
    return await decodeAudioData(audioBytes, audioContext, 24000, 1);
  } catch (error: any) {
    const errorMsg = error.message || "";
    const isQuotaError = errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED');
    
    if (isQuotaError && attempt <= 3) {
      await sleep(2000 * attempt);
      return generateArgentineVoiceover(text, style, voiceName, speed, gender, talentDisplayName, attempt + 1);
    }
    throw new Error("No se pudo procesar el máster. Reintentá en un momento.");
  }
}

export async function audioBufferToBlob(buffer: AudioBuffer): Promise<Blob> {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bufferLength = buffer.length;
  const dataSize = bufferLength * numChannels * 2;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);
  
  const writeString = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);
  
  let offset = 44;
  for (let i = 0; i < bufferLength; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }
  return new Blob([arrayBuffer], { type: 'audio/wav' });
}
