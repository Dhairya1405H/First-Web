"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionControlView = void 0;
const vscode = __importStar(require("vscode"));
class MissionControlView {
    constructor(extensionUri) {
        this.extensionUri = extensionUri;
    }
    resolveWebviewView(webviewView, _context, _token) {
        this.view = webviewView;
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.onDidReceiveMessage(msg => {
            this.handleAction(msg.command, msg.payload);
        });
        this.render();
    }
    update(state, doctorReport) {
        this.state = state;
        if (doctorReport !== undefined) {
            this.doctorReport = doctorReport;
        }
        this.render();
    }
    setDoctorReport(report) {
        this.doctorReport = report;
        this.render();
    }
    render() {
        if (!this.view) {
            return;
        }
        this.view.webview.html = this.buildHtml(this.state, this.doctorReport);
    }
    handleAction(command, payload) {
        const directMap = {
            install: 'gsd.install',
            initProject: 'gsd.initProject',
            setupWizard: 'gsd.setupWizard',
            doctor: 'gsd.doctor',
            whatNext: 'gsd.whatNext',
            map: 'gsd.map',
            plan: 'gsd.plan',
            execute: 'gsd.execute',
            verify: 'gsd.verify',
            debug: 'gsd.debug',
            progress: 'gsd.progress',
            newProject: 'gsd.newProject',
            addTodo: 'gsd.addTodo',
            checkTodos: 'gsd.checkTodos',
            discussPhase: 'gsd.discussPhase',
            researchPhase: 'gsd.researchPhase',
            pause: 'gsd.pause',
            resume: 'gsd.resume',
            sprint: 'gsd.sprint',
            newMilestone: 'gsd.newMilestone',
            completeMilestone: 'gsd.completeMilestone',
            auditMilestone: 'gsd.auditMilestone',
            addPhase: 'gsd.addPhase',
            help: 'gsd.help',
            refresh: 'gsd.refresh',
        };
        if (command === 'openArtifact' && payload) {
            vscode.commands.executeCommand('gsd.openArtifact', payload);
            return;
        }
        if (command === 'runNextAction' && this.state?.nextAction) {
            const act = this.state.nextAction;
            if (act.workflow === 'initProject') {
                vscode.commands.executeCommand('gsd.initProject');
            }
            else if (act.workflow === 'plan') {
                vscode.commands.executeCommand('gsd.plan');
            }
            else if (act.workflow === 'execute') {
                vscode.commands.executeCommand('gsd.execute');
            }
            else if (act.workflow === 'verify') {
                vscode.commands.executeCommand('gsd.verify');
            }
            else if (directMap[act.workflow]) {
                vscode.commands.executeCommand(directMap[act.workflow]);
            }
            return;
        }
        if (command === 'initWithType') {
            vscode.commands.executeCommand('gsd.initProject', payload);
            return;
        }
        const cmd = directMap[command];
        if (cmd) {
            vscode.commands.executeCommand(cmd, payload);
        }
    }
    buildHtml(state, doctor) {
        if (!state) {
            return this.shell('Loading…', `<div class="loading"><div class="spinner"></div><p class="muted">Reading project state…</p></div>`);
        }
        if (!state.installed) {
            return this.shell('Welcome to GSD', `
                <div class="wizard-card">
                    <div class="wizard-header">
                        <span class="wizard-wave">👋</span>
                        <h3>Welcome to GSD</h3>
                        <p class="muted">Let's set up your project for structured, context-driven AI development.</p>
                    </div>

                    <div class="wizard-section-title">What kind of project?</div>
                    <div class="type-selector">
                        <label class="type-option selected" onclick="selectType(this, 'web')">
                            <input type="radio" name="projectType" value="web" checked />
                            <div class="opt-label">🌐 Web App</div>
                            <div class="opt-sub">React, Next.js, Vite, Vue, Svelte</div>
                        </label>
                        <label class="type-option" onclick="selectType(this, 'mobile')">
                            <input type="radio" name="projectType" value="mobile" />
                            <div class="opt-label">📱 Mobile App</div>
                            <div class="opt-sub">Flutter, React Native, iOS, Android</div>
                        </label>
                        <label class="type-option" onclick="selectType(this, 'backend')">
                            <input type="radio" name="projectType" value="backend" />
                            <div class="opt-label">⚡ Backend</div>
                            <div class="opt-sub">Node.js, Express, Python, Go, Rust</div>
                        </label>
                        <label class="type-option" onclick="selectType(this, 'ai')">
                            <input type="radio" name="projectType" value="ai" />
                            <div class="opt-label">🧠 AI Project</div>
                            <div class="opt-sub">Agents, PyTorch, LangChain, Notebooks</div>
                        </label>
                        <label class="type-option" onclick="selectType(this, 'general')">
                            <input type="radio" name="projectType" value="general" />
                            <div class="opt-label">📦 Other</div>
                            <div class="opt-sub">CLI tool, standard library, custom</div>
                        </label>
                    </div>

                    <button class="btn btn-primary btn-block btn-lg" onclick="doInit()">⚡ Initialize GSD</button>
                    <button class="btn btn-secondary btn-block" style="margin-top: 8px;" onclick="post('help')">❓ Workflow Reference</button>
                </div>
            `);
        }
        const specStatusClass = state.specStatus === 'FINALIZED'
            ? 'badge-ok'
            : state.specStatus === 'DRAFT'
                ? 'badge-warn'
                : 'badge-muted';
        const phasePct = state.totalPhases > 0
            ? Math.round((state.completedPhases / state.totalPhases) * 100)
            : 0;
        // Visual ASCII progress bar e.g. ████████░░░░
        const barLength = 14;
        const filledChars = Math.round((phasePct / 100) * barLength);
        const emptyChars = Math.max(0, barLength - filledChars);
        const asciiBar = '█'.repeat(filledChars) + '░'.repeat(emptyChars);
        const currentPhaseText = state.currentPhaseNumber
            ? `Phase ${state.currentPhaseNumber} of ${Math.max(state.totalPhases, 1)}`
            : state.currentPhase !== 'Unknown'
                ? state.currentPhase
                : 'No active phase';
        // Completed Deliverables List
        const deliverables = state.completedDeliverables.length > 0
            ? state.completedDeliverables
            : state.completedPhases > 0
                ? [`Phase 1 through ${state.completedPhases}`]
                : ['Initial repository setup'];
        const completedHtml = deliverables.map(d => `
            <div class="checklist-item done">
                <span class="check-icon">✓</span>
                <span class="check-text">${htmlEscape(d)}</span>
            </div>
        `).join('');
        // Blockers HTML
        const blockersHtml = state.blockers.length > 0
            ? `
                <div class="card card-danger">
                    <div class="card-title text-danger">⚠️ Active Blockers (${state.blockers.length})</div>
                    <ul class="blocker-list">
                        ${state.blockers.map(b => `<li>${htmlEscape(b)}</li>`).join('')}
                    </ul>
                    <button class="btn btn-secondary btn-sm" style="margin-top: 6px;" onclick="post('debug')">🐞 Run /debug</button>
                </div>
            `
            : `
                <div class="dashboard-row">
                    <span class="dash-label">Blockers:</span>
                    <span class="dash-value text-success">✓ None</span>
                </div>
            `;
        // Doctor section
        const doctorScore = doctor ? doctor.healthScore : 88;
        const doctorBadgeClass = doctorScore >= 80 ? 'badge-ok' : doctorScore >= 60 ? 'badge-warn' : 'badge-danger';
        const body = `
            <!-- Top Header & Version -->
            <div class="header-strip">
                <div class="brand">
                    <span class="brand-icon">⚡</span>
                    <span class="brand-title">GSD</span>
                    <span class="version-chip">v${htmlEscape(state.version)}</span>
                </div>
                <div class="header-tools">
                    <button class="icon-btn" onclick="post('doctor')" title="GSD Doctor (Diagnostics)">🩺</button>
                    <button class="icon-btn" onclick="post('refresh')" title="Refresh state">🔄</button>
                </div>
            </div>

            <!-- 1. PROJECT SUMMARY CARD -->
            <div class="card project-card">
                <div class="project-header-row">
                    <span class="project-dot">●</span>
                    <span class="project-name" title="${htmlEscape(state.projectName)}">${htmlEscape(state.projectName)}</span>
                    <span class="milestone-pill" title="Current Milestone">${htmlEscape(state.currentMilestone)}</span>
                </div>

                <div class="project-meta-grid">
                    <div class="meta-item">
                        <span class="meta-label">PHASE</span>
                        <span class="meta-val highlight">${htmlEscape(state.currentPhaseNumber ? `Phase ${state.currentPhaseNumber}` : state.currentPhase)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">PROGRESS</span>
                        <span class="meta-val">${phasePct}%</span>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="ascii-progress" title="${phasePct}% Complete">
                    <span class="ascii-bar">${asciiBar}</span>
                    <span class="ascii-pct">${phasePct}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${phasePct}%;"></div>
                </div>
            </div>

            <!-- 2. "WHAT'S NEXT?" HERO CALLOUT -->
            <div class="hero-callout">
                <div class="callout-header">
                    <span class="callout-title">⚡ GSD ► NEXT ACTION</span>
                    <span class="badge ${state.nextAction.badge.includes('Warning') ? 'badge-danger' : 'badge-ok'}">${htmlEscape(state.nextAction.badge)}</span>
                </div>
                <div class="callout-context">${htmlEscape(state.nextAction.statusContext)}</div>
                <div class="callout-reason">${htmlEscape(state.nextAction.reason)}</div>
                <button class="btn btn-hero btn-block" onclick="post('runNextAction')" title="Execute: /${htmlEscape(state.nextAction.command)}">
                    ▶ ${htmlEscape(state.nextAction.label)}
                </button>
            </div>

            <!-- 3. PROJECT STATUS DASHBOARD -->
            <div class="card dashboard-card">
                <div class="card-title-row">
                    <span class="card-title">Project Status</span>
                    <span class="phase-count-tag">${currentPhaseText}</span>
                </div>

                <div class="dashboard-row">
                    <span class="dash-label">Current:</span>
                    <span class="dash-value strong highlight">⚙ ${htmlEscape(state.activePlan || state.currentPhase)}</span>
                </div>

                <div class="dash-section-title">Completed Deliverables</div>
                <div class="checklist">
                    ${completedHtml}
                </div>

                <div class="dashboard-row" style="margin-top: 8px;">
                    <span class="dash-label">Next Action:</span>
                    <span class="dash-value strong">→ ${htmlEscape(state.nextAction.label)}</span>
                </div>

                ${blockersHtml}
            </div>

            <!-- 4. GSD DOCTOR HEALTH BANNER -->
            <div class="doctor-strip" onclick="post('doctor')" title="Click to run full GSD Doctor diagnostics">
                <div class="doctor-info">
                    <span class="doctor-icon">🩺</span>
                    <span class="doctor-title">GSD Doctor</span>
                    <span class="badge ${doctorBadgeClass}">Health: ${doctorScore}/100</span>
                </div>
                <button class="btn-micro" onclick="event.stopPropagation(); post('doctor');">Scan</button>
            </div>

            <!-- Quick Artifact Navigation Chips -->
            <div class="artifact-bar">
                <button class="artifact-chip ${state.artifacts.specExists ? 'chip-active' : 'chip-missing'}"
                        onclick="post('openArtifact', '.gsd/SPEC.md')" title="Open SPEC.md">
                    SPEC <span class="chip-dot ${specStatusClass}"></span>
                </button>
                <button class="artifact-chip ${state.artifacts.roadmapExists ? 'chip-active' : 'chip-missing'}"
                        onclick="post('openArtifact', '.gsd/ROADMAP.md')" title="Open ROADMAP.md">
                    ROADMAP <span class="chip-badge">${state.completedPhases}/${state.totalPhases}</span>
                </button>
                <button class="artifact-chip ${state.artifacts.stateExists ? 'chip-active' : 'chip-missing'}"
                        onclick="post('openArtifact', '.gsd/STATE.md')" title="Open STATE.md">
                    STATE <span class="chip-badge">${htmlEscape(state.status || 'saved')}</span>
                </button>
                <button class="artifact-chip ${state.artifacts.todoExists ? 'chip-active' : 'chip-missing'}"
                        onclick="post('openArtifact', '.gsd/TODO.md')" title="Open TODO.md">
                    TODO <span class="chip-badge">${state.pendingTodos.length}</span>
                </button>
            </div>

            <!-- 5. CATEGORIZED WORKFLOW ACTIONS -->
            <div class="category-block">
                <div class="category-label">🚀 START</div>
                <div class="action-grid-2">
                    <button class="btn btn-action" onclick="post('newProject')" title="Initialize new project (/new-project)">＋ New Project</button>
                    <button class="btn btn-action" onclick="post('newMilestone')" title="Start next milestone (/new-milestone)">🎯 New Milestone</button>
                </div>
            </div>

            <div class="category-block">
                <div class="category-label">📐 PLAN</div>
                <div class="action-grid-2">
                    <button class="btn btn-action" onclick="post('discussPhase')" title="Clarify phase scope (/discuss-phase)">💬 Discuss Phase</button>
                    <button class="btn btn-action" onclick="post('plan')" title="Plan phase tasks & subagent waves (/plan)">📐 Plan Phase</button>
                    <button class="btn btn-action" onclick="post('researchPhase')" title="Deep dive research (/research-phase)">🔎 Research</button>
                    <button class="btn btn-action" onclick="post('map')" title="Map codebase architecture (/map)">🗺️ Map Codebase</button>
                </div>
            </div>

            <div class="category-block">
                <div class="category-label">⚙ BUILD</div>
                <div class="action-grid-2">
                    <button class="btn btn-primary" onclick="post('execute')" title="Execute phase in subagent waves (/execute)">⚙ Execute</button>
                    <button class="btn btn-action" onclick="post('sprint')" title="Fast single-task sprint (/sprint)">⚡ Sprint</button>
                </div>
            </div>

            <div class="category-block">
                <div class="category-label">🔍 VERIFY</div>
                <div class="action-grid-2">
                    <button class="btn btn-action" onclick="post('verify')" title="Audit deliverables against must-haves (/verify)">✓ Verify</button>
                    <button class="btn btn-action" onclick="post('debug')" title="Diagnose issue with fresh subagent (/debug)">🐛 Debug</button>
                </div>
            </div>

            <div class="category-block">
                <div class="category-label">📊 STATE</div>
                <div class="action-grid-2">
                    <button class="btn btn-action" onclick="post('progress')" title="View progress report (/progress)">📊 Progress</button>
                    <button class="btn btn-action" onclick="post('addTodo')" title="Add item to TODO.md (/add-todo)">📝 Add Todo</button>
                    <button class="btn btn-action" onclick="post('pause')" title="Save session context (/pause)">⏸ Pause</button>
                    <button class="btn btn-action" onclick="post('resume')" title="Restore session context (/resume)">▶ Resume</button>
                </div>
            </div>
        `;
        return this.shell('GSD Mission Control', body);
    }
    shell(title, body) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';"/>
<title>${title}</title>
<style>
  :root {
    --card-bg: var(--vscode-sideBar-background);
    --card-border: var(--vscode-widget-border, rgba(255,255,255,0.08));
    --card-hover: var(--vscode-list-hoverBackground, rgba(255,255,255,0.05));
    --primary: var(--vscode-button-background, #007acc);
    --primary-hover: var(--vscode-button-hoverBackground, #0069ac);
    --primary-fg: var(--vscode-button-foreground, #ffffff);
    --secondary-bg: var(--vscode-button-secondaryBackground, rgba(255,255,255,0.06));
    --secondary-hover: var(--vscode-button-secondaryHoverBackground, rgba(255,255,255,0.12));
    --secondary-fg: var(--vscode-button-secondaryForeground, var(--vscode-foreground));
    --accent: #38bdf8;
    --success: #4ade80;
    --warn: #fbbf24;
    --danger: #f87171;
  }
  * { box-sizing: border-box; }
  body {
    font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    font-size: var(--vscode-font-size, 12px);
    color: var(--vscode-foreground);
    background: var(--vscode-sideBar-background);
    padding: 10px 8px;
    margin: 0;
    line-height: 1.4;
  }

  /* Header */
  .header-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--card-border);
  }
  .brand { display: flex; align-items: center; gap: 6px; }
  .brand-icon { font-size: 1.1em; color: var(--accent); }
  .brand-title { font-weight: 800; font-size: 1.1em; letter-spacing: -0.01em; }
  .version-chip {
    font-size: 0.7em;
    background: rgba(56, 189, 248, 0.12);
    color: var(--accent);
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 1px 5px;
    border-radius: 10px;
    font-weight: 700;
  }
  .header-tools { display: flex; gap: 4px; }
  .icon-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    padding: 3px 5px;
    border-radius: 4px;
    opacity: 0.85;
  }
  .icon-btn:hover { opacity: 1; background: var(--card-hover); }

  /* Project Card */
  .card {
    background: var(--secondary-bg);
    border: 1px solid var(--card-border);
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px;
  }
  .project-header-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }
  .project-dot { color: var(--accent); font-size: 0.9em; }
  .project-name { font-weight: 700; font-size: 1.05em; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .milestone-pill {
    font-size: 0.7em;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--card-border);
    padding: 1px 6px;
    border-radius: 8px;
    color: var(--secondary-fg);
  }
  .project-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 6px;
  }
  .meta-item { display: flex; flex-direction: column; }
  .meta-label { font-size: 0.68em; color: var(--vscode-descriptionForeground, #888); font-weight: 600; text-transform: uppercase; }
  .meta-val { font-size: 0.95em; font-weight: 700; }
  .highlight { color: var(--accent); }

  /* ASCII Progress */
  .ascii-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--vscode-editor-font-family, monospace);
    font-size: 0.85em;
    color: var(--accent);
    margin: 4px 0 2px 0;
  }
  .ascii-bar { letter-spacing: 1px; }
  .ascii-pct { font-weight: 700; }

  .progress-bar {
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 4px;
  }
  .progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* What's Next Hero Callout */
  .hero-callout {
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(0, 122, 204, 0.08) 100%);
    border: 1px solid rgba(56, 189, 248, 0.35);
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px;
  }
  .callout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  .callout-title { font-weight: 800; font-size: 0.8em; letter-spacing: 0.5px; color: var(--accent); }
  .callout-context { font-size: 0.78em; color: var(--vscode-descriptionForeground, #aaa); margin-bottom: 4px; }
  .callout-reason { font-size: 0.85em; margin-bottom: 8px; line-height: 1.35; }
  .btn-hero {
    background: var(--primary);
    color: var(--primary-fg);
    font-weight: 700;
    padding: 7px 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
    font-size: 0.9em;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
  .btn-hero:hover { background: var(--primary-hover); transform: translateY(-1px); }

  /* Dashboard Card */
  .card-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--card-border);
  }
  .card-title { font-weight: 700; font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.5px; }
  .phase-count-tag { font-size: 0.75em; color: var(--accent); font-weight: 600; }
  .dashboard-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.85em;
    margin-bottom: 6px;
  }
  .dash-label { color: var(--vscode-descriptionForeground, #888); }
  .dash-value { font-size: 0.9em; }
  .dash-section-title {
    font-size: 0.72em;
    color: var(--vscode-descriptionForeground, #888);
    font-weight: 700;
    text-transform: uppercase;
    margin: 8px 0 4px 0;
  }
  .checklist { display: flex; flex-direction: column; gap: 3px; }
  .checklist-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82em;
  }
  .checklist-item.done .check-icon { color: var(--success); font-weight: 800; }
  .text-success { color: var(--success); }
  .text-danger { color: var(--danger); }
  .card-danger { border-color: rgba(248, 113, 113, 0.4); background: rgba(248, 113, 113, 0.06); }
  .blocker-list { margin: 4px 0; padding-left: 16px; font-size: 0.82em; color: var(--danger); }

  /* Doctor Strip */
  .doctor-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--secondary-bg);
    border: 1px solid var(--card-border);
    padding: 6px 8px;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background 0.15s;
  }
  .doctor-strip:hover { background: var(--card-hover); }
  .doctor-info { display: flex; align-items: center; gap: 6px; }
  .doctor-title { font-weight: 700; font-size: 0.85em; }
  .btn-micro {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--vscode-foreground);
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 0.75em;
    cursor: pointer;
  }
  .btn-micro:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

  /* Artifact Chips */
  .artifact-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 10px;
  }
  .artifact-chip {
    background: var(--secondary-bg);
    border: 1px solid var(--card-border);
    color: var(--vscode-foreground);
    padding: 4px 2px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .artifact-chip:hover { background: var(--card-hover); border-color: var(--accent); }
  .chip-badge { font-size: 0.85em; opacity: 0.8; font-weight: normal; }
  .chip-dot { width: 5px; height: 5px; border-radius: 50%; display: inline-block; }

  /* Categorized Actions */
  .category-block { margin-bottom: 10px; }
  .category-label {
    font-size: 0.72em;
    font-weight: 800;
    color: var(--vscode-descriptionForeground, #888);
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  .action-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
  .btn {
    padding: 5px 8px;
    border-radius: 4px;
    border: 1px solid var(--card-border);
    cursor: pointer;
    font-size: 0.82em;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.12s;
  }
  .btn-block { width: 100%; text-align: center; }
  .btn-action {
    background: var(--secondary-bg);
    color: var(--vscode-foreground);
  }
  .btn-action:hover { background: var(--secondary-hover); border-color: rgba(255,255,255,0.2); }
  .btn-primary {
    background: var(--primary);
    color: var(--primary-fg);
    border-color: var(--primary);
    font-weight: 600;
  }
  .btn-primary:hover { background: var(--primary-hover); }
  .btn-secondary {
    background: var(--secondary-bg);
    color: var(--secondary-fg);
  }
  .btn-secondary:hover { background: var(--secondary-hover); }
  .btn-sm { padding: 3px 6px; font-size: 0.75em; }
  .btn-lg { padding: 9px 12px; font-size: 0.95em; }

  /* Badges */
  .badge {
    padding: 1px 6px;
    border-radius: 10px;
    font-size: 0.7em;
    font-weight: 700;
  }
  .badge-ok { background: rgba(74, 222, 128, 0.15); color: var(--success); border: 1px solid rgba(74, 222, 128, 0.3); }
  .badge-warn { background: rgba(251, 191, 36, 0.15); color: var(--warn); border: 1px solid rgba(251, 191, 36, 0.3); }
  .badge-danger { background: rgba(248, 113, 113, 0.15); color: var(--danger); border: 1px solid rgba(248, 113, 113, 0.3); }
  .badge-muted { background: rgba(255,255,255,0.06); color: #888; border: 1px solid var(--card-border); }

  /* Wizard */
  .wizard-card {
    background: var(--secondary-bg);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 16px 12px;
  }
  .wizard-header { text-align: center; margin-bottom: 14px; }
  .wizard-wave { font-size: 2.2em; display: inline-block; margin-bottom: 4px; }
  .wizard-header h3 { margin: 0 0 4px 0; font-size: 1.25em; font-weight: 800; }
  .wizard-section-title { font-weight: 700; font-size: 0.85em; margin-bottom: 8px; }
  .type-selector { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .type-option {
    border: 1px solid var(--card-border);
    background: rgba(255,255,255,0.02);
    border-radius: 6px;
    padding: 8px 10px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    flex-direction: column;
  }
  .type-option input { display: none; }
  .type-option:hover { background: var(--card-hover); border-color: rgba(56, 189, 248, 0.4); }
  .type-option.selected {
    border-color: var(--accent);
    background: rgba(56, 189, 248, 0.08);
  }
  .opt-label { font-weight: 700; font-size: 0.9em; margin-bottom: 1px; }
  .opt-sub { font-size: 0.72em; color: var(--vscode-descriptionForeground, #888); }

  .loading { text-align: center; padding: 40px 10px; }
  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255,255,255,0.1);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 10px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .muted { color: var(--vscode-descriptionForeground, #888); font-size: 0.82em; margin: 0; }
  .strong { font-weight: 700; }
</style>
</head>
<body>
${body}
<script>
  const vscode = acquireVsCodeApi();
  function post(cmd, payload) {
    vscode.postMessage({ command: cmd, payload: payload });
  }

  let selectedProjectType = 'web';
  function selectType(el, type) {
    document.querySelectorAll('.type-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedProjectType = type;
  }

  function doInit() {
    post('initWithType', selectedProjectType);
  }
</script>
</body>
</html>`;
    }
}
exports.MissionControlView = MissionControlView;
function htmlEscape(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
//# sourceMappingURL=missionControlView.js.map