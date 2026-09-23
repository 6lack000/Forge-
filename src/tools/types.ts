export type ToolArgs = Record<string, unknown>;

export type ToolFunction = (args: ToolArgs) => string;