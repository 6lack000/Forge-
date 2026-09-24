import fs from "fs";
import path from "path";

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

export function getRelevantFiles(
  context: CodebaseContext,
  file: string
): string[] {
  const dependencies = getDependencies(context, file);
  const dependents = getDependents(context, file);

  return [
    file,
    ...dependencies,
    ...dependents,
  ];
}

export function getRelevantContext(
  context: CodebaseContext,
  rootPath: string,
  file: string
): string {
  const relevantFiles = getRelevantFiles(context, file);

  return relevantFiles
    .map((relativePath) => {
      const fullPath = path.join(rootPath, relativePath);
      const content = fs.readFileSync(fullPath, "utf-8");

      return `FILE: ${relativePath}\n\n${content}`;
    })
    .join("\n\n---\n\n");
}