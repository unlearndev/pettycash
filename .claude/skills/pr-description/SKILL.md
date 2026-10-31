---
name: pr-description
description: Drafts a pull request description in the team's format, for a branch or the current one. Run it with /pr-description before you open a pull request.
argument-hint: '[branch]'
disable-model-invocation: true
---

Draft a pull request description for the branch `$ARGUMENTS`, or the current branch if no branch is given, for a reviewer on the payments team.

1. Read what changed against `main`: `git log --oneline main..<branch>` and `git diff main...<branch>`.
2. Write the description in exactly this format:

   ## What changed

   One or two sentences on what the change does for someone using Pettycash.

   ## Why

   The reason, from the commits or this conversation. If you can't tell, write "TODO: why" instead of guessing.

   ## How it was made

   What Claude Code wrote, and anything it was told that a reviewer should know.

   ## What I checked
   - [ ] I've read every line of the diff
   - [ ] `npm run check` passes
   - [ ] I tried it in the app:

   ## Look closely at

   Anything that touches money, permissions or stored data, and anything without a test.

3. Leave every box under "What I checked" unticked, and leave the line after "I tried it in the app:" empty. Only the author can fill that section in.
4. Print the description. Don't push, commit, or open the pull request.
