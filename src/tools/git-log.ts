import { execSync } from "child_process";
import type { ToolArgs } from "./types.js";

export function gitLog(_args: ToolArgs): string {
  try {
    return (
      execSync("git log --oneline -10", {
        encoding: "utf-8",
        stdio: "pipe",
        cwd: process.cwd(),
      }) || "No commits found."
    );
  } catch (error) {
    return `Git log failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}