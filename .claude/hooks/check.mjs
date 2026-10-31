// Stop hook: before the agent finishes, run the same checks as CI.
// Exit code 2 sends what failed back to the agent, and it keeps working.
import { execSync } from 'node:child_process'

// The hook's input isn't needed here, but read it so the hook never blocks on stdin.
await new Promise((resolve) => process.stdin.on('data', () => {}).on('end', resolve))

const cwd = process.env.CLAUDE_PROJECT_DIR
const changed = execSync('git status --porcelain', { cwd, encoding: 'utf8' }).trim()
if (!changed) process.exit(0) // Nothing changed since the last commit, so nothing to check.

try {
  execSync('npm run check', { cwd, encoding: 'utf8', stdio: 'pipe' })
} catch (error) {
  const output = `${error.stdout ?? ''}${error.stderr ?? ''}`
    .trim()
    .split('\n')
    .slice(-30)
    .join('\n')
  process.stderr.write(`npm run check failed. Fix this before you finish:\n\n${output}\n`)
  process.exit(2)
}
