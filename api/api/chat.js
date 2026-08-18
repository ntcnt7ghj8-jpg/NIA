import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
M
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST requests only." });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No message was supplied." });
    }

    const conversation = messages
      .map((m) => `${m.role === "assistant" ? "NIA" : "User"}: ${m.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversation,
      config: {
        systemInstruction:
          "You are NIA, a helpful and friendly AI chat bot. " +
          "Answer naturally and clearly. Keep replies reasonably concise.",
      },
    });

    return res.status(200).json({
      reply: response.text || "I couldn't generate a reply.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "The AI service could not respond.",
    });
  }
}
