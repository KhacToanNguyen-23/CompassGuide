import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const PATH = 'M 40 200 C 140 200, 160 80, 260 90 S 400 200, 500 150 S 640 40, 760 70'
const STOPS = [0.32, 0.66, 1]
const MOVE_MS = 3000
const DWELL_MS = 1800

type Point = { x: number; y: number }

const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)

/** Minh họa: robot dẫn đoàn đi qua 3 điểm, dừng lại ở mỗi điểm để thuyết minh. */
export default function RouteHero() {
  const pathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGGElement>(null)
  const [points, setPoints] = useState<Point[]>([])
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    const at = (f: number): Point => {
      const p = path.getPointAtLength(f * len)
      return { x: p.x, y: p.y }
    }
    setPoints(STOPS.map(at))

    const place = (f: number) => {
      const p = at(f)
      dotRef.current?.setAttribute('transform', `translate(${p.x} ${p.y})`)
    }
    place(0)
    if (prefersReducedMotion()) return

    const bounds = [0, ...STOPS]
    const slot = MOVE_MS + DWELL_MS
    const cycle = STOPS.length * slot
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = (now - t0) % cycle
      const seg = Math.floor(t / slot)
      const local = t - seg * slot
      if (local < MOVE_MS) {
        place(bounds[seg] + (bounds[seg + 1] - bounds[seg]) * ease(local / MOVE_MS))
        setActive(-1)
      } else {
        place(bounds[seg + 1])
        setActive(seg)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="route-card">
      <svg
        viewBox="0 0 800 260"
        role="img"
        aria-label="Illustration: a robot guides a group along a route and stops at three points of interest."
      >
        <path ref={pathRef} d={PATH} className="route-base" />
        <path d={PATH} className="route-flow" />
        <g transform="translate(40 200)">
          <circle r="6" className="start-dot" />
          <text y="26" textAnchor="middle" className="svg-label">
            Start
          </text>
        </g>
        {points.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            {active === i && <circle r="10" className="pulse" />}
            <circle r="11" className={active === i ? 'poi active' : 'poi'} />
            <text y="4" textAnchor="middle" className="poi-no">
              {i + 1}
            </text>
          </g>
        ))}
        <g ref={dotRef}>
          <circle r="13" className="bot" />
          <circle r="4.5" className="bot-core" />
        </g>
      </svg>
      <div className="route-caption">
        <span className={active >= 0 ? 'dot live' : 'dot'} aria-hidden="true" />
        {active >= 0
          ? `Stop ${active + 1}: the robot has stopped and is playing the narration`
          : 'Guiding the group to the next stop'}
        <span className="muted"> · illustrated route</span>
      </div>
    </div>
  )
}
