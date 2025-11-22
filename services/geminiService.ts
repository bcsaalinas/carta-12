import { GoogleGenAI } from "@google/genai";
import { CURRENT_CONCEPT } from '../constants';

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateConciergeResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "Sistema offline. La red está saturada. Intenta más tarde.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `
      Eres el "Host Digital" de Carta 12, el spot más hype de la Colonia Americana en Guadalajara.
      No eres un robot aburrido. Eres cool, misterioso y hablas como un local joven de GDL (usa palabras como "wey", "cool", "está fuego", "la neta").
      
      EL DROP DE ESTE MES:
      Concepto: ${CURRENT_CONCEPT.title}
      Vibe: ${CURRENT_CONCEPT.description}
      Historia: ${CURRENT_CONCEPT.story}
      
      MENÚ (Diles que se acaba rápido):
      ${CURRENT_CONCEPT.menu.map(d => `- ${d.name} ($${d.price}): ${d.description}`).join('\n')}
      
      Tu misión: Generar FOMO (Fear Of Missing Out). Responder dudas del menú pero siempre invitándolos a reservar ya porque "quedan pocos lugares".
      Mantén las respuestas cortas (max 40 palabras).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "El ruido no me deja escuchar. Repite eso.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Interferencia en la señal. Intenta de nuevo.";
  }
};