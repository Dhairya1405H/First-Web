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
exports.WorkflowRunner = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class WorkflowRunner {
    /** Send a slash command with no arguments */
    run(command) {
        if (!this.requireWorkspace()) {
            return;
        }
        if (command === 'help') {
            this.showCategorizedHelp();
            return;
        }
        this.send(`/${command}`);
    }
    /** Print categorized GSD help reference */
    showCategorizedHelp() {
        if (!this.requireWorkspace()) {
            return;
        }
        const helpText = [
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            ' ⚡ GET SHIT DONE (GSD v1.7.1) — WORKFLOW REFERENCE',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            '🚀 START',
            '  /new-project       Gather context, interview user, lock SPEC.md baseline',
            '  /new-milestone     Start a new milestone cycle',
            '',
            '📐 PLAN',
            '  /map               Map codebase architecture and generate initial roadmap',
            '  /discuss-phase <N> Clarify requirements and key decisions for phase',
            '  /plan <N>          Technical discovery & atomic wave execution plans',
            '  /research-phase <N>Deep-dive research into phase tech stack',
            '  /add-phase         Append a new phase to the active roadmap',
            '',
            '⚙ BUILD',
            '  /execute <N>       Execute planned phase in isolated subagents with waves',
            '  /sprint            Fast, focused single-task cycle',
            '',
            '🔍 VERIFY',
            '  /verify <N>        Audit deliverables against must-haves',
            '  /debug             Diagnose issue with fresh debugger subagent',
            '',
            '📊 STATE',
            '  /progress          Display current project progress and what to do next',
            '  /pause             Save state and context before pausing',
            '  /resume            Restore context and continue execution',
            '  /add-todo          Capture a new todo item',
            '  /check-todos       Review pending and completed todos',
            '',
            '🩺 DIAGNOSTICS',
            '  /doctor            Inspect project health, state freshness, and integrity',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
        ].join('\n');
        const term = this.getOrCreateTerminal();
        term.show(true);
        term.sendText(`echo "${helpText.replace(/"/g, '\\"')}"`, true);
    }
    /** Display "What's Next?" recommendation banner in terminal */
    showNextActionBanner(statusContext, recommendedCmd, reason) {
        if (!this.requireWorkspace()) {
            return;
        }
        const banner = [
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            ' ⚡ GSD ► NEXT ACTION',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            statusContext,
            '',
            '▶ Recommended command:',
            `  ${recommendedCmd}`,
            '',
            `ℹ ${reason}`,
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
        ].join('\n');
        const term = this.getOrCreateTerminal();
        term.show(true);
        term.sendText(`echo "${banner.replace(/"/g, '\\"')}"`, true);
        // Pre-fill the recommended command so the user can just press Enter
        term.sendText(recommendedCmd.startsWith('/') ? recommendedCmd : `/${recommendedCmd}`, false);
    }
    /** Send a slash command with a single string argument */
    runWithArg(command, arg) {
        if (!this.requireWorkspace()) {
            return;
        }
        const safeArg = arg.includes(' ') ? `"${arg.replace(/"/g, '\\"')}"` : arg;
        this.send(`/${command} ${safeArg}`);
    }
    /** Prompt user for phase number and send workflow */
    async runWithPhasePrompt(command, defaultPhase) {
        if (!this.requireWorkspace()) {
            return;
        }
        const input = await vscode.window.showInputBox({
            title: `GSD /${command}`,
            prompt: 'Enter phase number or identifier to target',
            value: defaultPhase || '1',
            placeHolder: 'e.g. 1',
        });
        if (input !== undefined) {
            const trimmed = input.trim();
            if (trimmed.length > 0) {
                this.runWithArg(command, trimmed);
            }
            else {
                this.run(command);
            }
        }
    }
    /** Open a GSD markdown artifact directly in the editor */
    async openArtifact(relativeFilePath) {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
            vscode.window.showWarningMessage('GSD: No workspace folder open.');
            return;
        }
        const absPath = path.join(folders[0].uri.fsPath, relativeFilePath);
        if (fs.existsSync(absPath)) {
            const doc = await vscode.workspace.openTextDocument(absPath);
            await vscode.window.showTextDocument(doc, { preview: false });
        }
        else {
            const choice = await vscode.window.showInformationMessage(`GSD artifact "${relativeFilePath}" does not exist yet. Run a GSD workflow to initialize it.`, 'Run /new-project', 'Dismiss');
            if (choice === 'Run /new-project') {
                this.run('new-project');
            }
        }
    }
    requireWorkspace() {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
            vscode.window.showErrorMessage('GSD: No workspace folder open. Open a project folder first.', 'Open Folder').then(choice => {
                if (choice === 'Open Folder') {
                    vscode.commands.executeCommand('vscode.openFolder');
                }
            });
            return false;
        }
        return true;
    }
    send(text) {
        try {
            const term = this.getOrCreateTerminal();
            term.show(true);
            // Send without newline so the user can review before submitting
            term.sendText(text, false);
        }
        catch (err) {
            vscode.window.showErrorMessage(`GSD: Failed to open terminal — ${String(err)}`);
        }
    }
    getOrCreateTerminal() {
        if (this.terminal && this.isAlive(this.terminal)) {
            return this.terminal;
        }
        this.terminal = vscode.window.createTerminal({
            name: 'GSD',
            iconPath: new vscode.ThemeIcon('rocket'),
        });
        return this.terminal;
    }
    isAlive(term) {
        return vscode.window.terminals.includes(term);
    }
}
exports.WorkflowRunner = WorkflowRunner;
//# sourceMappingURL=workflowRunner.js.map