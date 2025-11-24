import { GoogleGenAI } from "@google/genai";

// Helper to safely get API key (simulated since we can't force env var in this demo structure)
// In production, this strictly comes from process.env.API_KEY
const getAIClient = () => {
  const apiKey = process.env.API_KEY || ''; 
  // Note: If no key is present, calls will fail, handled by try-catch in components.
  return new GoogleGenAI({ apiKey });
};

export const generateListingDescription = async (title: string, category: string, features: string) => {
  try {
    const ai = getAIClient();
    const prompt = `Write a compelling, short, and professional sales description for a ${category} listing titled "${title}". Key features: ${features}. Target audience: Ethiopians. Keep it under 50 words.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
