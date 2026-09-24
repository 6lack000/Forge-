import fs from "fs";
import path from "path";

import type { CodebaseContext } from "./manager.js";
import { getRelevantFiles } from "./manager.js";

export function retrieveContext(
  context: CodebaseContext,
  rootPath: string,
  query: string
): string {
  const queryWords = query
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 2);

  const scoredFiles = context.files
    .map((file) => {
      const fullPath = path.join(rootPath, file);

      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        const lowerContent = content.toLowerCase();
        const lowerFile = file.toLowerCase();

        let score = 0;

        for (const word of queryWords) {
          if (lowerFile.includes(word)) {
            score += 10;
          }

          if (lowerContent.includes(word)) {
            score += 2;
          }
        }

        return {
          file,
          score,
        };
      } catch {
        return {
          file,
          score: 0,
        };
      }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const relevantFiles = new Set<string>();

  for (const result of scoredFiles) {
    const files = getRelevantFiles(context, result.file);

    for (const relevantFile of files) {
      relevantFiles.add(relevantFile);
    }
  }

  return Array.from(relevantFiles)
    .map((file) => {
      const fullPath = path.join(rootPath, file);
      const content = fs.readFileSync(fullPath, "utf-8");

      return `FILE: ${file}\n\n${content}`;
    })
    .join("\n\n---\n\n");
}