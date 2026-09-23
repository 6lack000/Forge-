import fs from "fs";
import path from "path";
import type { FileIndex } from "./indexer.js";


export interface DependencyGraph {
  [filePath: string]: string[];
}

export function buildDependencyGraph(
  index: FileIndex[]
): DependencyGraph {
  const graph: DependencyGraph = {};

  for (const file of index) {
    graph[file.path] = file.dependencies;
  }

  return graph;
}

export function findDependents(
  graph: DependencyGraph,
  targetFile: string
): string[] {
  const dependents: string[] = [];

  for (const [file, dependencies] of Object.entries(graph)) {
    if (dependencies.includes(targetFile)) {
      dependents.push(file);
    }
  }

  return dependents;
}

export function saveGraph(
  rootPath: string,
  graph: DependencyGraph
) {
  const forgeDirectory = path.join(rootPath, ".forge");

  fs.mkdirSync(forgeDirectory, {
    recursive: true,
  });

  const graphPath = path.join(
    forgeDirectory,
    "graph.json"
  );

  fs.writeFileSync(
    graphPath,
    JSON.stringify(graph, null, 2),
    "utf-8"
  );
}