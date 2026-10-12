import { motion } from 'motion/react'
import { useState } from 'react'
import { ACTIONS, DOWNLOAD, KINDS, REPO, SOURCE, UNQUARANTINE } from './data'
import { Reveal, rise, stagger } from './Reveal'

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M16.37 12.78c.03 3.2 2.81 4.26 2.84 4.28-.02.08-.44 1.52-1.46 3.01-.88 1.29-1.8 2.57-3.24 2.6-1.42.03-1.87-.84-3.49-.84-1.62 0-2.12.81-3.46.87-1.39.05-2.45-1.39-3.34-2.68-1.82-2.63-3.21-7.42-1.34-10.66.93-1.61 2.58-2.63 4.38-2.65 1.37-.03 2.66.92 3.49.92.84 0 2.4-1.14 4.05-.97.69.03 2.63.28 3.87 2.1-.1.06-2.31 1.35-2.3 4.02zM13.74 4.9c.74-.9 1.24-2.14 1.1-3.38-1.07.04-2.36.71-3.12 1.6-.69.79-1.29 2.06-1.13 3.27 1.19.09 2.41-.6 3.15-1.49z" />
  </svg>
)

const button = 'inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-[background-color,transform,box-shadow] duration-200 cursor-pointer select-none'
const primary = `${button} bg-brand text-white shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset,0_8px_30px_-10px_rgba(87,91,199,.9)] hover:bg-[#6468d6]`
const secondary = `${button} border border-border-strong bg-surface text-text hover:border-dim hover:bg-raised`

function DownloadButton({ className = '' }: { className?: string }) {
  return (
    <motion.a whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} href={DOWNLOAD} className={`${primary} ${className}`}>
      <AppleIcon />
      Download for macOS
    </motion.a>
  )
}

function Nav() {
  const link = 'text-sm text-muted hover:text-text transition-colors duration-200 px-3 py-2 rounded-md'
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <img src={asset('logo.svg')} width="28" height="28" alt="" />
          Session Deck
        </a>
        <div className="hidden items-center gap-1 sm:flex">
          <a className={link} href="#search">Search</a>
          <a className={link} href="#actions">Actions</a>
          <a className={link} href="#install">Install</a>
        </div>
        <a href={REPO} className={`${secondary} !px-3.5 !py-2`}>
          <GitHubIcon />
          <span className="hidden sm:inline">GitHub</span>
          <span className="sr-only sm:hidden">GitHub repository</span>
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-10 sm:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(87,91,199,.35),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_100%)]" />
      <motion.div className="mx-auto max-w-6xl px-4 text-center sm:px-6" initial="hidden" animate="shown" variants={stagger}>
        <motion.p variants={rise} className="mx-auto inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-soft" aria-hidden="true" />
          macOS · Apple Silicon · open source
        </motion.p>
        <motion.h1 variants={rise} className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          Find, inspect and resume your Claude Code sessions.
        </motion.h1>
        <motion.p variants={rise} className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
          Session Deck reads <code className="font-mono text-base text-text">~/.claude</code> and puts every session one keystroke away. Search by the files they changed, the PRs they opened and the plans they left behind, then pick one up in your terminal.
        </motion.p>
        <motion.div variants={rise} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <DownloadButton />
          <motion.a whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} href={REPO} className={secondary}>
            <GitHubIcon />
            View on GitHub
          </motion.a>
        </motion.div>
        <motion.p variants={rise} className="mt-4 text-xs text-dim">
          Free. Needs Claude Code with at least one session.
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 max-w-6xl px-4 sm:px-6"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative rounded-2xl border border-border-strong bg-surface p-1.5 shadow-[0_40px_120px_-30px_rgba(87,91,199,.45),0_0_0_1px_rgba(255,255,255,.04)_inset]">
          <div className="flex items-center gap-1.5 px-3 py-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <video
            className="aspect-video w-full rounded-xl bg-bg"
            src={asset('demo.mp4')}
            poster={asset('demo-poster.jpg')}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="One minute demo of Session Deck searching and resuming sessions"
          />
        </div>
      </motion.div>
    </section>
  )
}

function Why() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Hundreds of sessions, named after their first prompt.</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Claude Code keeps every session on disk. After a few weeks there are hundreds of them spread across repos, branches and worktrees. Finding “the one where I fixed the transcript upload” means remembering which folder it ran in and scrolling a picker.
          </p>
          <p>
            Session Deck indexes all of them and lets you look them up by what actually happened in them: the files they changed, the PRs and commits they made, the plans and reports they left behind. Then it opens the one you want in your terminal, in the right folder, ready to continue.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Search() {
  return (
    <section id="search" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold text-brand-soft">Search</p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Press <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>P</kbd> anywhere. Then type, or paste.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Plain words search everything. A prefix narrows to one kind and shows up as a chip. Type <kbd>/</kbd> to list every kind with examples.
        </p>
      </Reveal>
      <motion.ul
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        variants={stagger}
      >
        {KINDS.map((k, i) => (
          <motion.li
            key={k.prefix}
            variants={rise}
            whileHover={{ y: -3 }}
            className={`group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-border-strong ${i === 0 ? 'sm:col-span-2' : ''}`}
          >
            <span className="inline-flex w-fit items-center rounded-md border border-border-strong bg-raised px-2 py-1 font-mono text-xs text-brand-soft">
              {k.prefix}
            </span>
            <h3 className="mt-4 text-base font-semibold">{k.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{k.body}</p>
            <code className="mt-5 block truncate rounded-lg border border-border bg-bg px-3 py-2 font-mono text-xs text-text/90">{k.example}</code>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

function Actions() {
  return (
    <section id="actions" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="rounded-3xl border border-border bg-[radial-gradient(80%_100%_at_0%_0%,rgba(87,91,199,.18),transparent_60%)] p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold text-brand-soft">Actions</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Type <span className="font-mono text-brand-soft">&gt;</span> and act on the session without touching the mouse.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Resume opens it in your terminal, in the right folder. Fork keeps the original intact. Everything else is one keystroke behind it.
            </p>
            <code className="mt-6 block w-fit rounded-lg border border-border bg-bg px-3 py-2 font-mono text-sm text-text/90">&gt; fork</code>
          </Reveal>
          <motion.ul
            className="grid gap-x-8 gap-y-5 sm:grid-cols-2"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            variants={stagger}
          >
            {ACTIONS.map(([name, what]) => (
              <motion.li key={name} variants={rise} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-soft" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="mt-0.5 text-sm text-muted">{what}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked, the text is still selectable */
    }
  }
  return (
    <div className="relative rounded-xl border border-border bg-bg">
      <pre className="overflow-x-auto p-4 pr-24 font-mono text-sm leading-relaxed text-text/90"><code>{code}</code></pre>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="absolute right-3 top-3 rounded-md border border-border-strong bg-surface px-2.5 py-1.5 text-xs font-medium text-muted transition-colors duration-200 hover:text-text cursor-pointer"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function Install() {
  return (
    <section id="install" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-brand-soft">Install</p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">Up and running in a minute.</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Download the app, drag it to Applications, open it. It finds your sessions on its own.
        </p>
        <div className="mt-8 flex justify-center">
          <DownloadButton className="!px-6 !py-3.5 !text-base" />
        </div>
        <p className="mt-3 text-xs text-dim">Apple Silicon · .dmg · latest release on GitHub</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-semibold">You need</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>macOS on Apple Silicon</li>
            <li>
              <a className="underline decoration-border-strong underline-offset-4 hover:text-text" href="https://claude.com/claude-code">Claude Code</a>, with at least one session
            </li>
            <li>A terminal: Terminal, iTerm2, Warp or Ghostty</li>
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-semibold">First launch</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The build is signed but not notarized, so macOS blocks it once. Open System Settings, go to Privacy &amp; Security and click <span className="text-text">Open Anyway</span>. Or clear the flag from a terminal:
          </p>
          <div className="mt-3">
            <CodeBlock code={UNQUARANTINE} label="quarantine command" />
          </div>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-4 max-w-4xl">
        <details className="group rounded-2xl border border-border bg-surface open:bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 font-semibold [&::-webkit-details-marker]:hidden">
            Build from source
            <span className="text-dim transition-transform duration-200 group-open:rotate-180" aria-hidden="true">⌄</span>
          </summary>
          <div className="space-y-4 px-6 pb-6">
            <p className="text-sm leading-relaxed text-muted">
              Needs Node.js 22 and the Xcode Command Line Tools (<code className="font-mono text-xs text-text/90">xcode-select --install</code>) to build the blur addon. Then <code className="font-mono text-xs text-text/90">npm run package</code> produces the app in <code className="font-mono text-xs text-text/90">dist/</code>.
            </p>
            <CodeBlock code={SOURCE} label="build commands" />
          </div>
        </details>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-dim sm:flex-row sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-muted hover:text-text">
          <img src={asset('logo.svg')} width="20" height="20" alt="" />
          Session Deck
        </a>
        <p>
          Built by <a className="text-muted hover:text-text" href="https://github.com/alan-oliv">Alan Oliveira</a>. Not affiliated with Anthropic.
        </p>
        <a href={REPO} className="flex items-center gap-2 text-muted hover:text-text">
          <GitHubIcon />
          Source on GitHub
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Why />
        <Search />
        <Actions />
        <Install />
      </main>
      <Footer />
    </>
  )
}
