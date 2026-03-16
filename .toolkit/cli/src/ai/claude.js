import { spawn } from "child_process";

export function runClaude(prompt) {
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
