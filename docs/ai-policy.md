# How we use AI on Pettycash

Agreed by the payments team. We run it as a two-week pilot with Alex, Priya and Sam, review it with what we've learned, then roll it out to the whole team.

| #   | Rule                                                                                           | Where it's enforced                                                                     |
| --- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | The agent follows our conventions in CONTRIBUTING.md.                                          | AGENTS.md, committed to the repo                                                        |
| 2   | The agent never reads `.env` or any other secrets.                                             | Deny rules in the project's settings, and in managed settings so nobody can remove them |
| 3   | The agent asks before anything leaves your machine, like a push.                               | Ask rules in the project's settings                                                     |
| 4   | Lint, formatting and tests pass before the agent says it's done.                               | Hooks in the project's settings                                                         |
| 5   | Commits made with the agent say so.                                                            | Claude Code's commit trailer, which is on by default                                    |
| 6   | Whoever opens a pull request has read every line, and says what they checked.                  | People. The `/pr-description` skill leaves that part to you                             |
| 7   | Nobody turns off permission checks on a work machine.                                          | Managed settings                                                                        |
| 8   | We track usage, cost and the commands the agent runs, per person, and never what anyone types. | Telemetry from managed settings, with prompts left out                                  |
| 9   | We review this policy at the end of the pilot, then every quarter.                             | People                                                                                  |

## Personal setup

Your own preferences, like how short you want answers, stay in your own files: `~/.claude/CLAUDE.md`, `CLAUDE.local.md` or `.claude/settings.local.json`. None of them are committed.
