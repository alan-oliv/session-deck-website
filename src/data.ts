export const REPO = 'https://github.com/alan-oliv/session-deck'
export const DOWNLOAD = `${REPO}/releases/latest/download/Session-Deck-arm64.dmg`

export const KINDS = [
  { prefix: 'paste', title: 'Paste what the session left behind', body: 'A PR link, a file path, a claude.ai artifact link. The session that made it comes up. No prefix needed.', example: 'https://github.com/owner/repo/pull/27' },
  { prefix: '?', title: 'Ask in your own words', body: 'Describe what the session did. Filler words are dropped, the rest is matched against files, PRs, prompts and recaps.', example: '? the one that made team8 faster' },
  { prefix: 'file:', title: 'Files it changed', body: 'One row per changed file with its folder, the session and how many lines it added. Partial names and paths work.', example: 'file:src/transcribe' },
  { prefix: 'art:', title: 'Documents and artifacts', body: 'Plans, reports, specs and published claude.ai pages, by name, link or a word in their first lines.', example: 'art:veracity' },
  { prefix: 'pr:', title: 'PRs and commits', body: 'By number, URL, hash or commit message. Finds the session that opened the PR or made the commit.', example: 'pr:27' },
  { prefix: 'in:', title: 'One repository or folder', body: 'Narrow everything to a repo or a folder, then keep typing to filter inside it.', example: 'in:meetnotes live' },
  { prefix: 'is:', title: 'Status', body: 'Waiting on you, running, failed, completed, hidden or archived. Typing is: alone lists every status with its count.', example: 'is:waiting' },
  { prefix: 'when:', title: 'Time', body: 'Today, yesterday or the last seven days, going by each session’s last activity in your local time.', example: 'when:yesterday' },
]

export const ACTIONS = [
  ['Resume', 'Opens the session in your terminal, in the right folder'],
  ['Fork', 'Resumes with --fork-session and leaves the original as it is'],
  ['Copy resume command', 'Copies claude --resume <id>'],
  ['Open folder', 'Opens the session’s folder in Finder'],
  ['Open PR', 'Opens the session’s PR in your browser'],
  ['Rename', 'Give it a title that is not its first prompt'],
  ['Archive', 'Moves it out of every search and list'],
  ['Change terminal', 'Picks the terminal that resumes and forks sessions'],
] as const

export const SOURCE = `git clone git@github.com:alan-oliv/session-deck.git
cd session-deck
npm install
npm run dev`

export const UNQUARANTINE = `xattr -dr com.apple.quarantine "/Applications/Session Deck.app"`
