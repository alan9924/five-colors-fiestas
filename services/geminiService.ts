
import { GoogleGenAI, Type } from "@google/genai";

export const generatePartyPlan = async (ageGroup: string, theme: string): Promise<any> => {
  const fallbackData = {
      activities: [
        "Bienvenida Mágica con burbujas",
        "Juego de las estatuas musicales",
        "Show de títeres temático",
        "Piñata sorpresa"
      ],
      tips: "Asegúrate de tener una lista de reproducción animada y premios pequeños para todos los participantes."
  };

  // Obtaining API key exclusively from process.env.API_KEY
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Using fallback data.");
    return fallbackData;
  }

  try {
    // Initializing with named parameter as required by @google/genai guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Using gemini-3-flash-preview for basic text task as per guidelines
    const model = "gemini-3-flash-preview";
    const prompt = `Actúa como un planificador de fiestas infantiles experto. Genera un plan breve y divertido para una fiesta de cumpleaños.
    Edad de los niños: ${ageGroup}.
    Temática: ${theme}.
    
    Devuelve un JSON con dos claves: 
    1. 'activities': un array de strings con 4 actividades específicas y divertidas.
    2. 'tips': un consejo breve para los padres.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            activities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            tips: { type: Type.STRING }
          },
          required: ["activities", "tips"]
        }
      }
    });

    // Accessing text as a property
    const text = response.text;
    if (!text) return fallbackData;
    
    // Robust JSON parsing
    try {
        return JSON.parse(text);
    } catch (e) {
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
            const jsonStr = text.substring(start, end + 1);
            return JSON.parse(jsonStr);
        }
        return fallbackData;
    }

  } catch (error) {
    console.error("Error generating plan:", error);
    return fallbackData;
  }
};
