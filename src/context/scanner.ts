import fs from "fs";
import path from "path";

const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  "dist",
  ".forge",
]);

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

export function scanProject(rootPath: string): string[] {
  const files: string[] = [];

  function scanDirectory(currentPath: string) {
    const entries = fs.readdirSync(currentPath, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (
        entry.isDirectory() &&
        ignoredDirectories.has(entry.name)
      ) {
        continue;
      }

      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
        continue;
      }

      const extension = path.extname(entry.name);

      if (!allowedExtensions.has(extension)) {
        continue;
      }

      const relativePath = path.relative(rootPath, fullPath);

      files.push(relativePath);
    }
  }

  scanDirectory(rootPath);

  return files;
}


export function saveContext(rootPath: string, files: string[]) {
  const forgeDirectory = path.join(rootPath, ".forge");

  fs.mkdirSync(forgeDirectory, {
    recursive: true,
  });

  const context = {
    files,
  };

  const contextPath = path.join(forgeDirectory, "context.json");

  fs.writeFileSync(
    contextPath,
    JSON.stringify(context, null, 2),
    "utf-8"
  );
}

