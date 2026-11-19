import { useEffect, useRef, useState, type ReactNode } from 'react'
import { prefersReducedMotion } from '../lib/motion'

type Props = { children: ReactNode; delay?: number; className?: string }

/** Hiện dần và trượt lên khi cuộn tới. */
export default function Reveal({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(prefersReducedMotion())

  useEffect(() => {
    if (shown || !ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [shown])

  return (
    <div
      ref={ref}
      className={`reveal${shown ? ' in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
