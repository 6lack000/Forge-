import fs from "fs";
import path from "path";
import { resolveImport } from "./resolver.js";

export interface FileIndex {
  path: string;
  imports: string[];
  exports: string[];
  dependencies: string[];
}

export function indexFile(
  rootPath: string,
  relativePath: string
): FileIndex {
  const fullPath = path.join(rootPath, relativePath);

  const content = fs.readFileSync(fullPath, "utf-8");

  const imports: string[] = [];
  const exports: string[] = [];
  const dependencies: string[] = [];

  const importRegex =
    /import\s+(?:.*?\s+from\s+)?["'](.+?)["']/g;

  const exportRegex =
    /export\s+(?:async\s+)?(?:function|const|let|var|class|type|interface)\s+(\w+)/g;

  let match;

  while ((match = importRegex.exec(content)) !== null) {
    if (match[1]) {
      imports.push(match[1]);

      const resolved = resolveImport(
        rootPath,
        relativePath,
        match[1]
      );

      if (resolved) {
        dependencies.push(resolved);
      }
    }
  }

  while ((match = exportRegex.exec(content)) !== null) {
    if (match[1]) {
      exports.push(match[1]);
    }
  }

  return {
    path: relativePath,
    imports,
    exports,
    dependencies,
  };
}

export function buildIndex(
  rootPath: string,
  files: string[]
): FileIndex[] {
  return files.map((file) => indexFile(rootPath, file));
}
    
export function saveIndex(
  rootPath: string,
  index: FileIndex[]
) {
  const forgeDirectory = path.join(rootPath, ".forge");

  fs.mkdirSync(forgeDirectory, {
    recursive: true,
  });

  const indexPath = path.join(
    forgeDirectory,
    "index.json"
  );

  fs.writeFileSync(
    indexPath,
    JSON.stringify(index, null, 2),
    "utf-8"
  );
}