# 🚀 Antigravity Initialization Tool

`@sibshahz/antigravity-init` is a specialized CLI utility designed to seamlessly integrate the Antigravity agentic infrastructure into any existing project.

## ✨ Core Features

- **⚡️ Instant Injection**: Injects the complete `.agents/` directory structure, including core logic, skills, and workflows, directly into your project root.
- **🛡️ Conflict-Free Merging**: Intelligently merges template folders. If a file conflict is detected, the tool **always prioritizes your existing files**, ensuring no custom workflows or local edits are ever overwritten.
- **📂 Structure Preservation**: Unlike standard boilerplates, this tool maintains your project's integrity. It **never moves your files** or forces a specific directory hierarchy on your existing codebase.
- **🧩 Minimalist Footprint**: Only adds the essential agentic layer, keeping your root directory clean and professional.

---

## 🚀 Getting Started

### Quick Start (NPM)

Run the following command in the root of your project:

```bash
npx @sibshahz/antigravity-init
```

### Local Development

If you are working on the CLI itself, you can test it locally:

```bash
# From your project root
npx /absolute/path/to/antigravity-cli
```

---

## 📁 Post-Initialization Structure

After running the tool, your project root will remain unchanged, with the addition of the `.agents` layer:

```text
/your-project-root
├── .agents/               # Antigravity Logic & Workflows
│   ├── skills/            # Custom agent capabilities
│   └── workflows/         # Autonomous process definitions
├── [YOUR SOURCE CODE]     # Your original files remain here
├── package.json
└── ...
```

---

## 🛠 Requirements & Compatibility

- **Node.js**: Version 14.x or higher.
- **Filesystem**: Requires write permissions in the target directory.
- **Dependencies**: Automatically manages `fs-extra` via npx.

---

## 📝 Note on Scoped Publishing

If you are publishing this package for the first time, ensure you use the public access flag:

```bash
npm publish --access public
```
