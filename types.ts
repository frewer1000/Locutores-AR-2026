
export enum VoiceStyle {
  NOTICIAS = 'NOTICIAS',
  URBANA = 'URBANA',
  EPICA = 'EPICA',
  ENERGETICA = 'ENERGETICA',
  SENSUAL = 'SENSUAL',
  VERSATIL = 'VERSATIL'
}

export interface VoiceOption {
  id: string; // El ID técnico del modelo (Kore, Puck, etc)
  displayName: string; // El nombre argentino
  gender: 'M' | 'F';
  referenceScript: string; 
  description: string; 
  defaultStyle: VoiceStyle; 
}

export interface AudioGenerationState {
  isGenerating: boolean;
  error: string | null;
  audioUrl: string | null;
}

export interface RestorationPoint {
  id: string;
  timestamp: number;
  script: string;
  style: VoiceStyle;
  voiceName: string;
  gender: 'M' | 'F';
  speed: number;
}

export interface DemoVoice {
  id: string;
  title: string;
  subtitle: string;
  script: string;
  style: VoiceStyle;
}
