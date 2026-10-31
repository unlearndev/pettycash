// PostToolUse hook: format the file the agent just wrote, with the project's Prettier settings.
import { execFileSync } from 'node:child_process'

let input = ''
for await (const chunk of process.stdin) input += chunk
const file = JSON.parse(input).tool_input?.file_path

// On Windows, npx is npx.cmd, which needs a shell, and the shell needs the path quoted.
const shell = process.platform === 'win32'

if (file) {
  try {
    execFileSync('npx', ['prettier', '--write', '--ignore-unknown', shell ? `"${file}"` : file], {
      cwd: process.env.CLAUDE_PROJECT_DIR,
      stdio: 'ignore',
      shell,
    })
  } catch {
    // A file Prettier can't parse is left alone. The Stop hook's checks will catch it.
  }
}
