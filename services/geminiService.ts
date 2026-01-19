
import { GoogleGenAI, Type } from "@google/genai";
import { WasteCategory } from "../types";

const API_KEY = process.env.API_KEY;

export const identifyWasteViaAI = async (itemName: string) => {
  if (!API_KEY) {
    throw new Error("API Key not found. Please ensure it is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Classify the following waste item: "${itemName}".
    Identify its primary category from this list: Wet Waste, Dry Waste, E-Waste, Hazardous Waste, Sanitary Waste.
    Also provide a brief disposal tip.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: {
            type: Type.STRING,
            description: "The category of the waste item.",
            enum: Object.values(WasteCategory)
          },
          reason: {
            type: Type.STRING,
            description: "Short explanation for why it belongs in this category."
          },
          tip: {
            type: Type.STRING,
            description: "A quick disposal tip."
          }
        },
        required: ["category", "reason", "tip"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data;
  } catch (err) {
    console.error("Failed to parse AI response", err);
    return null;
  }
};
