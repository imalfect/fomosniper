// fancy ai-generated logging function
import chalk from "chalk";
import * as parse5 from "parse5";
// @ts-ignore
import type { ChildNode } from "parse5/dist/tree-adapters/default";
export enum LogType {
  Info = "blueBright",
  Error = "red",
  Warn = "yellow",
  Success = "green",
}
/**
 * An internal helper function to recursively traverse parse5 AST nodes
 * and apply chalk styling. This function is not exported.
 *
 * @param nodes - An array of ChildNode objects from parse5.
 * @returns A single string with all styling applied.
 */
function buildStyledOutput(nodes: ChildNode[]): string {
  let output = "";

  for (const node of nodes) {
    // This handles #text nodes (plain text)
    if ("value" in node) {
      output += node.value;
    }
    // This handles element nodes like <bold> and <green>
    else if ("tagName" in node) {
      const children = node.childNodes || [];
      switch (node.tagName) {
        case "bold":
          output += chalk.bold(buildStyledOutput(children));
          break;
        case "green":
          output += chalk.green(buildStyledOutput(children));
          break;
        // For any other tags, just process their children without adding styling
        default:
          if (
            node.tagName.startsWith("c_") &&
            chalk[node.tagName.slice(2) as keyof typeof chalk]
          ) {
            output += (
              chalk[node.tagName.slice(2) as keyof typeof chalk] as any
            )(buildStyledOutput(children));
          } else {
            output += buildStyledOutput(children);
          }
          break;
      }
    }
  }
  return output;
}

/**
 * Logs a message to the console, parsing it for custom styling tags.
 * It uses <bold> for bold text and <green> for green text.
 *
 * @param prefix - The prefix to display (e.g., 'INFO').
 * @param contentWithTags - The raw string content, which may contain custom tags.
 */
export function log(
  prefix: string,
  contentWithTags: string,
  logType?: LogType
): void {
  // 1. Parse the raw content string into an Abstract Syntax Tree (AST)
  const documentFragment = parse5.parseFragment(contentWithTags);

  // 2. Build the styled string by traversing the AST with our helper
  const styledContent = buildStyledOutput(documentFragment.childNodes);
  // 3. Log the final, styled output with its prefix
  console.log(
    `${chalk[logType ?? "blueBright"](`[${prefix}]`)}: ${styledContent}`
  );
}

export class Logger {
  private prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix;
  }
  info(message: string) {
    log(this.prefix, message, LogType.Info);
  }
  warn(message: string) {
    log(this.prefix, message, LogType.Warn);
  }
  error(message: string) {
    log(this.prefix, message, LogType.Error);
  }
  success(message: string) {
    log(this.prefix, message, LogType.Success);
  }
}
