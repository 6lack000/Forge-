import { execSync } from "child_process";
import type { ToolArgs } from "./types.js";

export function gitDiff(_args: ToolArgs): string {
  try {
    return (
      execSync("git diff", {
        encoding: "utf-8",
        stdio: "pipe",
        cwd: process.cwd(),
      }) || "No changes found."
    );
  } catch (error) {
    return `Git diff failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}