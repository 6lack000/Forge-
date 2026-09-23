import { readFile } from "./read-file.js";
import { writeFile } from "./write-file.js";
import type { ToolFunction } from "./types.js";
import { listFiles } from "./list-files.js";
import { searchCode } from "./search-code.js";
import { runCommand } from "./run-command.js";
import { gitStatus } from "./git-status.js";

export const toolRegistry: Record<string, ToolFunction> = {
  read_file: readFile,
  write_file: writeFile,
  list_files: listFiles,
  search_code: searchCode,
  run_command: runCommand,
  git_status: gitStatus,
};