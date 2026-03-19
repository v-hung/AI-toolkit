import { runClaude } from "./ai/claude.js";
import { collectProjectInfo } from "./prompts/collectProjectInfo.js";

async function main() {
  const answer = await collectProjectInfo();

  if (answer.length === 0) {
    console.log("No options selected.");
    return;
  }

  console.log("Selected stages:", answer);

  const result = await runClaude("Hello");

  console.log(result);
}

main();
