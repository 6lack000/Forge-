import fs from "fs";
import type { ToolArgs } from "./types.js";

export function editFile(args: ToolArgs): string {
  const filePath = args.path as string;
  const oldText = args.old as string;
  const newText = args.new as string;

  if (!filePath) {
    return "Error: path is required";
  }

  if (!oldText) {
    return "Error: old text is required";
  }

  if (newText === undefined) {
    return "Error: new text is required";
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");

    if (!content.includes(oldText)) {
      return `Error: old text was not found in ${filePath}`;
    }

    const updatedContent = content.replace(oldText, newText);

    fs.writeFileSync(filePath, updatedContent, "utf-8");

    return `Successfully edited ${filePath}`;
  } catch (error) {
    return `Edit failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}