import { runAgent } from "./agent.js";
import { scanProject, saveContext } from "./context/scanner.js";
import {
  buildIndex,
  saveIndex,
} from "./context/indexer.js";
import {
  buildDependencyGraph,
  saveGraph,
} from "./context/graph.js";
import { findDependents } from "./context/graph.js";


const rootPath = process.cwd();

const files = scanProject(rootPath);

saveContext(rootPath, files);

const index = buildIndex(rootPath, files);

saveIndex(rootPath, index);

const graph = buildDependencyGraph(index);

const dependents = findDependents(
  graph,
  "src/tools/executor.ts"
);

console.log("Dependents of executor.ts:");
console.log(dependents);

saveGraph(rootPath, graph);

console.log("Dependency graph:");

console.log(JSON.stringify(graph, null, 2));

console.log(`Indexed ${files.length} files.`);

const prompt = process.argv.slice(2).join(" ");

await runAgent(prompt);

