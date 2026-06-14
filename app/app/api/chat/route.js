import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  const { message } = await req.json();

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are Procudan, a powerful multilingual AI assistant. " +
          "You understand all languages and always respond in the same language as the user."
      },
      { role: "user", content: message }
    ]
  });

  return Response.json({
    reply: response.choices[0].message.content
  });
}
