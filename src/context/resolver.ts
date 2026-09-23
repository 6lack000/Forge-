import fs from "fs";
import path from "path";

export function resolveImport(
  rootPath: string,
  currentFile: string,
  importPath: string
): string | null {
  if (!importPath.startsWith(".")) {
    return null;
  }

  const currentDirectory = path.dirname(
    path.join(rootPath, currentFile)
  );

  const basePath = path.resolve(
    currentDirectory,
    importPath
  );


const extensions = [".ts", ".tsx", ".js", ".jsx"];

const possiblePaths = [
  basePath,
  ...extensions.map((extension) => {
    if (basePath.endsWith(".js")) {
      return basePath.slice(0, -3) + extension;
    }

    return basePath + extension;
  }),
];


  for (const possiblePath of possiblePaths) {
    console.log(
      "Checking:",
      possiblePath,
      fs.existsSync(possiblePath)
    );

    if (fs.existsSync(possiblePath)) {
      return path.relative(rootPath, possiblePath);
    }
  }

  return null;
}
const rootPath = process.cwd();

const result = resolveImport(
  rootPath,
  "src/agent.ts",
  "./tools/executor.js"
);

console.log(result);