#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

async function main() {
  const cwd = process.cwd();
  const templateDir = path.join(__dirname, "..", "template");

  console.log(`🚀 Initializing Antigravity in ${cwd}...`);

  try {
    const srcAgentDir = path.join(templateDir, ".agents");
    const destAgentDir = path.join(cwd, ".agents");

    if (await fs.pathExists(srcAgentDir)) {
      console.log("📦 Injecting .agents folder...");

      // Copy .agents recursively, merging directories but skipping existing files
      await fs.copy(srcAgentDir, destAgentDir, {
        overwrite: false,
        errorOnExist: false,
        filter: (src, dest) => {
          if (fs.pathExistsSync(dest)) {
            if (fs.statSync(dest).isFile()) {
              // File conflict: keep the old one (don't copy)
              return false;
            }
          }
          return true;
        },
      });
    } else {
      console.warn("⚠️  Warning: .agents template not found in correctly.");
      // We don't necessarily want to exit 1 if it just didn't find the template, 
      // but let's see if we should.
    }

    console.log(
      "✅ Initialization complete! The .agents folder has been injected and merged.",
    );
  } catch (err) {
    console.error("❌ Error during initialization:", err);
    process.exit(1);
  }
}

main();
