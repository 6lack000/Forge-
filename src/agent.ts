import { askLLM } from "./llm.js";

import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { executeTool } from "./tools/executor.js";


export async function runAgent(prompt: string) {
const messages: ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: prompt,
    },
  ];

  while (true) {
    const message = await askLLM(messages);

    
    if (!message.tool_calls) {
      console.log(message.content);
      break;
    }

    
    messages.push(message);

    
    for (const toolCall of message.tool_calls) {
      console.log("Executing tools...");

      const result = executeTool(toolCall);

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: result,
      });
    }
  }
}