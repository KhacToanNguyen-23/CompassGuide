import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const CYCLE_MS = 9400

function xAt(t: number): number {
  if (t < 2600) return 40 + 210 * (t / 2600)
  if (t < 5600) return 250
  if (t < 8600) return 250 + 220 * ((t - 5600) / 3000)
  return 470
}

/** Minh họa: có vật cản thì robot dừng, vật cản đi khỏi thì robot đi tiếp. */
export default function SafetyDemo() {
  const robotRef = useRef<SVGGElement>(null)
  const reduced = prefersReducedMotion()
  const [stopped, setStopped] = useState(reduced)
  const [obstacle, setObstacle] = useState(reduced)

  useEffect(() => {
    const place = (x: number) => robotRef.current?.setAttribute('transform', `translate(${x} 150)`)
    if (reduced) {
      place(250)
      return
    }
    const t0 = performance.now()
    let raf = 0
    let lastStopped = false
    let lastObstacle = false
    const tick = (now: number) => {
      const t = (now - t0) % CYCLE_MS
      place(xAt(t))
      const isStopped = t >= 2600 && t < 5600
      const isObstacle = t >= 2000 && t < 5200
      if (isStopped !== lastStopped) {
        lastStopped = isStopped
        setStopped(isStopped)
      }
      if (isObstacle !== lastObstacle) {
        lastObstacle = isObstacle
        setObstacle(isObstacle)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <div className="demo-card">
      <svg
        viewBox="0 0 520 200"
        role="img"
        aria-label="Minh họa: robot dừng khi có vật cản phía trước và đi tiếp khi đường thông."
      >
        <line x1="20" y1="150" x2="500" y2="150" className="floor" />
        <g ref={robotRef}>
          <polygon points="26,-16 150,-58 150,26" className={stopped ? 'cone alert' : 'cone'} />
          <rect x="-24" y="-34" width="48" height="30" rx="9" className="body" />
          <circle cx="-12" cy="-2" r="6" className="wheel" />
          <circle cx="12" cy="-2" r="6" className="wheel" />
          <circle cy="-40" r="5" className="lidar-top" />
        </g>
        <g transform="translate(345 150)" className={obstacle ? 'obstacle show' : 'obstacle'}>
          <circle cy="-48" r="9" />
          <rect x="-11" y="-38" width="22" height="38" rx="7" />
        </g>
      </svg>
      <div className="demo-caption">
        <span className={stopped ? 'status-chip amber' : 'status-chip cyan'}>{stopped ? 'OBSTACLE_STOP' : 'ĐANG ĐI'}</span>
        <span>{stopped ? 'Đường bị chắn: robot dừng và báo sự kiện' : 'Đường thông: dẫn đoàn với tốc độ đi bộ'}</span>
        <i className="badge">mô phỏng</i>
      </div>
    </div>
  )
}
