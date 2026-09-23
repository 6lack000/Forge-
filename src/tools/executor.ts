import type { ChatCompletionMessageToolCall } from "openai/resources/chat/completions";
import { toolRegistry } from "./registry.js";

export function executeTool(
  toolCall: ChatCompletionMessageToolCall
): string {
  if (toolCall.type !== "function") {
    throw new Error(`Unsupported tool type: ${toolCall.type}`);
  }

  const toolName = toolCall.function.name;
  const args = JSON.parse(toolCall.function.arguments);

  const tool = toolRegistry[toolName];

  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  try {
    return tool(args);
  } catch (error) {
    return `Tool execution failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}