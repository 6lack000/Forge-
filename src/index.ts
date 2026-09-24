import { runAgent } from "./agent.js";
import {
  buildCodebaseContext,
  getDependents,
  getDependencies,
  getRelevantFiles,
  getRelevantContext,

} from "./context/manager.js";
import { retrieveContext } from "./context/retriever.js";


const rootPath = process.cwd();

const context = buildCodebaseContext(rootPath);

const dependencies = getDependencies(
  context,
  "src/agent.ts"
);

console.log("Dependencies of agent.ts:");
console.log(dependencies);

const dependents = getDependents(
  context,
  "src/tools/executor.ts"
);

console.log("Files that depend on executor.ts:");
console.log(dependents);

const relevantFiles = getRelevantFiles(
  context,
  "src/tools/executor.ts"
);

console.log("Relevant files:");
console.log(relevantFiles);

const relevantContext = getRelevantContext(
  context,
  rootPath,
  "src/tools/executor.ts"
);

console.log("Relevant context:");
console.log(relevantContext);

const prompt = process.argv.slice(2).join(" ");

const retrievedContext = retrieveContext(
  context,
  rootPath,
  prompt
);

console.log("Retrieved context:");
console.log(retrievedContext);

const codebaseContext = `
CODEBASE CONTEXT

Files:
${context.files.join("\n")}

Dependency Graph:
${JSON.stringify(context.graph, null, 2)}
`;



await runAgent(
  `${retrievedContext}\n\nUSER REQUEST:\n${prompt}`
);