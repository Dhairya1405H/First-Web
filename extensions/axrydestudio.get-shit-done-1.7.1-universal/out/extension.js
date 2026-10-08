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
exports.activate = activate;
exports.getWorkspaceRoot = getWorkspaceRoot;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const workflowRunner_1 = require("./workflowRunner");
const assetInstaller_1 = require("./assetInstaller");
const gsdState_1 = require("./gsdState");
const missionControlView_1 = require("./missionControlView");
const setupWizard_1 = require("./setupWizard");
const doctor_1 = require("./doctor");
let missionControlView;
let fileWatchers = [];
let latestState;
function activate(context) {
    const runner = new workflowRunner_1.WorkflowRunner();
    const installer = new assetInstaller_1.AssetInstaller(context.extensionUri);
    // Create the webview panel provider
    missionControlView = new missionControlView_1.MissionControlView(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('gsd.missionControl', missionControlView));
    // Wire up commands
    const cmds = [
        ['gsd.initProject', (type) => runInitProject(installer, runner, missionControlView, typeof type === 'string' ? type : undefined)],
        ['gsd.setupWizard', () => runSetupWizardCommand(installer, runner, missionControlView)],
        ['gsd.whatNext', () => runWhatNext(runner)],
        ['gsd.doctor', () => runDoctorCommand(installer, missionControlView)],
        ['gsd.install', () => runInstall(installer, missionControlView)],
        ['gsd.newProject', () => runner.run('new-project')],
        ['gsd.map', () => runner.run('map')],
        ['gsd.plan', () => runner.runWithPhasePrompt('plan', latestState?.currentPhaseNumber)],
        ['gsd.execute', () => runner.runWithPhasePrompt('execute', latestState?.currentPhaseNumber)],
        ['gsd.verify', () => runner.runWithPhasePrompt('verify', latestState?.currentPhaseNumber)],
        ['gsd.debug', () => runner.run('debug')],
        ['gsd.progress', () => runProgressWithNextAction(runner)],
        ['gsd.addTodo', () => runAddTodo(runner)],
        ['gsd.checkTodos', () => runner.run('check-todos')],
        ['gsd.discussPhase', () => runner.runWithPhasePrompt('discuss-phase', latestState?.currentPhaseNumber)],
        ['gsd.researchPhase', () => runner.runWithPhasePrompt('research-phase', latestState?.currentPhaseNumber)],
        ['gsd.pause', () => runner.run('pause')],
        ['gsd.resume', () => runner.run('resume')],
        ['gsd.sprint', () => runner.run('sprint')],
        ['gsd.newMilestone', () => runner.run('new-milestone')],
        ['gsd.completeMilestone', () => runner.run('complete-milestone')],
        ['gsd.auditMilestone', () => runner.run('audit-milestone')],
        ['gsd.addPhase', () => runner.run('add-phase')],
        ['gsd.help', () => runner.run('help')],
        ['gsd.refresh', () => refreshPanel(missionControlView)],
        ['gsd.openArtifact', (file) => runner.openArtifact(typeof file === 'string' ? file : '.gsd/STATE.md')],
    ];
    for (const [cmd, handler] of cmds) {
        context.subscriptions.push(vscode.commands.registerCommand(cmd, handler));
    }
    // File watchers for .gsd artifacts
    setupWatchers(context, missionControlView);
    // Initial state refresh
    refreshPanel(missionControlView);
}
async function runInitProject(installer, runner, view, explicitType) {
    const ws = getWorkspaceRoot();
    if (!ws) {
        return;
    }
    const detected = installer.detectProject(ws);
    const targetType = explicitType || detected.type;
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `GSD: Initializing project (${targetType})...`,
        cancellable: false,
    }, async () => {
        await installer.initProject(ws, targetType);
        await refreshPanel(view);
    });
    const choice = await vscode.window.showInformationMessage(`✅ GSD initialized! Run /new-project to begin.`, '🚀 Run /new-project', '📊 Open Dashboard');
    if (choice === '🚀 Run /new-project') {
        runner.run('new-project');
    }
    else if (choice === '📊 Open Dashboard') {
        vscode.commands.executeCommand('workbench.view.extension.gsdContainer');
    }
}
async function runSetupWizardCommand(installer, runner, view) {
    const ws = getWorkspaceRoot();
    if (!ws) {
        return;
    }
    await (0, setupWizard_1.runSetupWizard)(installer, runner, ws, () => refreshPanel(view));
}
async function runWhatNext(runner) {
    const ws = getWorkspaceRoot();
    if (!ws) {
        return;
    }
    const state = await (0, gsdState_1.readGsdState)(ws);
    runner.showNextActionBanner(state.nextAction.statusContext, `/${state.nextAction.command}`, state.nextAction.reason);
}
async function runProgressWithNextAction(runner) {
    const ws = getWorkspaceRoot();
    if (ws) {
        const state = await (0, gsdState_1.readGsdState)(ws);
        runner.showNextActionBanner(state.nextAction.statusContext, `/${state.nextAction.command}`, state.nextAction.reason);
    }
    runner.run('progress');
}
async function runDoctorCommand(installer, view) {
    const ws = getWorkspaceRoot();
    if (!ws) {
        return;
    }
    const report = await (0, doctor_1.runDoctor)(ws);
    view.setDoctorReport(report);
    const issues = report.items.filter(i => i.status !== 'ok');
    const actions = ['📊 View in Mission Control'];
    if (report.canAutoFix) {
        actions.unshift('⚡ Fix Issues');
    }
    const choice = await vscode.window.showInformationMessage(`GSD Doctor: Health ${report.healthScore}/100 (${issues.length === 0 ? 'All systems green' : `${issues.length} issue(s) detected`})`, ...actions);
    if (choice === '⚡ Fix Issues') {
        const msg = await (0, doctor_1.autoFixDoctorIssues)(ws, installer);
        vscode.window.showInformationMessage(`GSD Doctor: ${msg}`);
        await refreshPanel(view);
    }
    else if (choice === '📊 View in Mission Control') {
        vscode.commands.executeCommand('workbench.view.extension.gsdContainer');
    }
}
async function runInstall(installer, view) {
    const ws = getWorkspaceRoot();
    if (!ws) {
        return;
    }
    const result = await installer.install(ws);
    const parts = [];
    if (result.installed.length) {
        parts.push(`Installed: ${result.installed.length} file(s)`);
    }
    if (result.skipped.length) {
        parts.push(`Skipped: ${result.skipped.length} file(s)`);
    }
    if (result.overwritten.length) {
        parts.push(`Updated: ${result.overwritten.length} file(s)`);
    }
    if (result.failed.length) {
        parts.push(`Failed: ${result.failed.join(', ')}`);
    }
    vscode.window.showInformationMessage(`GSD: ${parts.join(' | ')}`);
    await refreshPanel(view);
}
async function runAddTodo(runner) {
    const todo = await vscode.window.showInputBox({
        title: 'GSD: Add Todo Item',
        prompt: 'Describe the todo item to append to TODO.md',
        placeHolder: 'e.g. Fix the login form validation `high`',
    });
    if (todo && todo.trim().length > 0) {
        runner.runWithArg('add-todo', todo.trim());
    }
}
async function refreshPanel(view) {
    const ws = getWorkspaceRoot();
    latestState = ws ? await (0, gsdState_1.readGsdState)(ws) : undefined;
    const docReport = ws ? await (0, doctor_1.runDoctor)(ws) : undefined;
    view.update(latestState, docReport);
}
function setupWatchers(context, view) {
    const watcher = vscode.workspace.createFileSystemWatcher('**/.gsd/**/*.md');
    watcher.onDidChange(() => refreshPanel(view));
    watcher.onDidCreate(() => refreshPanel(view));
    watcher.onDidDelete(() => refreshPanel(view));
    fileWatchers.push(watcher);
    context.subscriptions.push(watcher);
    // Also watch root state/rule files if placed in workspace
    const rootWatcher = vscode.workspace.createFileSystemWatcher('**/{PROJECT_RULES.md,GSD-STYLE.md,VERSION}');
    rootWatcher.onDidChange(() => refreshPanel(view));
    rootWatcher.onDidCreate(() => refreshPanel(view));
    rootWatcher.onDidDelete(() => refreshPanel(view));
    fileWatchers.push(rootWatcher);
    context.subscriptions.push(rootWatcher);
}
function getWorkspaceRoot() {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
        vscode.window.showErrorMessage('GSD: No workspace folder open. Open a project folder first.', 'Open Folder').then(choice => {
            if (choice === 'Open Folder') {
                vscode.commands.executeCommand('vscode.openFolder');
            }
        });
        return undefined;
    }
    return folders[0].uri.fsPath;
}
function deactivate() {
    for (const w of fileWatchers) {
        w.dispose();
    }
    fileWatchers = [];
}
//# sourceMappingURL=extension.js.map