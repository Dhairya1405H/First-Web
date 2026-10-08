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
exports.AssetInstaller = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class AssetInstaller {
    constructor(extensionUri) {
        this.assetsRoot = path.join(extensionUri.fsPath, 'gsd-assets');
    }
    /** Detect project type from workspace files */
    detectProject(workspaceRoot) {
        // Mobile checks
        if (fs.existsSync(path.join(workspaceRoot, 'pubspec.yaml')) ||
            fs.existsSync(path.join(workspaceRoot, 'android')) && fs.existsSync(path.join(workspaceRoot, 'ios')) ||
            fs.existsSync(path.join(workspaceRoot, 'app.json'))) {
            return { type: 'mobile', label: 'Mobile App', details: 'Detected Flutter/React Native/Native mobile artifacts' };
        }
        // AI / ML checks
        if (fs.existsSync(path.join(workspaceRoot, 'model_capabilities.yaml')) ||
            fs.existsSync(path.join(workspaceRoot, 'notebooks')) ||
            fs.existsSync(path.join(workspaceRoot, 'requirements.txt')) &&
                fs.readFileSync(path.join(workspaceRoot, 'requirements.txt'), 'utf8').toLowerCase().includes('torch')) {
            return { type: 'ai', label: 'AI Project', details: 'Detected AI/ML frameworks or notebooks' };
        }
        // Web app checks (React, Next.js, Vue, Vite, etc.)
        const pkgPath = path.join(workspaceRoot, 'package.json');
        if (fs.existsSync(pkgPath)) {
            try {
                const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
                const deps = { ...pkg.dependencies, ...pkg.devDependencies };
                if (deps['next'] || deps['react'] || deps['vue'] || deps['svelte'] || deps['vite']) {
                    return { type: 'web', label: 'Web App', details: `Detected modern web framework (${pkg.name || 'frontend'})` };
                }
                if (deps['express'] || deps['fastify'] || deps['nest'] || deps['koa']) {
                    return { type: 'backend', label: 'Backend API', details: 'Detected Node.js backend server' };
                }
            }
            catch { /* ignore JSON error */ }
            return { type: 'web', label: 'Web / Node.js App', details: 'Detected package.json' };
        }
        // Backend checks (Go, Rust, Python, Java)
        if (fs.existsSync(path.join(workspaceRoot, 'go.mod'))) {
            return { type: 'backend', label: 'Backend (Go)', details: 'Detected Go module' };
        }
        if (fs.existsSync(path.join(workspaceRoot, 'Cargo.toml'))) {
            return { type: 'backend', label: 'Backend (Rust)', details: 'Detected Cargo package' };
        }
        if (fs.existsSync(path.join(workspaceRoot, 'pyproject.toml')) ||
            fs.existsSync(path.join(workspaceRoot, 'requirements.txt')) ||
            fs.existsSync(path.join(workspaceRoot, 'manage.py'))) {
            return { type: 'backend', label: 'Backend (Python)', details: 'Detected Python backend project' };
        }
        return { type: 'general', label: 'General Project', details: 'Standard codebase' };
    }
    /**
     * One-click silent initialization: copies all essential assets into workspace
     * without blocking questions unless there's a strict collision.
     */
    async initProject(workspaceRoot, projectType) {
        return this.install(workspaceRoot, { silentOverwriteDefaults: true, projectType });
    }
    async install(workspaceRoot, options = {}) {
        const result = { installed: [], skipped: [], overwritten: [], failed: [] };
        if (!fs.existsSync(this.assetsRoot)) {
            vscode.window.showErrorMessage('GSD: Bundled assets not found. Try reinstalling the extension.');
            return result;
        }
        const files = this.collectFiles(this.assetsRoot);
        let overwriteAll = options.silentOverwriteDefaults ?? false;
        let skipAll = false;
        for (const srcAbs of files) {
            const rel = path.relative(this.assetsRoot, srcAbs);
            const destAbs = path.join(workspaceRoot, rel);
            try {
                let srcContent = fs.readFileSync(srcAbs, 'utf8');
                const destExists = fs.existsSync(destAbs);
                // If initializing with a specific project type, add a header tag in PROJECT_RULES.md if installing
                if (rel === 'PROJECT_RULES.md' && options.projectType && !destExists) {
                    srcContent = `<!-- GSD Project Profile: ${options.projectType.toUpperCase()} -->\n` + srcContent;
                }
                if (destExists) {
                    const destContent = fs.readFileSync(destAbs, 'utf8');
                    if (srcContent === destContent) {
                        result.skipped.push(rel);
                        continue;
                    }
                    if (skipAll) {
                        result.skipped.push(rel);
                        continue;
                    }
                    if (!overwriteAll) {
                        const choice = await vscode.window.showWarningMessage(`GSD: "${rel}" already exists and differs from the bundled version. Overwrite?`, { modal: false }, 'Overwrite', 'Overwrite All', 'Skip', 'Skip All');
                        if (choice === 'Overwrite All') {
                            overwriteAll = true;
                        }
                        else if (choice === 'Skip All') {
                            skipAll = true;
                            result.skipped.push(rel);
                            continue;
                        }
                        else if (choice !== 'Overwrite') {
                            result.skipped.push(rel);
                            continue;
                        }
                    }
                    this.writeFile(destAbs, srcContent);
                    result.overwritten.push(rel);
                }
                else {
                    this.writeFile(destAbs, srcContent);
                    result.installed.push(rel);
                }
            }
            catch (err) {
                result.failed.push(rel);
                console.error(`GSD install error for "${rel}":`, err);
            }
        }
        return result;
    }
    writeFile(destAbs, content) {
        const dir = path.dirname(destAbs);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(destAbs, content, 'utf8');
    }
    collectFiles(dir) {
        const results = [];
        const ignored = new Set(['.git', '.DS_Store', 'Thumbs.db']);
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (ignored.has(entry.name)) {
                continue;
            }
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                results.push(...this.collectFiles(full));
            }
            else {
                results.push(full);
            }
        }
        return results;
    }
}
exports.AssetInstaller = AssetInstaller;
//# sourceMappingURL=assetInstaller.js.map