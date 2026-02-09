
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTaskBreakdown = async (mainTask: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Break down the following academic task into 5 manageable sub-tasks for a student: "${mainTask}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating breakdown:", error);
    return null;
  }
};

export const chatWithAssistant = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are FOCUS AI, a helpful academic companion. You help students organize tasks, manage time, and provide encouragement. Keep responses brief, friendly, and structured."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error chatting with assistant:", error);
    return "I'm having trouble connecting right now. Let's try again in a moment!";
  }
};
