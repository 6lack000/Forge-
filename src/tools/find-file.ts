import fs from "fs";
import path from "path";
import type { ToolArgs } from "./types.js";

/**
 * Find files matching a regular expression pattern.
 *
 * @param args - Object containing:
 *   - pattern: The regex pattern string used to match filenames.
 *   - path (optional): The directory to start searching from. Defaults to the current working directory.
 *
 * @returns A newline‑separated list of matching file paths or a message indicating no matches.
 */
export function findFile(args: ToolArgs): string {
  const patternStr = args.pattern as string;
  const root = (args.path as string) || ".";

  // Validate that pattern is a valid regex.
  let regex: RegExp;
  try {
    regex = new RegExp(patternStr);
  } catch (e) {
    return `Invalid regular expression: ${patternStr}`;
  }

  const results: string[] = [];

  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        // Skip common large directories.
        if (
          entry.name === "node_modules" ||
          entry.name === ".git" ||
          entry.name === "dist"
        ) {
          continue;
        }
        walk(fullPath);
      } else {
        if (regex.test(entry.name)) {
          results.push(fullPath);
        }
      }
    }
  }

  walk(root);

  return results.length > 0
    ? results.join("\n")
    : `No files match pattern "${patternStr}"`;
}
