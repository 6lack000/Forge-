import fs from "fs";
import type { ToolArgs } from "./types.js";

export function listFiles(args: ToolArgs): string {
  const path = (args.path as string) || ".";

  return fs.readdirSync(path).join("\n");
}