import fs from "fs";
import type { ToolArgs } from "./types.js";

export function readFile(args: ToolArgs): string {
  return fs.readFileSync(args.path as string, "utf-8");
}``