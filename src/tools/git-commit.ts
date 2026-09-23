import { execSync } from "child_process";
import type { ToolArgs } from "./types.js";

export function gitCommit(args: ToolArgs): string {
  const message = args.message as string;
  const files = args.files as string[];

  if (!message) {
    return "Error: commit message is required";
  }

  if (!Array.isArray(files) || files.length === 0) {
    return "Error: at least one file is required";
  }

  try {
    const fileArgs = files.map((file) => JSON.stringify(file)).join(" ");

    execSync(`git add ${fileArgs}`, {
      encoding: "utf-8",
      stdio: "pipe",
      cwd: process.cwd(),
    });

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
}