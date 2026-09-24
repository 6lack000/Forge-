import { scanProject, saveContext } from "./scanner.js";

import { buildIndex, saveIndex } from "./indexer.js";

import {
  buildDependencyGraph,
  saveGraph,
  findDependents,
} from "./graph.js";

export interface CodebaseContext {
  files: string[];
  graph: Record<string, string[]>;
}

export function buildCodebaseContext(
  rootPath: string
): CodebaseContext {

  const files = scanProject(rootPath);

  saveContext(rootPath, files);

  const index = buildIndex(rootPath, files);

  saveIndex(rootPath, index);

  const graph = buildDependencyGraph(index);

  saveGraph(rootPath, graph);

  return {
    files,
    graph,
  };
}

export function getDependents(
  context: CodebaseContext,
  file: string
): string[] {

  return findDependents(context.graph, file);
}

export function getDependencies(
  context: CodebaseContext,
  file: string
): string[] {

  return context.graph[file] ?? [];
}