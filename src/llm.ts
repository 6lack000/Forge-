import OpenAI from "openai";
import "dotenv/config";
import { tools } from "./tools/index.js";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function askLLM(messages: any[]) {
  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages,
    tools,
  });

  const choice = response.choices[0];

  if (!choice) {
    throw new Error("LLM returned no choices");
  }

  return choice.message;
}