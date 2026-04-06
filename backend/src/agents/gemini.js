import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function routeQuery(query) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: `
You are a router for an AI assistant.

Determine if the user query is:
1. Normal chat
2. Gmail action
3. Other Action(like Media Geneartion)

If Gmail action, extract intent.

Possible Gmail intents:
- read_email
- send_email
- draft_email

Return JSON only.

Schema:
{
  "route": "chat | gmail_agent | other_action",
  "intent": "optional",
  "entities": {
    "to": "optional",
    "topic": "optional"
  }
}

User query: "${query}"
`,

    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  return JSON.parse(response.candidates[0].content.parts[0].text);
}

async function chatQuery(query) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: `
You are an AI assistant.

Answer in brief until asked in detail.
Return JSON only.
Ensure formatted string reply.

Schema:
{
  "body": "your reply"
}

User query: "${query}"
`,

    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  return JSON.parse(response.candidates[0].content.parts[0].text);
}

async function draftMail(query) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: `
You are a professional email writer.

Write a clear and well-structured email based on the user's request.

Return JSON only.

Schema:
{
  "to": "recipient email address",
  "subject": "email subject",
  "body": "complete email body"
}

Guidelines:
- Make the email polite and professional.
- Add greeting and closing.
- Infer subject if not given.
- Do not include anything outside JSON.

User request: "${query}"
`,

    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  return JSON.parse(response.candidates[0].content.parts[0].text);
}


export { routeQuery, chatQuery, draftMail };
