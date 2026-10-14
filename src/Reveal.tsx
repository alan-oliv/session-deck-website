import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.32, 0.72, 0, 1] as const

export const rise: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(8px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}

export const stagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      variants={{ hidden: rise.hidden, shown: { ...rise.shown, transition: { duration: 0.9, delay, ease } } }}
    >
      {children}
    </motion.div>
  )
}
