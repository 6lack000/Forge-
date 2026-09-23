import fs from "fs";
import type { ToolArgs } from "./types.js";

export function writeFile(args: ToolArgs): string {
  fs.writeFileSync(
    args.path as string,
    args.content as string,
    "utf-8"
  );

  return `Successfully wrote to ${args.path}`;
}