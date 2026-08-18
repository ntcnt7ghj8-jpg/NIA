import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST required" });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No messages provided" });
    }

    const recent = messages.slice(-20);

    const prompt = recent
      .map(m => `${m.role === "user" ? "User" : "NIA"}: ${m.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
      contents: prompt
    });

    return res.status(200).json({
      reply: response.text || "I couldn't generate a response."
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Gemini request failed"
    });
  }
}