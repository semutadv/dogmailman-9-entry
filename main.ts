// The Dog Reviews the Mailman — entry program.
// One review of the mailman, written by the dog, stored in entry.txt.
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DOG_REVIEW =
  "One star for the mailman: smells like other people's houses, rings the bell like he owns it, and has never once brought me a single treat.";

function dogOutDir(): string {
  const env = process.env.OUTPUT_DIR;
  if (env && env.trim() !== "") return env;
  return "/output";
}

function vacateDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    return;
  }
  for (const leaf of readdirSync(dir)) {
    rmSync(join(dir, leaf), { recursive: true, force: true });
  }
}

const yardDir = dogOutDir();
vacateDir(yardDir);
writeFileSync(join(yardDir, "entry.txt"), DOG_REVIEW + "\n", "utf8");
console.log("dog review filed:", DOG_REVIEW.length, "characters");
