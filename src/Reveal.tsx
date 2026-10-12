import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
      variants={{ hidden: rise.hidden, shown: { ...rise.shown, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } } }}
    >
      {children}
    </motion.div>
  )
}
