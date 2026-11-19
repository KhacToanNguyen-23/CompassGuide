import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

type Props = { to: number; decimals?: number; prefix?: string; suffix?: string }

/** Đếm từ 0 tới giá trị khi cuộn tới. */
export default function CountUp({ to, decimals = 0, prefix = '', suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(prefersReducedMotion() ? to : 0)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 1200
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          setValue(to * (1 - Math.pow(1 - p, 3)))
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
