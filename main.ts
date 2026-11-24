import * as fs from "node:fs";
import * as path from "node:path";

const MAX_CHARS = 200;

const LINE =
  "My agent spent 40 minutes debugging a typo, then proudly fixed it by retyping the same typo.";

function validateLine(line: string): number {
  const chars = Array.from(line);
  if (chars.length === 0 || chars.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  return chars.length;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const count = validateLine(LINE);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
  console.error(`entry OK: ${count} characters, 1 line`);
}

main();
