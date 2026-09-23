import { execSync } from "child_process";
import type { ToolArgs } from "./types.js";

export function gitStatus(_args: ToolArgs): string {
  try {
    return (
      execSync("git status --short", {
        encoding: "utf-8",
        stdio: "pipe",
        cwd: process.cwd(),
      }) || "Working tree clean."
    );
  } catch (error) {
    return `Git status failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}