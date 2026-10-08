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
exports.runDoctor = runDoctor;
exports.autoFixDoctorIssues = autoFixDoctorIssues;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
async function runDoctor(workspaceRoot) {
    const items = [];
    let score = 100;
    const gsdDir = path.join(workspaceRoot, '.gsd');
    const agentDir = path.join(workspaceRoot, '.agent');
    const agentsDir = path.join(workspaceRoot, '.agents');
    const geminiDir = path.join(workspaceRoot, '.gemini');
    const rulesFile = path.join(workspaceRoot, 'PROJECT_RULES.md');
    const specFile = path.join(gsdDir, 'SPEC.md');
    const roadmapFile = path.join(gsdDir, 'ROADMAP.md');
    const stateFile = path.join(gsdDir, 'STATE.md');
    const gitDir = path.join(workspaceRoot, '.git');
    // 1. GSD Core Installation
    if (fs.existsSync(gsdDir) && fs.existsSync(agentDir) && fs.existsSync(agentsDir)) {
        items.push({
            id: 'install',
            label: 'GSD installation',
            status: 'ok',
            message: 'All core folders (.gsd, .agent, .agents) present',
        });
    }
    else {
        score -= 25;
        items.push({
            id: 'install',
            label: 'GSD installation',
            status: 'fail',
            message: 'Missing core GSD directories in workspace',
            fixable: true,
        });
    }
    // 2. Rules & Gemini Config
    if (fs.existsSync(rulesFile) && fs.existsSync(geminiDir)) {
        items.push({
            id: 'rules',
            label: 'Project Rules & Antigravity Config',
            status: 'ok',
            message: 'PROJECT_RULES.md and .gemini rules active',
        });
    }
    else {
        score -= 10;
        items.push({
            id: 'rules',
            label: 'Project Rules & Antigravity Config',
            status: 'warn',
            message: 'PROJECT_RULES.md or .gemini missing — subagents may lack context',
            fixable: true,
        });
    }
    // 3. SPEC.md Check
    if (!fs.existsSync(specFile)) {
        score -= 20;
        items.push({
            id: 'spec',
            label: 'SPEC.md',
            status: 'fail',
            message: 'SPEC.md is missing. Run /new-project to initialize specification.',
        });
    }
    else {
        const specContent = fs.readFileSync(specFile, 'utf8');
        if (specContent.trim().length === 0) {
            score -= 15;
            items.push({
                id: 'spec',
                label: 'SPEC.md',
                status: 'warn',
                message: 'SPEC.md is empty.',
                fixable: true,
            });
        }
        else if (!/FINALIZED/i.test(specContent)) {
            score -= 8;
            items.push({
                id: 'spec',
                label: 'SPEC.md',
                status: 'warn',
                message: 'SPEC.md is still in DRAFT status.',
            });
        }
        else {
            items.push({
                id: 'spec',
                label: 'SPEC.md',
                status: 'ok',
                message: 'Finalized specification baseline locked',
            });
        }
    }
    // 4. ROADMAP.md Check
    if (!fs.existsSync(roadmapFile)) {
        score -= 15;
        items.push({
            id: 'roadmap',
            label: 'ROADMAP.md',
            status: 'warn',
            message: 'ROADMAP.md is missing. Run /map or /plan 1 to generate phases.',
        });
    }
    else {
        const roadmapContent = fs.readFileSync(roadmapFile, 'utf8');
        const hasPhases = /###\s+Phase|\s*-\s*\[[ x]\]\s*Phase/i.test(roadmapContent);
        if (hasPhases) {
            items.push({
                id: 'roadmap',
                label: 'ROADMAP.md',
                status: 'ok',
                message: 'Roadmap with structured phases verified',
            });
        }
        else {
            score -= 8;
            items.push({
                id: 'roadmap',
                label: 'ROADMAP.md',
                status: 'warn',
                message: 'ROADMAP.md found but no phases detected.',
            });
        }
    }
    // 5. STATE.md & Freshness Check
    if (!fs.existsSync(stateFile)) {
        score -= 15;
        items.push({
            id: 'state',
            label: 'STATE.md',
            status: 'warn',
            message: 'STATE.md missing. Run /progress or /plan to create initial state.',
            fixable: true,
        });
    }
    else {
        const stat = fs.statSync(stateFile);
        const ageInHours = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60);
        if (ageInHours > 72) {
            score -= 8;
            items.push({
                id: 'state',
                label: 'STATE.md Freshness',
                status: 'warn',
                message: `STATE.md hasn't been updated recently (${Math.round(ageInHours / 24)}d ago).`,
            });
        }
        else {
            items.push({
                id: 'state',
                label: 'STATE.md',
                status: 'ok',
                message: 'State tracking active and updated recently',
            });
        }
    }
    // 6. Git Repository Check
    if (fs.existsSync(gitDir)) {
        items.push({
            id: 'git',
            label: 'Git repository',
            status: 'ok',
            message: 'Git version control detected',
        });
    }
    else {
        score -= 5;
        items.push({
            id: 'git',
            label: 'Git repository',
            status: 'warn',
            message: 'Workspace is not a git repository. Atomic rollback may be limited.',
        });
    }
    // 7. Corrupted / zero-byte markdown check
    let corrupted = 0;
    if (fs.existsSync(gsdDir)) {
        for (const file of fs.readdirSync(gsdDir)) {
            if (file.endsWith('.md')) {
                const fPath = path.join(gsdDir, file);
                try {
                    const st = fs.statSync(fPath);
                    if (st.size === 0) {
                        corrupted++;
                    }
                }
                catch { /* ignore */ }
            }
        }
    }
    if (corrupted > 0) {
        score -= 10;
        items.push({
            id: 'artifacts',
            label: 'Artifact Integrity',
            status: 'warn',
            message: `${corrupted} empty or truncated markdown file(s) found in .gsd/`,
            fixable: true,
        });
    }
    else {
        items.push({
            id: 'artifacts',
            label: 'Artifact Integrity',
            status: 'ok',
            message: 'No corrupted or empty artifacts',
        });
    }
    // Bound score
    const healthScore = Math.max(0, Math.min(100, score));
    const canAutoFix = items.some(i => i.fixable && (i.status === 'warn' || i.status === 'fail'));
    let summary = `Health: ${healthScore}/100`;
    if (healthScore >= 90) {
        summary += ' — Excellent! Project is fully configured and ready.';
    }
    else if (healthScore >= 70) {
        summary += ' — Good condition with minor suggestions.';
    }
    else {
        summary += ' — Action needed: GSD files or state need initialization.';
    }
    return {
        healthScore,
        items,
        summary,
        canAutoFix,
    };
}
async function autoFixDoctorIssues(workspaceRoot, installer) {
    const installRes = await installer.initProject(workspaceRoot);
    const restored = installRes.installed.length + installRes.overwritten.length;
    return `Restored and synchronized ${restored} GSD asset(s) and templates.`;
}
//# sourceMappingURL=doctor.js.map