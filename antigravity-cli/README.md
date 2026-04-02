# Antigravity Initialization Tool

`antigravity-init` is a CLI tool designed to quickly set up your project environment and prepare it for Antigravity-assisted development.

## What it does

When you run `npx @sibshahz/antigravity-init` in your project folder, the following happens:

1.  **Injects Core Templates**: It adds (and merges, if they already exist) the following folders into your project's root:
    - `.agents/`: Core agent logic and workflows.
    - `app_build/`: Build and execution environment.
    - `production_artifacts/`: Designated storage for production-ready outputs.
2.  **Moves Your Project**: To compartmentalize your code, it automatically moves the complete contents of your project repository (src, package.json, etc.) into the newly merged `app_build/` folder.

## How to use it

### Usage from npm (recommended)

If the package is published to npm, simply run this in your project's root:

```bash
npx antigravity-init
```

### Local Usage (during development)

If you have the package locally, run it by pointing to the package directory:

```bash
npx /path/to/antigravity-cli
```

## Folder Structure After Initialization

Your project's root will look like this:

```text
/your-project-root
└── app_build/
    ├── .agents/
    ├── production_artifacts/
    ├── [YOUR ORIGINAL CODEBASE]
    └── README.md
```

## Requirements

- Node.js version 14 or higher.
- `fs-extra` (installed automatically via `npx`).
