import { execSync } from "child_process";
import type { ToolArgs } from "./types.js";

export function gitCommit(args: ToolArgs): string {
  const message = args.message as string;

  if (!message) {
    return "Error: commit message is required";
  }

  try {
    return execSync(`git commit -m ${JSON.stringify(message)}`, {
      encoding: "utf-8",
      stdio: "pipe",
      cwd: process.cwd(),
    });
  } catch (error) {
    return `Git commit failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}// git commit tool test
