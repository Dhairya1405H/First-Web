# Change Log

## 0.23.0

### Breaking Changes

- Remove the Plan tab and IDE planning from the sidebar; reviews are now the single sidebar view.

### Improvements

- Make the reviewed files list collapsible.

### Fixes

- Search all organizations in SSO workspaces when changing organizations, not only the loaded page.
- Keep findings unresolved when copying Fix with AI instructions to the clipboard fails.
- Ignore stale credential-expiry responses after switching organizations so the sign-in prompt does not log out the newly selected organization.
- Strip credentials from Git remote URLs before sending them to CodeRabbit.

## 0.22.0

### Improvements

- Add opt-in review completion notifications, including macOS Notification Center alerts and a Show Review action for successful reviews.
- Add an opt-in completion sound for successful reviews when the CodeRabbit panel has been opened in the current window.
- Add the `coderabbit.respectGitIgnore` setting to control whether Git-reported ignored untracked files are included in local reviews; tracked and staged files remain eligible.
- Suggest connecting repositories to CodeRabbit for pull request reviews through an optional prompt after local review submission.
- Show personal review usage and the shared subscription spending cap from the account menu, with warnings when reviews approach the cap.

### Fixes

- Apply suggested changes to the live reviewed range, preserving unsaved edits and duplicate snippets elsewhere and rejecting stale targets.
- Preserve literal filenames containing special characters when opening review diffs.
- Mask pasted sign-in tokens and self-hosted GitHub personal access tokens.
- Prompt users to sign in again when Git provider credentials expire or are revoked instead of falling back to a Free plan.
- Clear selected plans when switching organizations and discard stale plan results from the previous organization.
- Preserve IME composition in the plan composer and file search so Enter does not submit prompts or select files while composing text.
- Preserve file mentions in multiline plan prompts.
- Open review files with Enter and add an accessible name to the primary review type selector.
- Migrate saved region choices to the Account region setting before connecting, preserving existing account-region preferences.

## 0.21.9

### Improvements

- Add a separate Fix with AI action for all unresolved nitpicks.
- Clarify that the selected region must match the region where the CodeRabbit account is hosted and that changing it does not migrate the account.

### Fixes

- Add accessible labels to the review file search, plan composer, and review comment controls.
- Expose the Plan composer as a multiline textbox and announce whether the Plan generation timeline is expanded or collapsed.
- Keep sign-in recoverable when the browser or authentication callback fails, with a copyable login link and bounded retry flow.
- Preserve Autopilot capability denial reasons and show actionable guidance when capability checks fail or time out.
- Scope review event subscriptions to the active review so stale subscriptions cannot interrupt newer reviews and unused setup subscriptions are retired.
- Stop retrying connections after workspace SSO rejects the session and show guidance to sign in again.
- Prevent cancelled or timed-out review setup attempts from restarting later.
- Support sending Codex Fix with AI prompts through PowerShell and Command Prompt on Windows.
- Reveal truncated organization names when they do not fit in the account menu.
- Use user-level Fix with AI agent and auto-start settings in untrusted workspaces.

## 0.21.8

### Fixes

- Keep review file and configuration uploads within the selected workspace, including symlinked paths and reused review history.
- Add an accessible label to the planning context search.

## 0.21.7

### Fixes

- Offer eligible organization members without an assigned seat the option to start a Free local review.
- Recover from organization region mismatches by switching to the correct region and prompting users to sign in again.
- Keep available review options and file selections up to date after commits and other Git changes.
- Clarify that planning is available on Team, Advanced, and Enterprise plans.

## 0.21.6

### Fixes

- Improve handling of oversized local reviews.
- Stop server-side review work when an IDE review is cancelled or times out during setup.

## 0.21.5

### Fixes

- Surface review startup failures instead of leaving reviews stuck during setup.

## 0.21.4

### Fixes

- Initialize the CodeRabbit sidebar and persisted inline review comments together when Cursor activates or reloads the extension.

## 0.21.3

### Fixes

- Report partial and failed reviews accurately in the extension.
- Distinguish repositories from Git worktrees and provide separate switchers.

## 0.21.2

### Fixes

- Prompt returning users to choose an organization during VS Code sign-in so access resolves against the selected organization.

## 0.21.1

### Improvements

- Add a visible action below suggested diffs so they can be applied directly from review comments.

## 0.21.0

###

- Add general feedback survey.

## 0.20.7

### Fixes

- Fix websocket cleanup.

## 0.20.5

### Fixes

- Fix login.

## 0.20.4

### Fixes

- Prevent long generated plan titles from causing plan creation failures.

## 0.20.3

### Fixes

- Keep the Pro+ upsell banner dismissed after a user closes it.

## 0.20.2

### Improvements

- Choose which uncommitted files to include before starting a review.

## 0.20.1

### Fixes

- Fix lifecycle events capture.

## 0.20.0

### Improvements

- Create and review CodeRabbit plans in VS Code, including research, assumptions, and phased implementation steps.
- Select plan phases and hand their implementation prompts to your configured AI coding agent.

## 0.19.3

### Fixes

- Assign seats for trial users when checking extension access.
- Respect manual seat assignment for active plans when checking extension access.

## 0.19.2

### Fixes

- Stabilize file selection when switching between uncommitted, committed, and all review types.
- Refresh stale Git repository state when previously selected repository roots are no longer available.

## 0.19.1

### Fixes

- Open the upgrade page in the external browser and report failures when the browser cannot be opened.

## 0.19.0

### Improvements

- Add configuration to connect to the EU region.

## 0.18.6

### Fixes

- Minor bug-fixes

## 0.18.5

### Improvements

- Added support for logging in via Single Sign-on for customers with an enterprise plan.

## 0.18.3

### Improvements

- Change org switching behavior

## 0.18.2

### Fixes

- Minor fix in api not sending org correctly

## 0.18.1

### Fixes

- Fix file name wrap for long filenames
- Allow current branch to be selected in the base branch list

## 0.18.0

### Improvements

- Add support for Claude Code VS Code & Windsurf Cascade extension as handoff targets
- Add configuration setting to control agent handoff behavior

## 0.17.0

### Features

- Handoff plans from UI to agents using extension

## 0.16.10

### Fixes

- Login flow patch

## 0.16.9

### Fixes

- Login flow patch

## 0.16.9

### Fixes

- Minor bugs

## 0.16.8

### Fixes

- Add telemetry events

## 0.16.7

### Fixes

- Minor bugs

## 0.16.6

### Fixes

- Patch issue with login redirect url

## 0.16.5

### Improvements

- Have "Fix all with AI" enabled for all plans

## 0.16.4

### Improvements

- Update README

## 0.16.3

### Fixes

- Fix issue with review title not getting applied
- Fix reviews being cancelled for jj(jujutsu) users

## 0.16.2

### Fixes

- fix state management for plans

## 0.16.1

### Fixes

- Minor bugs

## 0.16.0

### Fixes(Breaking)

- Move all workspace state data to a file-backed storage service. Cached reviews stored in earlier versions will not carry over when you upgrade.

### Additions

- Add the `Cleanup previous reviews` command to delete cached review artifacts from workspace state which was causing extension to crash.

## 0.15.2

### Fixes

- Minor bugs

## 0.15.1

### Fixes

- Minor fix on client id duplications

## 0.15.0

### Improvements

- Optimizations for extension load time

## 0.14.3

### Improvements

- Show review comment severity in comment label

### Fixes

- Fix minor bug with reconnection on review error

## 0.14.2

### Improvements

- Fix dark theme in vscode

## 0.14.1

### Fixes

- Fix websocket connections issues

## 0.14.0

### Improvements

- Upgrade version of used packages and improve connection issues

## 0.13.6

### Improvements

- Add events logs from server

## 0.13.5

### Fixes

- Fix opencode agent not starting properly

## 0.13.4

### Fixes

- Show full data in log output channel

## 0.13.3

### Fixes

- Fix duplicate user being created for azure-devops

## 0.13.2

### Fixes

- Fix null access a field on older reviews

## 0.13.1

### Improvements

- Show logs in output channel

## 0.13.0

### Fixes

- Remove reviews from other branch on branch change.
- Support detached head state for reviews

## 0.12.1

### Fixes

- Improve storing of github pat for self-hosted CodeRabbit with GitHub

## 0.12.0

### Improvements

- CodeRabbit extension now works with self-hosted CodeRabbit

## 0.11.2

### Improvements

- Add opencode as new agent for "Fix with AI"

## 0.11.1

### Improvements

- Show plan the user is on in the account section

### Fixes

- Fix "Fix all issues" for terminal agents, claude code/codex cli

## 0.11.0

### Improvements

- "Fix all with AI" is now available for pro plan users.
- Add "Provide feedback" to submit feedback for comments that are not helpful.
- Improve the UI to show progress of fixing issues identified.
- UI enhancements to allowing unresolving a comment, show comments that are resolved in a better way.

## 0.10.2

### Improvements

- "Fix with AI" now properly provides context to Cursor agent
- Add Augment code to "Fix with AI" agents

## 0.10.1

### Improvements

- Minor enhancements in icons

## 0.10.0

### Improvements

- Review comments are resolved when actions are performed on them

## 0.9.1

### Improvements

- Show nitpick comments for reviews

## 0.9.0

### Improvements

- Fix issues with applying suggestions
- Improve comment rendering logic

## 0.8.3

### Improvements

- Added settings icon in sidebar

## 0.8.2

### Improvements

- Show file status indicators
- Change auto review default to prompt the user to review

### Fixes

- Fix styling issues in the sidebar
- Cancel review in old branch when switching to a new branch

## 0.8.1

### Improvements

- Add "Fix with AI" support for Cline, Roo and Kilo Code

### Fixes

- Fix first time uncommitted review issue

## 0.8.0

### Improvements

- Reviews are now incremental for a branch.

## 0.7.11

### Fixes

- Optimize file comparison

## 0.7.10

### Fixes

- Fix file diffing in case of outdated base branch
- Improve rate limit messaging

## 0.7.9

### Improvements

- Show login link for users in case redirect fails
- Change auto review default to auto
- Show notification when review comments are available

### Fixes

- Fix state issues in login
- Remove status indicator

## 0.7.8

### Improvements

- Send local .coderabbit.yaml in review
- Show update notification when new version is available

### Fixes

- Fix auto review issue on default branch
- Fix issue in coderabbit line decorations

## 0.7.7

- Improved – Gracefully handle cases where Git is not enabled in the workspace.

## 0.7.6

- Fixed issues with detecting the correct base branch during reviews

## 0.7.5

- CodeRabbit now supports logging in using a token

## 0.7.4

- Bug fixes and performance improvements

## 0.7.3

- Support subfolders of parent git repo

## 0.7.2

- Bug fixes and performance improvements

## 0.7.1

- Fix bug related to reviews being skipped when a large number of files are excluded by the system

## 0.7.0

- Bug fixes and improvements

## 0.6.3

- Bug fixes

## 0.6.2

- Bug fixes and performance improvements

## 0.6.1

- Bug fixes and UI improvements

## 0.6.0

- CodeRabbit now works on uncommitted changes
- CodeRabbit can now automatically review your code when you commit changes
- Bug fixes and UI improvements

## 0.5.7

- You can now fix comments by CodeRabbit with other AI Agents

## 0.5.6

- Bug fixes and UI improvements

## 0.5.5

- Bug fixes and UI improvements

## 0.5.4

- Fixed an issue where the extension would lose connectivity to the server while a review was in progress
- Improved error handling and connection issues

## 0.5.3

- Fix an issue where reviews could get stuck waiting to start

## 0.5.0

- Show comments in editor

## 0.4.6

- Bug fixes and UI improvements

## 0.4.5

- Initial release
