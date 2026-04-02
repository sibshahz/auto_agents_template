#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

async function main() {
  const cwd = process.cwd();
  const templateDir = path.join(__dirname, "..", "template");
  const targetAppBuild = path.join(cwd, "app_build");

  console.log(`🚀 Initializing Antigravity in ${cwd}...`);

  try {
    // 1. Ensure target app_build exists (it might be part of the copy, but let's make sure)
    await fs.ensureDir(targetAppBuild);

    // 2. Identify template folders and files (excluding .git)
    const itemsToCopy = await fs.readdir(templateDir);
    const filteredItems = itemsToCopy.filter(
      (item) => item !== ".git" && item !== "antigravity-cli",
    );

    // 3. Copy/Merge template items into cwd
    console.log(
      "📦 Merging template folders: .agents, app_build, production_artifacts...",
    );
    for (const item of filteredItems) {
      const srcItem = path.join(templateDir, item);
      const destItem = path.join(cwd, item);

      // Copy recursively, merging directories
      await fs.copy(srcItem, destItem, { overwrite: true });
    }

    // 4. Move everything in cwd into app_build folder
    // Except app_build itself and maybe some hidden/node_modules if we want to be safe
    // The requirement says "move the complete code repo... into app_build folder"
    console.log(`🚚 Moving project files into app_build...`);

    const allFiles = await fs.readdir(cwd);
    for (const file of allFiles) {
      if (["app_build", ".agents", "production_artifacts"].includes(file))
        continue;

      const srcPath = path.join(cwd, file);
      const destPath = path.join(targetAppBuild, file);

      // Move with merge behavior if it's a directory
      // fs-extra move() throws if dest exists, so we merge
      if (await fs.pathExists(destPath)) {
        if (
          (await fs.stat(srcPath)).isDirectory() &&
          (await fs.stat(destPath)).isDirectory()
        ) {
          // Merge directories
          await fs.copy(srcPath, destPath, { overwrite: true });
          await fs.remove(srcPath);
        } else {
          // Overwrite file
          await fs.remove(destPath);
          await fs.move(srcPath, destPath);
        }
      } else {
        await fs.move(srcPath, destPath);
      }
    }

    console.log(
      "✅ Initialization complete! Root folder now contains: app_build, .agents, and production_artifacts.",
    );
  } catch (err) {
    console.error("❌ Error during initialization:", err);
    process.exit(1);
  }
}

main();
