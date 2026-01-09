'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ComponentPropsWithoutRef } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 }
}

const noMotion = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0 }
}

export function AnimatedCard({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof motion.div>) {
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion ? noMotion : fadeInUp

  return (
    <motion.div
      {...motionProps}
      {...props}
      className={className}
    >
      {children}
    </motion.div>
  )
}
