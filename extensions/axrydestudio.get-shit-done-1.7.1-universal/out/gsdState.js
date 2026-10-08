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
exports.readGsdState = readGsdState;
exports.calculateNextAction = calculateNextAction;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function readGsdState(workspaceRoot) {
    const gsdDir = path.join(workspaceRoot, '.gsd');
    const installed = fs.existsSync(gsdDir);
    const specFile = path.join(gsdDir, 'SPEC.md');
    const roadmapFile = path.join(gsdDir, 'ROADMAP.md');
    const stateFile = path.join(gsdDir, 'STATE.md');
    const todoFile = path.join(gsdDir, 'TODO.md');
    const archFile = path.join(gsdDir, 'ARCHITECTURE.md');
    const projectName = detectProjectName(workspaceRoot, gsdDir);
    const state = {
        projectName,
        installed,
        version: readVersion(workspaceRoot),
        specFinalized: false,
        specStatus: 'MISSING',
        specVision: '',
        currentMilestone: 'Milestone 1',
        currentPhase: 'Unknown',
        status: 'Unknown',
        activePlan: '',
        completedPhases: 0,
        totalPhases: 0,
        phases: [],
        completedDeliverables: [],
        completedPlans: 0,
        totalPlans: 0,
        pendingTodos: [],
        todoDetails: [],
        completedTodosCount: 0,
        stateSummary: '',
        lastAction: '',
        nextSteps: [],
        blockers: [],
        nextAction: {
            command: 'new-project',
            workflow: 'new-project',
            label: 'Run /new-project',
            reason: 'Initialize and specify project scope',
            badge: 'Start',
            statusContext: 'Welcome to GSD!',
        },
        artifacts: {
            specExists: fs.existsSync(specFile),
            roadmapExists: fs.existsSync(roadmapFile),
            stateExists: fs.existsSync(stateFile),
            todoExists: fs.existsSync(todoFile),
            architectureExists: fs.existsSync(archFile),
        },
    };
    if (!installed) {
        state.nextAction = {
            command: 'initProject',
            workflow: 'initProject',
            label: 'Initialize GSD',
            reason: 'Install GSD workflow engine and subagents into workspace',
            badge: 'Setup Required',
            statusContext: 'GSD not initialized yet.',
        };
        return state;
    }
    safeRead(() => parseSpec(gsdDir, state));
    safeRead(() => parseRoadmap(gsdDir, state));
    safeRead(() => parseStateFile(gsdDir, state));
    safeRead(() => parseTodos(gsdDir, state));
    // Build completed deliverables list
    buildDeliverables(state);
    // Calculate smart next action
    state.nextAction = calculateNextAction(state);
    return state;
}
function detectProjectName(workspaceRoot, gsdDir) {
    const specPath = path.join(gsdDir, 'SPEC.md');
    if (fs.existsSync(specPath)) {
        try {
            const content = fs.readFileSync(specPath, 'utf8');
            const match = content.match(/^#\s+(?:Project\s*:\s*)?([^\r\n#]+)/m);
            if (match && match[1].trim() && !match[1].toLowerCase().includes('project specification')) {
                return match[1].trim();
            }
        }
        catch { /* ignore */ }
    }
    const pkgPath = path.join(workspaceRoot, 'package.json');
    if (fs.existsSync(pkgPath)) {
        try {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
            if (pkg.name) {
                return String(pkg.name);
            }
        }
        catch { /* ignore */ }
    }
    return path.basename(workspaceRoot);
}
function readVersion(workspaceRoot) {
    try {
        const candidates = [
            path.join(workspaceRoot, '.gsd', 'VERSION'),
            path.join(workspaceRoot, 'VERSION'),
        ];
        for (const vFile of candidates) {
            if (fs.existsSync(vFile)) {
                const text = fs.readFileSync(vFile, 'utf8').trim();
                if (text) {
                    return text;
                }
            }
        }
    }
    catch { /* ignore */ }
    return 'Unknown';
}
function safeRead(fn) {
    try {
        fn();
    }
    catch { /* tolerate parse errors */ }
}
function parseSpec(gsdDir, state) {
    const p = path.join(gsdDir, 'SPEC.md');
    if (!fs.existsSync(p)) {
        state.specStatus = 'MISSING';
        return;
    }
    const content = fs.readFileSync(p, 'utf8');
    const finalized = /FINALIZED/i.test(content);
    state.specFinalized = finalized;
    state.specStatus = finalized ? 'FINALIZED' : 'DRAFT';
    const visionMatch = content.match(/## Vision\s*\n+([^#\n][^\n]+)/m);
    if (visionMatch) {
        state.specVision = visionMatch[1].trim();
    }
}
function parseRoadmap(gsdDir, state) {
    const p = path.join(gsdDir, 'ROADMAP.md');
    if (!fs.existsSync(p)) {
        return;
    }
    const content = fs.readFileSync(p, 'utf8');
    // Milestone from frontmatter or heading
    const fmMilestone = content.match(/milestone:\s*([^\r\n]+)/i);
    const headingMilestone = content.match(/^##\s+Milestone(?:\s*\d+)?[:\s]*(.+)/im) || content.match(/^##\s+([^#\r\n]+)/m);
    if (fmMilestone) {
        state.currentMilestone = fmMilestone[1].trim();
    }
    else if (headingMilestone) {
        state.currentMilestone = headingMilestone[1].trim();
    }
    // Current phase line: > **Current Phase:** {N} - {name}
    const currentPhaseMatch = content.match(/>\s*\*\*Current Phase:\*\*\s*([^\r\n]+)/i);
    if (currentPhaseMatch) {
        state.currentPhase = currentPhaseMatch[1].trim();
    }
    // Status line: > **Status:** {planning | executing | verifying}
    const statusMatch = content.match(/>\s*\*\*Status:\*\*\s*([^\r\n]+)/i);
    if (statusMatch) {
        state.status = statusMatch[1].trim();
    }
    // Check phases formatted as ### Phase N: {Title}
    const phaseHeadingPattern = /^###\s+Phase\s+(\d+)[:\s]*([^\r\n]*)/gim;
    const phaseHeadings = [...content.matchAll(phaseHeadingPattern)];
    // Also check list items: "- [ ] Phase" or "- [x] Phase"
    const phaseListPattern = /^- \[( |x)\] (?:Phase\s*\d*[:\s]*)?(.+)/gim;
    const phaseListMatches = [...content.matchAll(phaseListPattern)].filter(m => !m[2].toLowerCase().startsWith('plan'));
    if (phaseHeadings.length > 0) {
        state.totalPhases = phaseHeadings.length;
        // Count completed phases by checking for completion markers in their sections
        let completed = 0;
        const phasesList = [];
        for (let i = 0; i < phaseHeadings.length; i++) {
            const startIdx = phaseHeadings[i].index;
            const endIdx = i + 1 < phaseHeadings.length ? phaseHeadings[i + 1].index : content.length;
            const section = content.slice(startIdx, endIdx);
            const phaseNum = phaseHeadings[i][1];
            const phaseName = phaseHeadings[i][2]?.trim() || `Phase ${phaseNum}`;
            const isCompleted = /Status:\*{0,2}\s*(?:✅|Complete)/i.test(section);
            if (isCompleted) {
                completed++;
            }
            else if (state.currentPhase === 'Unknown') {
                state.currentPhase = `${phaseNum} - ${phaseName}`;
                state.currentPhaseNumber = phaseNum;
            }
            phasesList.push({
                number: phaseNum,
                name: phaseName,
                completed: isCompleted,
                current: false,
            });
        }
        state.completedPhases = completed;
        state.phases = phasesList;
    }
    else if (phaseListMatches.length > 0) {
        state.totalPhases = phaseListMatches.length;
        state.completedPhases = phaseListMatches.filter(m => m[1].toLowerCase() === 'x').length;
        const unchecked = phaseListMatches.find(m => m[1] === ' ');
        if (unchecked && state.currentPhase === 'Unknown') {
            state.currentPhase = unchecked[2].trim();
        }
        state.phases = phaseListMatches.map((m, idx) => ({
            number: String(idx + 1),
            name: m[2].trim(),
            completed: m[1].toLowerCase() === 'x',
            current: false,
        }));
    }
    // Count plans: lines like "- [ ] Plan 1.1: ..." or "- [x] Plan 1.1: ..."
    const planPattern = /^- \[( |x)\] Plan\s+[^:\r\n]+:?([^\r\n]*)/gim;
    const planMatches = [...content.matchAll(planPattern)];
    if (planMatches.length > 0) {
        state.totalPlans = planMatches.length;
        state.completedPlans = planMatches.filter(m => m[1].toLowerCase() === 'x').length;
    }
    // Extract phase number if currentPhase is known
    const phaseNumMatch = state.currentPhase.match(/^(?:Phase\s*)?(\d+)/i);
    if (phaseNumMatch) {
        state.currentPhaseNumber = phaseNumMatch[1];
    }
    // Mark current phase in phase list
    for (const p of state.phases) {
        if (p.number === state.currentPhaseNumber || state.currentPhase.includes(p.name)) {
            p.current = true;
        }
    }
}
function parseStateFile(gsdDir, state) {
    const p = path.join(gsdDir, 'STATE.md');
    if (!fs.existsSync(p)) {
        return;
    }
    const content = fs.readFileSync(p, 'utf8');
    // Milestone from state file
    const milestoneMatch = content.match(/\*\*Milestone:\*\*\s*([^\r\n]+)/i);
    if (milestoneMatch) {
        state.currentMilestone = milestoneMatch[1].trim();
    }
    // Phase from state file
    const phaseMatch = content.match(/\*\*Phase:\*\*\s*([^\r\n]+)/i)
        || content.match(/(?:phase|current)[:\s]+([^\r\n]+)/i);
    if (phaseMatch) {
        state.currentPhase = phaseMatch[1].trim();
        const numMatch = state.currentPhase.match(/^(?:Phase\s*)?(\d+)/i);
        if (numMatch) {
            state.currentPhaseNumber = numMatch[1];
        }
    }
    // Status from state file
    const statusMatch = content.match(/\*\*Status:\*\*\s*([^\r\n]+)/i);
    if (statusMatch) {
        state.status = statusMatch[1].trim();
    }
    // Plan from state file
    const planMatch = content.match(/\*\*Plan:\*\*\s*([^\r\n]+)/i);
    if (planMatch) {
        state.activePlan = planMatch[1].trim();
    }
    // Last Action
    const lastActionMatch = content.match(/## Last Action\s*\n+([^#\r\n][^\r\n]+)/m);
    if (lastActionMatch) {
        state.lastAction = lastActionMatch[1].trim();
    }
    // Next Steps: list items under ## Next Steps
    const nextStepsBlock = content.match(/## Next Steps\s*\n+([\s\S]*?)(?=\n##|$)/i);
    if (nextStepsBlock) {
        const stepItems = [...nextStepsBlock[1].matchAll(/^(?:\d+\.|-|\*)\s+(?:\[[ x]\]\s*)?([^\r\n]+)/gm)];
        state.nextSteps = stepItems.map(m => m[1].trim()).slice(0, 5);
    }
    // Blockers
    const blockersBlock = content.match(/## Blockers\s*\n+([\s\S]*?)(?=\n##|$)/i);
    if (blockersBlock) {
        const blockerItems = [...blockersBlock[1].matchAll(/^- \[ \] ([^\r\n]+)/gm)];
        const cleanBlockers = blockerItems.map(m => m[1].trim()).filter(b => !/none/i.test(b));
        state.blockers = cleanBlockers;
    }
    // Summary: lastAction or first non-empty line after a heading
    if (state.lastAction) {
        state.stateSummary = state.lastAction;
    }
    else {
        const summaryMatch = content.match(/^#[^\r\n]+\n+([^\r\n#].+)/m);
        if (summaryMatch) {
            state.stateSummary = summaryMatch[1].trim();
        }
    }
}
function parseTodos(gsdDir, state) {
    const p = path.join(gsdDir, 'TODO.md');
    if (!fs.existsSync(p)) {
        return;
    }
    const content = fs.readFileSync(p, 'utf8');
    // All unchecked items
    const pendingMatches = [...content.matchAll(/^- \[ \] ([^\r\n]+)/gm)];
    // All checked items
    const completedMatches = [...content.matchAll(/^- \[x\] ([^\r\n]+)/gim)];
    state.completedTodosCount = completedMatches.length;
    const pendingStrings = [];
    const details = [];
    for (const match of pendingMatches) {
        const raw = match[1].trim();
        // Determine priority if specified in `high`, `medium`, `low` or emojis
        let priority = 'medium';
        if (/`high`|🔴|urgent|blocker/i.test(raw)) {
            priority = 'high';
        }
        else if (/`low`|🟢|nice-to-have|future/i.test(raw)) {
            priority = 'low';
        }
        // Clean display text (strip out markdown priority tag or trailing dates)
        const cleanText = raw
            .replace(/`(high|medium|low)`/gi, '')
            .replace(/🔴|🟡|🟢/g, '')
            .replace(/—\s*\d{4}-\d{2}-\d{2}/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
        pendingStrings.push(cleanText || raw);
        details.push({
            text: cleanText || raw,
            priority,
        });
    }
    state.pendingTodos = pendingStrings.slice(0, 15);
    state.todoDetails = details.slice(0, 15);
}
function buildDeliverables(state) {
    const list = [];
    if (state.specFinalized) {
        list.push('Project specification');
    }
    if (state.artifacts.architectureExists) {
        list.push('Architecture');
    }
    for (const phase of state.phases) {
        if (phase.completed) {
            list.push(`Phase ${phase.number}: ${phase.name}`);
        }
    }
    state.completedDeliverables = list;
}
function calculateNextAction(state) {
    if (!state.installed) {
        return {
            command: 'initProject',
            workflow: 'initProject',
            label: 'Initialize GSD',
            reason: 'Install GSD workflow engine and subagents into workspace',
            badge: 'Setup Required',
            statusContext: 'GSD not initialized yet.',
        };
    }
    if (!state.artifacts.specExists) {
        return {
            command: 'new-project',
            workflow: 'new-project',
            label: 'Run /new-project',
            reason: 'Gather project requirements and build the initial specification baseline',
            badge: 'Spec Required',
            statusContext: 'Project has no specification yet.',
        };
    }
    if (state.specStatus === 'DRAFT') {
        return {
            command: 'new-project',
            workflow: 'new-project',
            label: 'Finalize /new-project',
            reason: 'Resolve open questions and lock SPEC.md as FINALIZED',
            badge: 'Spec Draft',
            statusContext: 'SPEC.md is currently in DRAFT status.',
        };
    }
    if (state.blockers.length > 0) {
        return {
            command: 'debug',
            workflow: 'debug',
            label: 'Run /debug',
            reason: `${state.blockers.length} active blocker(s) detected: ${state.blockers[0]}`,
            badge: 'Blocker Warning',
            statusContext: 'Resolve blockers before continuing execution.',
        };
    }
    if (!state.artifacts.roadmapExists || state.totalPhases === 0) {
        return {
            command: 'map',
            workflow: 'map',
            label: 'Run /map',
            reason: 'Analyze codebase architecture and generate initial roadmap phases',
            badge: 'Map Codebase',
            statusContext: 'No roadmap phases defined yet.',
        };
    }
    const currentPhaseNum = state.currentPhaseNumber || '1';
    // If all phases are complete
    if (state.completedPhases >= state.totalPhases && state.totalPhases > 0) {
        return {
            command: 'complete-milestone',
            workflow: 'complete-milestone',
            label: 'Complete Milestone',
            reason: `All ${state.totalPhases} phases completed! Audit and archive milestone.`,
            badge: 'Milestone Complete',
            statusContext: `All phases in ${state.currentMilestone} finished.`,
        };
    }
    // Check status of current phase
    const statusLower = state.status.toLowerCase();
    if (statusLower.includes('verify') || statusLower.includes('review')) {
        return {
            command: `verify ${currentPhaseNum}`,
            workflow: 'verify',
            arg: currentPhaseNum,
            label: `Verify Phase ${currentPhaseNum}`,
            reason: `Audit deliverables against must-haves for Phase ${currentPhaseNum}`,
            badge: 'Verification',
            statusContext: `You're currently in Phase ${currentPhaseNum} verification.`,
        };
    }
    // If there are plans but uncompleted
    if (state.totalPlans > 0 && state.completedPlans < state.totalPlans) {
        const remaining = state.totalPlans - state.completedPlans;
        return {
            command: `execute ${currentPhaseNum}`,
            workflow: 'execute',
            arg: currentPhaseNum,
            label: `Execute Phase ${currentPhaseNum}`,
            reason: `Execute remaining ${remaining} task(s) across subagents in parallel waves`,
            badge: 'Ready to Build',
            statusContext: `Phase ${currentPhaseNum} planning complete.`,
        };
    }
    // If plans exist and all are completed, but phase not marked complete -> verify
    if (state.totalPlans > 0 && state.completedPlans >= state.totalPlans) {
        return {
            command: `verify ${currentPhaseNum}`,
            workflow: 'verify',
            arg: currentPhaseNum,
            label: `Verify Phase ${currentPhaseNum}`,
            reason: `All ${state.totalPlans} plans executed. Verify phase deliverables.`,
            badge: 'Ready to Verify',
            statusContext: `Phase ${currentPhaseNum} execution done.`,
        };
    }
    // Otherwise need to plan current phase
    return {
        command: `plan ${currentPhaseNum}`,
        workflow: 'plan',
        arg: currentPhaseNum,
        label: `Plan Phase ${currentPhaseNum}`,
        reason: `Break Phase ${currentPhaseNum} into atomic, wave-executable tasks`,
        badge: 'Planning',
        statusContext: `You're currently in Phase ${currentPhaseNum}.`,
    };
}
//# sourceMappingURL=gsdState.js.map