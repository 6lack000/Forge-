
import type { ChatCompletionTool } from "openai/resources/chat/completions";


export const tools: ChatCompletionTool[]  = [
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read a file from the current project.",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Path of the file to read",
          },
        },
        required: ["path"],
      },
    },
  },
    {
    type: "function",
    function: {
        name: "write_file",
        description: "Write content to a file in the current project.",
        parameters: {
        type: "object",
        properties: {
            path: {
            type: "string",
            description: "Path of the file to write",
            },
            content: {
            type: "string",
            description: "Content to write into the file",
            },
        },
        required: ["path", "content"],
        },
        },
    },  
    {
  type: "function",
  function: {
    name: "list_files",
    description: "List files and directories inside a directory.",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Path of the directory to list",
        },
      },
      required: ["path"],
    },
  },
},
{
  type: "function",
  function: {
    name: "search_code",
    description: "Search for text inside files in the project.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Text to search for",
        },
        path: {
          type: "string",
          description: "Directory to search inside",
        },
      },
      required: ["query", "path"],
    },
  },
},

{
  type: "function",
  function: {
    name: "run_command",
    description: "Execute a shell command in the current project directory.",
    parameters: {
      type: "object",
      properties: {
        command: {
          type: "string",
          description: "The shell command to execute.",
        },
      },
      required: ["command"],
    },
  },
},


];