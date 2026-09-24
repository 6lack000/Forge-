import { runAgent } from "./agent.js";
import {
  buildCodebaseContext,
  getDependents,
  getDependencies,
} from "./context/manager.js";


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

const codebaseContext = `
CODEBASE CONTEXT

Files:
${context.files.join("\n")}

Dependency Graph:
${JSON.stringify(context.graph, null, 2)}
`;

const prompt = process.argv.slice(2).join(" ");

await runAgent(
  `${codebaseContext}\n\nUSER REQUEST:\n${prompt}`
);