import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export const runCode = (code) => {
  return new Promise((resolve) => {
    try {
      // 1. Absolute path
      const dir = path.resolve("../docker-executor"); // 👈 IMPORTANT CHANGE
      const filePath = path.join(dir, "script.js");

      console.log("DIR:", dir);
      console.log("FILE:", filePath);

      // 2. Ensure folder exists
      fs.mkdirSync(dir, { recursive: true });

      // 3. Write code
      fs.writeFileSync(filePath, code, "utf-8");

      // 4. Docker command args
      const args = [
        "run",
        "--rm",
        "-v",
        `${dir}:/app`,
        "-w",
        "/app",
        "node:18",
        "node",
        "script.js",
      ];

      console.log("DOCKER ARGS:", args);

      const proc = spawn("docker", args);

      let output = "";
      let errorOutput = "";

      proc.stdout.on("data", (data) => {
        console.log("STDOUT:", data.toString());
        output += data.toString();
      });

      proc.stderr.on("data", (data) => {
        console.log("STDERR:", data.toString());
        errorOutput += data.toString();
      });

      proc.on("close", (code) => {
        console.log("EXIT CODE:", code);

        if (code !== 0) {
          return resolve({
            success: false,
            error: errorOutput,
          });
        }

        resolve({
          success: true,
          output,
        });
      });

      proc.on("error", (err) => {
        console.log("SPAWN ERROR:", err);
        resolve({
          success: false,
          error: err.message,
        });
      });

    } catch (err) {
      console.log("CATCH ERROR:", err);
      resolve({
        success: false,
        error: err.message,
      });
    }
  });
};