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
exports.runSetupWizard = runSetupWizard;
const vscode = __importStar(require("vscode"));
async function runSetupWizard(installer, runner, workspaceRoot, onComplete) {
    const detected = installer.detectProject(workspaceRoot);
    const items = [
        {
            label: '$(globe) Web App',
            description: 'React, Next.js, Vite, Vue, Svelte, static web',
            detail: detected.type === 'web' ? '⭐ (Detected in workspace)' : undefined,
            projectType: 'web',
        },
        {
            label: '$(device-mobile) Mobile App',
            description: 'Flutter, React Native, iOS, Android',
            detail: detected.type === 'mobile' ? '⭐ (Detected in workspace)' : undefined,
            projectType: 'mobile',
        },
        {
            label: '$(server) Backend',
            description: 'Node.js, Express, Python, FastAPI, Go, Rust, Java',
            detail: detected.type === 'backend' ? '⭐ (Detected in workspace)' : undefined,
            projectType: 'backend',
        },
        {
            label: '$(sparkle) AI Project',
            description: 'AI agents, LLM pipelines, PyTorch, LangChain',
            detail: detected.type === 'ai' ? '⭐ (Detected in workspace)' : undefined,
            projectType: 'ai',
        },
        {
            label: '$(file-code) Other / General',
            description: 'Standard library, CLI tool, or custom architecture',
            detail: detected.type === 'general' ? '⭐ (Detected in workspace)' : undefined,
            projectType: 'general',
        },
    ];
    // Put detected item on top
    items.sort((a, b) => (b.projectType === detected.type ? 1 : 0) - (a.projectType === detected.type ? 1 : 0));
    const selected = await vscode.window.showQuickPick(items, {
        title: 'Welcome to GSD 👋 — Project Setup Wizard',
        placeHolder: `Select your project type (Detected: ${detected.label})`,
        matchOnDescription: true,
        matchOnDetail: true,
    });
    if (!selected) {
        return;
    }
    const progressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: `GSD: Initializing ${selected.label}...`,
        cancellable: false,
    };
    await vscode.window.withProgress(progressOptions, async () => {
        await installer.initProject(workspaceRoot, selected.projectType);
        if (onComplete) {
            await onComplete();
        }
    });
    const choice = await vscode.window.showInformationMessage(`✅ GSD initialized for ${selected.label}! Run /new-project to begin.`, '🚀 Run /new-project', '📊 Open Mission Control');
    if (choice === '🚀 Run /new-project') {
        runner.run('new-project');
    }
    else if (choice === '📊 Open Mission Control') {
        vscode.commands.executeCommand('workbench.view.extension.gsdContainer');
    }
}
//# sourceMappingURL=setupWizard.js.map