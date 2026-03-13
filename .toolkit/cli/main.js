import { checkbox } from "@inquirer/prompts";
import { spawn } from "child_process";

function runClaude(prompt) {
  return new Promise((resolve, reject) => {
    console.log("🚀 Start running Claude...");

    const startTime = Date.now();

    const proc = spawn("claude", ["-p", prompt], {
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let output = "";

    // timer hiển thị thời gian
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      process.stdout.write(`⏳ Running... ${elapsed}s\r`);
    }, 1000);

    proc.stdout.on("data", (data) => {
      output += data.toString();
    });

    proc.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    proc.on("close", (code) => {
      clearInterval(timer);

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

      if (code === 0) {
        console.log(`\n✅ Claude finished in ${elapsed}s`);
        resolve(output);
      } else {
        reject("Process failed");
      }
    });
  });
}

async function main() {
  const answer = await checkbox({
    message: "Select the stages of software development you want to include:",
    choices: [
      {
        name: "rd",
        value: "rd",
        description: "Requement Document",
      },
      {
        name: "bd",
        value: "bd",
        description: "Basic Design",
      },
      {
        name: "dd",
        value: "dd",
        description: "Detailed Design",
      },
      {
        name: "code",
        value: "code",
        description: "Code Implementation",
      },
      {
        name: "test",
        value: "test",
        description: "Testing",
      },
    ],
  });

  if (answer.length === 0) {
    console.log("No options selected.");
    return;
  }

  console.log("Selected stages:", answer);

  const result = await runClaude("Hello");

  console.log(result);
}

main();
