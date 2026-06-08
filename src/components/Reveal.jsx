import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Reveal sutil al entrar en viewport (trust-first: motion bajo).
// Robusto: si el observer no dispara (saltos por ancla, scroll instantáneo),
// un temporizador de seguridad garantiza que el contenido nunca quede invisible.
export default function Reveal({ children, delay = 0, y = 22, className, as = 'div' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduce) { setShown(true); return }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect() }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    const safety = setTimeout(() => { setShown(true); io.disconnect() }, 1600)
    return () => { io.disconnect(); clearTimeout(safety) }
  }, [reduce])

  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={false}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
