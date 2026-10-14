import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ACTIONS, DOWNLOAD, KINDS, REPO } from './data'
import { Reveal, rise, stagger } from './Reveal'

const ease = [0.32, 0.72, 0, 1] as const

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

const Arrow = ({ d }: { d: string }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)
const DOWN = 'M8 3v10M4 9l4 4 4-4'
const UP_RIGHT = 'M5 11l6-6M6 5h5v5'

const glide = 'duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]'
const shell = 'rounded-[2rem] border border-line bg-white/[0.03] p-1.5'
const core = 'rounded-[calc(2rem-0.375rem)] bg-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]'

function PillLink({ href, primary, arrow, children, className = '' }: { href: string; primary?: boolean; arrow: string; children: ReactNode; className?: string }) {
  const look = primary
    ? 'bg-accent text-white hover:bg-[#6468d6]'
    : 'border border-line bg-white/[0.04] text-text hover:bg-white/[0.08]'
  const circle = primary ? 'bg-bg/10' : 'bg-white/10'
  return (
    <a href={href} className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold transition-[transform,background-color] ${glide} active:scale-[0.98] select-none ${look} ${className}`}>
      {children}
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform ${glide} group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105 ${circle}`}>
        <Arrow d={arrow} />
      </span>
    </a>
  )
}

function DownloadButton({ className }: { className?: string }) {
  return (
    <PillLink href={DOWNLOAD} primary arrow={DOWN} className={className}>
      <AppleIcon />
      Download for macOS
    </PillLink>
  )
}

const SECTIONS = [
  ['#search', 'Search'],
  ['#organize', 'Organize'],
  ['#actions', 'Actions'],
  ['#install', 'Install'],
] as const

function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const link = `rounded-full px-3.5 py-2 text-sm text-muted transition-colors ${glide} hover:bg-white/[0.06] hover:text-text`
  const bar = `absolute left-1/2 h-px w-4 -translate-x-1/2 bg-text transition-transform ${glide}`
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav className="flex w-full max-w-max items-center gap-1 rounded-full border border-line bg-bg/60 p-1.5 pl-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl max-sm:max-w-none max-sm:justify-between" aria-label="Main">
        <a href="#top" className="mr-2 flex items-center gap-2.5 font-semibold tracking-tight">
          <img src={asset('logo.svg')} width="24" height="24" alt="" />
          Session Deck
        </a>
        <div className="hidden items-center sm:flex">
          {SECTIONS.map(([href, label]) => <a key={href} className={link} href={href}>{label}</a>)}
        </div>
        <a href={REPO} className={`${link} hidden sm:flex`}>
          <GitHubIcon />
          <span className="sr-only">GitHub repository</span>
        </a>
        <a href={DOWNLOAD} className={`hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-[transform,background-color] ${glide} hover:bg-[#6468d6] active:scale-[0.98] sm:flex`}>
          <AppleIcon />
          <span className="hidden md:inline">Download for macOS</span>
          <span className="sr-only md:hidden">Download for macOS</span>
        </a>
        <button
          type="button"
          className="relative h-10 w-10 rounded-full bg-white/[0.06] sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(o => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className={`${bar} top-[17px] ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span aria-hidden="true" className={`${bar} top-[23px] ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 flex flex-col justify-center bg-black/80 px-8 backdrop-blur-3xl sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <motion.ul className="space-y-2" initial="hidden" animate="shown" variants={stagger}>
              {SECTIONS.map(([href, label]) => (
                <motion.li key={href} variants={rise}>
                  <a href={href} onClick={() => setOpen(false)} className="block py-2 text-4xl font-semibold tracking-tight">{label}</a>
                </motion.li>
              ))}
              <motion.li variants={rise} className="flex flex-col items-start gap-3 pt-8">
                <DownloadButton />
                <PillLink href={REPO} arrow={UP_RIGHT}>
                  <GitHubIcon />
                  View on GitHub
                </PillLink>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        video.play().catch(() => {})
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className="block aspect-video w-full bg-bg"
      src={asset('demo.mp4')}
      poster={asset('demo-poster.jpg')}
      muted
      playsInline
      controls
      preload="metadata"
      aria-label="One minute demo of Session Deck searching and resuming sessions"
    />
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip pt-36 pb-16 sm:pt-48 sm:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38rem] -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(87,91,199,.14),transparent)]" />
      <motion.div className="mx-auto max-w-6xl px-4 text-center sm:px-6" initial="hidden" animate="shown" variants={stagger}>
        <motion.h1 variants={rise} className="mx-auto max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tighter sm:text-7xl">
          Find, inspect and organize your Claude Code sessions.
        </motion.h1>
        <motion.p variants={rise} className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
          Managing sessions and context windows is now a core part of the engineering workflow. Session Deck keeps every session one keystroke away. Search by the files they changed, the PRs they opened and the plans they left behind, then pick up right where you stopped.
        </motion.p>
        <motion.div variants={rise} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <DownloadButton />
          <PillLink href={REPO} arrow={UP_RIGHT}>
            <GitHubIcon />
            View on GitHub
          </PillLink>
        </motion.div>
        <motion.p variants={rise} className="mt-5 text-xs text-dim">
          Free. Needs Claude Code with at least one session.
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
        initial={{ opacity: 0, y: 64, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease }}
      >
        <div className={`${shell} p-2 shadow-[0_60px_160px_-60px_rgba(87,91,199,.35)]`}>
          <div className="overflow-hidden rounded-[calc(2rem-0.5rem)] bg-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <DemoVideo />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function Why() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <h2 className="text-balance text-3xl font-semibold tracking-tighter sm:text-5xl">Hundreds of sessions, named after their first prompt.</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-muted">
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

// Spans line up per breakpoint so each row fills: 6 columns on md, 12 on lg.
const BENTO = [
  'md:col-span-6 lg:col-span-7 lg:row-span-2',
  'md:col-span-3 lg:col-span-5',
  'md:col-span-3 lg:col-span-5',
  'md:col-span-2 lg:col-span-4',
  'md:col-span-2 lg:col-span-3',
  'md:col-span-2 lg:col-span-5',
  'md:col-span-3 lg:col-span-7',
  'md:col-span-3 lg:col-span-5',
]

function Search() {
  return (
    <section id="search" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-balance text-3xl font-semibold tracking-tighter sm:text-5xl">
          Press <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>P</kbd> anywhere. Then type, or paste.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Plain words search everything. A prefix narrows to one kind and shows up as a chip. Type <kbd>/</kbd> to list every kind with examples.
        </p>
      </Reveal>
      <motion.ul
        className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        variants={stagger}
      >
        {KINDS.map((k, i) => {
          const feature = i === 0
          return (
            <motion.li key={k.prefix} variants={rise} className={`${shell} ${BENTO[i]}`}>
              <div className={`${core} relative flex h-full flex-col overflow-hidden ${feature ? 'p-8 sm:p-10' : 'p-6'}`}>
                {feature && <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(87,91,199,.16),transparent)]" />}
                <span className="inline-flex w-fit items-center rounded-full border border-line bg-white/[0.04] px-3 py-1 font-mono text-xs text-accent-soft">
                  {k.prefix}
                </span>
                <h3 className={`mt-5 font-semibold tracking-tight ${feature ? 'text-2xl sm:text-3xl' : 'text-base'}`}>{k.title}</h3>
                <p className={`mt-3 flex-1 leading-relaxed text-muted ${feature ? 'max-w-md text-base' : 'text-sm'}`}>{k.body}</p>
                <code className={`mt-6 block rounded-2xl border border-line bg-bg px-4 py-3 font-mono text-text [overflow-wrap:anywhere] ${feature ? 'text-sm' : 'text-xs'}`}>{k.example}</code>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
    </section>
  )
}

const LABEL_COLORS = {
  Bug: '#eb5757',
  Feature: '#bb87fc',
  Investigation: '#4ea7fc',
  Refactor: '#f2c94c',
  Performance: '#f2994a',
  Docs: '#4cb782',
} as const

const SIDEBAR_VIEWS = [['All sessions', '10'], ['Archived', '2'], ['Needs you', '1']] as const
const SIDEBAR_REPOS = [['meetnotes', '4'], ['audio-sync', '1'], ['team8', '2']] as const
const SIDEBAR_FOLDERS = [['~/code', '3']] as const
const SIDEBAR_LABELS = [['Bug', '1'], ['Feature', '2'], ['Investigation', '0'], ['Refactor', '0'], ['Performance', '2'], ['Docs', '1']] as const

const MOCK_SESSIONS: { title: string; where: string; when: string; labels: (keyof typeof LABEL_COLORS)[] }[] = [
  { title: 'meetnotes-improvements', where: 'meetnotes · ~/code', when: '3d', labels: ['Performance'] },
  { title: 'team8-performance', where: 'team8 · ~/code', when: '3d', labels: ['Bug', 'Performance'] },
  { title: 'blog-post-veracity', where: '~/code · 1 fork', when: '3d', labels: ['Docs'] },
  { title: 'transcriptions', where: 'meetnotes · ~/code', when: '5d', labels: ['Feature'] },
]

const sidebarRow = 'flex items-center justify-between rounded-full px-3 py-1.5'
const sidebarHeading = 'mb-1 mt-4 px-3 text-xs text-dim'

function Dot({ color }: { color: string }) {
  return <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
}

function SidebarList({ rows, dots }: { rows: readonly (readonly [string, string])[]; dots?: boolean }) {
  return (
    <ul className="space-y-0.5 text-sm text-muted">
      {rows.map(([name, count]) => (
        <li key={name} className={sidebarRow}>
          <span className="flex items-center gap-2.5">
            {dots && <Dot color={LABEL_COLORS[name as keyof typeof LABEL_COLORS]} />}
            {name}
          </span>
          <span className="font-mono text-xs text-dim">{count}</span>
        </li>
      ))}
    </ul>
  )
}

function OrganizeMock() {
  return (
    <div aria-hidden="true" className={`${core} grid overflow-hidden md:grid-cols-[14rem_1fr]`}>
      <div className="border-b border-line p-4 md:border-b-0 md:border-r">
        <ul className="space-y-0.5 text-sm">
          {SIDEBAR_VIEWS.map(([name, count], i) => (
            <li key={name} className={`${sidebarRow} ${i === 0 ? 'bg-accent/20 text-text' : 'text-muted'}`}>
              <span>{name}</span>
              <span className="font-mono text-xs text-dim">{count}</span>
            </li>
          ))}
        </ul>
        <p className={sidebarHeading}>Repositories</p>
        <SidebarList rows={SIDEBAR_REPOS} />
        <p className={sidebarHeading}>Folders</p>
        <SidebarList rows={SIDEBAR_FOLDERS} />
        <div className={`${sidebarHeading} flex items-center justify-between`}>
          <span>Labels</span>
          <span className="text-base leading-none">+</span>
        </div>
        <SidebarList rows={SIDEBAR_LABELS} dots />
      </div>
      <ul className="divide-y divide-line self-start">
        {MOCK_SESSIONS.map((s) => (
          <li key={s.title} className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <p className="truncate font-medium">{s.title}</p>
              <p className="mt-1 truncate text-sm text-muted">{s.where}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 pt-1.5 text-sm text-dim">
              {s.labels.map((l) => <Dot key={l} color={LABEL_COLORS[l]} />)}
              <span>{s.when}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const code = 'whitespace-nowrap font-mono text-[0.85em] text-text'

const ORGANIZE: [string, ReactNode][] = [
  ['Labels', 'Bug, Feature, Investigation, Refactor, Performance and Docs come ready to use. Type a new name to add your own, and it gets a color of its own. A session can carry several, shown as dots on its row.'],
  ['Sidebar', 'Every label is listed with its count, under your repositories and folders, beside All sessions, Archived and Needs you.'],
  ['Rename', <>Type a new title and press <kbd>↵</kbd>. It’s saved in the transcript as a <code className={code}>custom-title</code> record, the same one Claude Code writes, so the name shows up there too.</>],
  ['Archive', <>Moves a session out of the lists and search. Nothing is deleted, <code className={code}>claude --resume</code> keeps working, and the toast has an Undo.</>],
]

function Organize() {
  return (
    <section id="organize" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold tracking-tighter sm:text-5xl">Label the work. Name the sessions. Archive the rest.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Sessions start out named after their first prompt. Color-code them by the kind of work, give the ones that matter a real name, and archive the ones you’re done with.
            </p>
          </Reveal>
          <motion.dl
            className="mt-10 space-y-6"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            variants={stagger}
          >
            {ORGANIZE.map(([title, body]) => (
              <motion.div key={title} variants={rise} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(87,91,199,.8)]" aria-hidden="true" />
                <div>
                  <dt className="font-semibold">{title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{body}</dd>
                </div>
              </motion.div>
            ))}
          </motion.dl>
        </div>
        <Reveal delay={0.1} className={shell}>
          <OrganizeMock />
        </Reveal>
      </div>
    </section>
  )
}

function Actions() {
  return (
    <section id="actions" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className={shell}>
        <div className={`${core} p-8 sm:p-12`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tighter sm:text-5xl">
                Type <span className="font-mono text-accent-soft">&gt;</span> and act on the session without touching the mouse.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Resume opens it in your terminal, in the right folder. Fork keeps the original intact. Everything else is one keystroke behind it.
              </p>
              <code className="mt-8 block w-fit rounded-full border border-line bg-bg px-4 py-2 font-mono text-sm text-text">&gt; fork</code>
            </div>
            <motion.ul
              className="grid gap-x-10 gap-y-6 sm:grid-cols-2"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              variants={stagger}
            >
              {ACTIONS.map(([name, what]) => (
                <motion.li key={name} variants={rise} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(87,91,199,.8)]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="mt-1 text-sm text-muted">{what}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Install() {
  return (
    <section id="install" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tighter sm:text-5xl">Up and running in a minute.</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Download the app, drag it to Applications, open it. It finds your sessions on its own.
        </p>
        <div className="mt-10 flex justify-center">
          <DownloadButton className="!text-base" />
        </div>
        <p className="mt-4 text-xs text-dim">Apple Silicon · .dmg · latest release on GitHub</p>
      </Reveal>

      <Reveal className={`${shell} mx-auto mt-16 max-w-4xl`}>
        <div className={`${core} grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0`}>
          {[
            ['Mac', 'macOS on Apple Silicon'],
            ['Sessions', <><a className="underline decoration-line underline-offset-4 hover:text-text" href="https://claude.com/claude-code">Claude Code</a>, with at least one session</>],
            ['Terminal', 'Terminal, iTerm2, Warp or Ghostty'],
          ].map(([label, value], i) => (
            <div key={i} className="p-6 sm:p-8">
              <p className="text-xs font-medium text-dim">{label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-dim sm:flex-row sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-muted hover:text-text">
          <img src={asset('logo.svg')} width="20" height="20" alt="" />
          Session Deck
        </a>
        <p className="text-center">
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
    <MotionConfig reducedMotion="user">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Why />
        <Search />
        <Organize />
        <Actions />
        <Install />
      </main>
      <Footer />
    </MotionConfig>
  )
}
