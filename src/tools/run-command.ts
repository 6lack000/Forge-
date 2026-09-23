import { execSync } from "child_process";
import type { ToolArgs } from "./types.js";

export function runCommand(args: ToolArgs): string {
  const command = args.command as string;

  if (!command) {
    return "Error: command is required";
  }

  try {
    const output = execSync(command, {
      encoding: "utf-8",
      stdio: "pipe",
      cwd: process.cwd(),
    });

    return output || "Command executed successfully with no output.";
  } catch (error) {
    if (error && typeof error === "object" && "stdout" in error) {
      const stdout = String(error.stdout ?? "");
      const stderr =
        "stderr" in error ? String(error.stderr ?? "") : "";

      return `Command failed.\n\nSTDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`;
    }

    return `Command execution failed: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}