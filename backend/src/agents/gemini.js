import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function funX() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "india in 2024",
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log("Gemini API response:", response.text);
}

export { funX };