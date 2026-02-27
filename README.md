
# 🎙️ Locutores.ar AI - Aire de Primera

Plataforma de locución profesional impulsada por Inteligencia Artificial (**Google Gemini 2.5 Flash**) diseñada específicamente para el mercado argentino. Genera voces naturales con acento rioplatense real en segundos.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

## ✨ Características Principales

- **Acento Rioplatense Real**: Dominio del voseo ("vos", "vení", "querés") y rehilamiento (sh) de la 'y' y 'll'.
- **Múltiples Estilos de Interpretación**:
  - `NOTICIAS`: Flash informativo de radio, alta velocidad y autoridad.
  - `EPICA`: Estilo tráiler de cine, profundo y pausado.
  - `URBANA`: Charla cotidiana, estilo audio de WhatsApp.
  - `ENERGETICA`: Venta agresiva para spots publicitarios.
  - `SENSUAL`: Cercanía, calidez y complicidad.
  - `VERSATIL`: Estilo FM Prime Time.
- **Control de Velocidad**: Ajuste dinámico del ritmo de lectura (0.5x a 2.0x).
- **Banco de Voces**: Amplia selección de talentos masculinos y femeninos (Santiago, Lucía, Joaquín, Martina, etc.).
- **Estudio de Grabación Profesional**: Interfaz intuitiva con previsualización en tiempo real y descarga en alta calidad (.wav).

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript.
- **Estilos**: Tailwind CSS con estética *Glassmorphism*.
- **IA/TTS**: Google GenAI SDK (@google/genai) utilizando el modelo `gemini-2.5-flash-preview-tts`.
- **Audio**: Web Audio API para procesamiento y codificación de audio en el navegador.

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/locuciones-ar.git
   cd locuciones-ar
   ```

2. **Configurar la API Key**:
   El proyecto requiere una API Key de Google AI Studio. Asegúrate de configurar la variable de entorno:
   ```env
   API_KEY=tu_google_gemini_api_key
   ```

3. **Ejecutar el proyecto**:
   Este proyecto utiliza módulos ES nativos. Puedes servirlo con cualquier servidor estático o herramientas como Vite/Live Server.

## 🇦🇷 Identidad del Proyecto

A diferencia de otras soluciones de Text-to-Speech, este proyecto utiliza prompts de sistema altamente refinados para forzar a la IA a interpretar como un locutor nacional de Argentina, eliminando el tono neutro o robótico característico de las voces sintéticas tradicionales.

---
© 2026 Locutores.ar AI. Hecho con ❤️ en Buenos Aires.
