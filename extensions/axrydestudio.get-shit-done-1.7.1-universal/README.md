# Get Shit Done (GSD) — Mission Control

<p align="center">
  <img src="https://github.com/toonight/get-shit-done-for-antigravity/raw/HEAD/assets/icon.png" width="96" height="96" alt="Get Shit Done Icon" />
</p>

A VS Code / Antigravity extension that brings the [Get Shit Done (GSD)](https://github.com/toonight/get-shit-done-for-antigravity) context-engineering methodology into VS Code, Antigravity, Cursor, and Windsurf.

## 🚀 What’s New in Patch 1.7.1

- **☕ Unified Chai4Me Support** — Streamlined project support by switching to [Chai4Me (`chai4.me/godrikt`)](https://www.chai4.me/godrikt).

## 🌟 What’s New in Version 1.7.0 — “Make GSD Easy”

- **⚡ One-Click Installation (`GSD: Initialize Project`)** — Automatically detects project type (`Web App`, `Mobile App`, `Backend`, `AI Project`, `General`) and installs `.agent/`, `.agents/`, `.gemini/`, `.gsd/`, `PROJECT_RULES.md`, `GSD-STYLE.md`, and `model_capabilities.yaml` in a single click.
- **🪄 First-Run Setup Wizard** — Interactive onboarding screen right inside the Mission Control sidebar to pick your project type and configure in seconds.
- **⚡ GSD ► NEXT ACTION** — Intelligent recommendation engine that analyzes your project state and advises exactly which command to run next (e.g. `/execute 2`), with 1-click execution.
- **📊 Project Status Dashboard** — Live inspection of `.gsd/STATE.md` and `ROADMAP.md` showing current phase, visual ASCII progress (`████████████░░░░ 72%`), completed deliverables checklist, upcoming steps, and blockers.
- **🩺 GSD Doctor (`/doctor`)** — Full diagnostic scan reporting your project Health Score (e.g., `88/100`), checking installation integrity, spec validity, state freshness, git repository status, and 1-click auto-repair.
- **📂 Categorized Sidebar & Help** — Workflows grouped logically into 🚀 START, 📐 PLAN, ⚙ BUILD, 🔍 VERIFY, and 📊 STATE.

## ✨ Core Features

- **GSD Mission Control Sidebar** — Interactive panel with real-time project metrics, "What's Next?" banner, status dashboard, and categorized triggers.
- **Quick Artifact Navigation** — One-click chips to jump directly into `.gsd/SPEC.md`, `.gsd/ROADMAP.md`, `.gsd/STATE.md`, or `.gsd/TODO.md`.
- **Full Upstream GSD Pack Bundled**:
  - **27 Workflows** (`.agent/workflows/`): `/new-project`, `/map`, `/plan`, `/execute`, `/verify`, `/debug`, `/discuss-phase`, `/research-phase`, `/pause`, `/resume`, `/sprint`, `/new-milestone`, `/complete-milestone`, `/audit-milestone`, `/add-phase`, etc.
  - **5 Antigravity 2.0 Native Subagents** (`.agents/agents/`): `gsd-planner`, `gsd-executor`, `gsd-verifier`, `gsd-researcher`, `gsd-debugger`.
  - **Subagent Delegation Skills** (`.agents/skills/subagent-delegation/`).
  - **24 Production Templates** (`.gsd/templates/`): Spec, Roadmap, State, Plans, Debug, Discovery, UAT, etc.
  - **Antigravity Rule Integration** (`.gemini/GEMINI.md`), style rules (`GSD-STYLE.md`), project rules (`PROJECT_RULES.md`), and cross-platform verification scripts (`scripts/`).
- **Real-Time File Watchers** — Panel updates automatically whenever `.gsd/` artifacts change.

## 🚀 Commands

| Command | Title | Description |
|---|---|---|
| `gsd.initProject` | `GSD: Initialize Project` | One-click setup with automatic project type detection |
| `gsd.setupWizard` | `GSD: First-Run Setup Wizard` | Interactive onboarding wizard to pick project type & configure |
| `gsd.whatNext` | `GSD: What's Next?` | Compute and display recommended next workflow action |
| `gsd.doctor` | `GSD: Doctor (Health & Diagnostics)` | Scan project health score (0-100) & auto-fix common issues |
| `gsd.install` | `GSD: Install or Update Workflows` | Copy or update bundled GSD assets into workspace |
| `gsd.newProject` | `GSD: New Project` | Initialize a new project with deep context gathering (`/new-project`) |
| `gsd.map` | `GSD: Map Codebase` | Analyze and map codebase architecture (`/map`) |
| `gsd.discussPhase` | `GSD: Discuss Phase` | Clarify scope and decisions before planning (`/discuss-phase`) |
| `gsd.researchPhase` | `GSD: Research Phase` | Deep technical spike into phase requirements (`/research-phase`) |
| `gsd.plan` | `GSD: Plan Phase` | Technical discovery and atomic XML plan creation (`/plan`) |
| `gsd.execute` | `GSD: Execute Phase` | Wave-based execution with isolated subagents (`/execute`) |
| `gsd.verify` | `GSD: Verify Phase` | Audit deliverables against must-haves (`/verify`) |
| `gsd.debug` | `GSD: Debug Issue` | Fresh-context debugger subagent (`/debug`) |
| `gsd.progress` | `GSD: Show Progress` | Display project status, progress, and next action (`/progress`) |
| `gsd.pause` | `GSD: Pause Session` | Save state and context before pausing (`/pause`) |
| `gsd.resume` | `GSD: Resume Session` | Restore context and continue next steps (`/resume`) |
| `gsd.sprint` | `GSD: Quick Sprint` | Fast, focused single-task cycle (`/sprint`) |
| `gsd.completeMilestone` | `GSD: Complete Milestone` | Finalize & archive milestone (`/complete-milestone`) |
| `gsd.newMilestone` | `GSD: New Milestone` | Start a new milestone (`/new-milestone`) |
| `gsd.auditMilestone` | `GSD: Audit Milestone` | Audit milestone completeness (`/audit-milestone`) |
| `gsd.addPhase` | `GSD: Add Phase` | Append a new phase to roadmap (`/add-phase`) |
| `gsd.addTodo` | `GSD: Add Todo` | Add a todo item with interactive prompt (`/add-todo`) |
| `gsd.checkTodos` | `GSD: Check Todos` | Review pending todos (`/check-todos`) |
| `gsd.openArtifact` | `GSD: Open Artifact File` | Open a `.gsd` markdown artifact directly in editor |
| `gsd.help` | `GSD: Open Help` | Open categorized workflow documentation and cheat sheet |
| `gsd.refresh` | `GSD: Refresh Panel` | Force refresh Mission Control sidebar state |

## 🛠️ Getting Started

1. Install the extension in VS Code, Cursor, Windsurf, or Antigravity.
2. Open your project folder.
3. Open the **GSD Mission Control** panel from the activity bar (rocket icon).
4. If uninitialized, pick your project type in the **Setup Wizard** and click **⚡ Initialize GSD**.
5. Follow the **⚡ GSD ► NEXT ACTION** button to run `/new-project` and start building!

## ⚙️ Requirements

- VS Code 1.85.0+, or a compatible fork (Antigravity, Cursor, Windsurf)
- Antigravity 2.0+ recommended for subagent delegation (`gsd-executor`, `gsd-verifier`, etc.). Works in inline mode on Antigravity 1.x and other AI assistants.

## ☕ Support

If you find Get Shit Done helpful for your workflow and daily productivity, consider supporting its ongoing development:

<p align="left">
  <a href="https://www.chai4.me/godrikt" target="_blank">
    <img src="https://img.shields.io/badge/Buy%20Me%20A%20Chai-chai4.me%2Fgodrikt-FF813F?style=for-the-badge&logo=coffeescript&logoColor=white" height="40" alt="Buy Me A Chai" />
  </a>
</p>

👉 [https://www.chai4.me/godrikt](https://www.chai4.me/godrikt)

## 👥 Credits & Author

- **Company:** AxrydeStudio
- **Developer:** Godrikt
- **Workflow System & Original Concept:** [toonight](https://github.com/toonight/get-shit-done-for-antigravity) (creator of the Get Shit Done workflow pack for Antigravity)

## 📄 License

MIT © 2026 AxrydeStudio / Godrikt. Based on work by toonight.
