import { execSync } from "child_process";
import type { ToolArgs } from "./types.js";

export function gitBranch(_args: ToolArgs): string {
  try {
    return (
      execSync("git branch --show-current", {
        encoding: "utf-8",
        stdio: "pipe",
        cwd: process.cwd(),
      }).trim() || "No current branch found."
    );
  } catch (error) {
    return `Git branch failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}