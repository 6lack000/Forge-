import fs from "fs";
import path from "path";
import type { ToolArgs } from "./types.js";

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".html",
  ".md",
  ".txt",
]);


export function searchCode(args: ToolArgs): string {
  const query = args.query as string;
  const directory = (args.path as string) || ".";

  const results: string[] = [];

  function searchDirectory(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

    if (entry.isDirectory()) {
    if (
            entry.name === "node_modules" ||
            entry.name === ".git" ||
            entry.name === "dist"
    ) {
            continue;
    }

    searchDirectory(fullPath);
    continue;
    }

      const extension = path.extname(entry.name);

        if (!allowedExtensions.has(extension)) {
          continue;
        }

      const content = fs.readFileSync(fullPath, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(query.toLowerCase())) {
          results.push(`${fullPath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }

  searchDirectory(directory);

  return results.length > 0
    ? results.join("\n")
    : `No matches found for "${query}"`;
}
