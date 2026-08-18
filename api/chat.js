import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST requests only." });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No message was supplied." });
    }

    const response = await client.responses.create({
      model: "gpt-5.6",
      instructions:
        "You are NIA, a helpful and friendly AI chat bot. " +
        "Answer naturally and clearly. Keep replies reasonably concise.",
      input: messages,
    });

    return res.status(200).json({
      reply: response.output_text || "I couldn't generate a reply.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "The AI service could not respond.",
    });
  }
}
