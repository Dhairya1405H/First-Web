# Change Log

All notable changes to the "get-shit-done" extension will be documented in this file.

## [1.7.1] - 2026-09-20

### ☕ Support & Sponsorship
- Replaced legacy donation links (Buy Me A Coffee, GitHub Sponsors, Patreon) with [Chai4Me](https://www.chai4.me/godrikt).
- Updated package funding metadata.

## [1.7.0] - 2026-09-18 — “Make GSD Easy”

### 🚀 Major UX & Intelligence Release

- **One-Click Installation (`GSD: Initialize Project`)**:
  - Automatically detects project type (`Web App`, `Mobile App`, `Backend`, `AI Project`, `General`).
  - Installs `.agent/`, `.agents/`, `.gemini/`, `.gsd/`, `PROJECT_RULES.md`, `GSD-STYLE.md`, and `model_capabilities.yaml` in one click.
  - Zero manual cloning or terminal copying required.
  - Success notification with direct 1-click triggers for `/new-project` and opening the dashboard.

- **First-Run Setup Wizard**:
  - Automatically welcomes users on fresh projects with interactive project type detection (`Web App`, `Mobile App`, `Backend`, `AI Project`, `Other`).
  - Tailors initial project profiles and context files directly.

- **Revamped GSD Sidebar & Mission Control**:
  - **Project Bar**: Displays Project Name, Phase indicator, and visual ASCII progress (`████████████░░░░ 72%`).
  - **Categorized Workflows**:
    - 🚀 **START** (`/new-project`, `/new-milestone`)
    - 📐 **PLAN** (`/map`, `/discuss-phase`, `/plan`, `/research-phase`)
    - ⚙️ **BUILD** (`/execute`, `/sprint`)
    - 🔍 **VERIFY** (`/verify`, `/debug`)
    - 📊 **STATE** (`/progress`, `/todos`, `/pause`, `/resume`)

- **“What’s Next?” Recommendation Engine**:
  - Automatically calculates the optimal next action based on current project state (`/new-project` → `/plan` → `/execute` → `/verify` → `/complete-milestone` or `/debug`).
  - Highlights reason, wave breakdown, and phase context.
  - Single-click execution directly from the sidebar or terminal.

- **Project Status Dashboard**:
  - Live inspection of `STATE.md` and `ROADMAP.md`.
  - Shows current focus, completed deliverables checklist (`✓ Project specification`, `✓ Architecture`, `✓ Phase 1`...), upcoming steps, and blockers status.

- **GSD Doctor (`/doctor` & `gsd.doctor`)**:
  - Comprehensive diagnostic suite checking 7 health pillars: GSD installation, SPEC status, ROADMAP consistency, STATE freshness, Git repository, artifact integrity, and unverified tasks.
  - Provides a computed **Health Score (e.g. 88/100)** and a 1-click **Fix Issues** repair action.

- **Better Categorized `/help`**:
  - Structured, categorized reference grouping all 29 workflows into clear lifecycle stages.

## [0.1.1] - 2026-09-17

### Added & Improved

- **Complete Upstream GSD Pack Bundling (v1.6.0)**:
  - Bundled all 27 upstream workflows (`.agent/workflows/`): `new-project`, `map`, `plan`, `execute`, `verify`, `debug`, `progress`, `discuss-phase`, `research-phase`, `pause`, `resume`, `sprint`, `complete-milestone`, `new-milestone`, `audit-milestone`, `add-phase`, `insert-phase`, `remove-phase`, `list-phase-assumptions`, `plan-milestone-gaps`, `web-search`, `whats-new`, `install`, `update`, `help`, and more.
  - Bundled all 5 Antigravity 2.0 native subagent definitions (`.agents/agents/`): `gsd-planner`, `gsd-executor`, `gsd-verifier`, `gsd-researcher`, `gsd-debugger`.
  - Bundled the `subagent-delegation` skill (`.agents/skills/subagent-delegation/`).
  - Bundled all 24 production markdown templates (`.gsd/templates/`).
  - Bundled Antigravity rules (`.gemini/GEMINI.md`), model capabilities (`model_capabilities.yaml`), adapters (`adapters/`), and cross-platform validation/search scripts (`scripts/`).
- **Modern Mission Control Panel**:
  - **Quick Artifact Navigation Bar**: Click chips to jump directly into `.gsd/SPEC.md`, `.gsd/ROADMAP.md`, `.gsd/STATE.md`, or `.gsd/TODO.md` in your editor.
  - **Dual Progress Metrics**: Shows both high-level Phase progress and granular Plan progress with smooth progress bars.
  - **Live Blockers & Next Steps**: Displays active project blockers (highlighted in red) and prioritized next steps from `STATE.md`.
  - **Todo Priorities**: Visual tags for `🔴 high`, `🟡 medium`, and `🟢 low` priority todos, plus one-click access.
  - **Organized Action Grid**: Categorized workflow actions for Core Lifecycle, Session Management, Milestone/Scope, and Workspace Setup.
- **Enhanced State Parser**:
  - Full support for upstream GSD 1.6.0 `ROADMAP.md` (phases, status icons, plans, milestones) and `STATE.md`.
  - Detection of `SPEC.md` `FINALIZED` vs `DRAFT` status and vision excerpt.
- **New Workflow Commands**:
  - `gsd.discussPhase` — Discuss & clarify phase scope (`/discuss-phase`)
  - `gsd.researchPhase` — Deep technical discovery (`/research-phase`)
  - `gsd.pause` — Save context and pause active session (`/pause`)
  - `gsd.resume` — Resume work from saved state (`/resume`)
  - `gsd.sprint` — Fast single-task sprint (`/sprint`)
  - `gsd.newMilestone` — Initialize next milestone (`/new-milestone`)
  - `gsd.completeMilestone` — Finalize & archive milestone (`/complete-milestone`)
  - `gsd.auditMilestone` — Audit milestone completeness (`/audit-milestone`)
  - `gsd.addPhase` — Append new phase to roadmap (`/add-phase`)
  - `gsd.openArtifact` — Open any GSD artifact in the active editor
- **Batch Asset Installer**:
  - Added "Overwrite All" and "Skip All" support during workspace initialization/updates.
  - Added filtering to ignore OS artifacts like `.DS_Store` and `Thumbs.db`.
- **Live Watchers**:
  - Extended watchers to monitor all `.gsd/**/*.md` files and root rules.

## [0.1.0] - 2026-09-16

### Initial Public Release

- **GSD Mission Control**: Activity bar panel displaying project status, SPEC finalization badge, active milestone, current phase, progress bar, and pending todos from `.gsd/`.
- **Workflow Actions**: One-click action buttons in the panel for `Install/Update`, `New Project`, `Map`, `Plan`, `Execute`, `Verify`, `Debug`, and `Progress`.
- **Command Palette Integration**: 12 dedicated commands (`gsd.*`) to trigger workflows, add todos with interactive input prompts, and inspect project progress.
- **Asset Installer**: Workspace initializer copying bundled GSD assets.
- **Live File Watchers**: Automatic panel state updates when `.gsd/` artifacts change.
