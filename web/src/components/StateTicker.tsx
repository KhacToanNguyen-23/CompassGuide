import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const FRAMES = [
  { tourId: 't-001', status: 'NAVIGATING', poiIndex: 0, battery: 96 },
  { tourId: 't-001', status: 'NARRATING', poiIndex: 0, battery: 96 },
  { tourId: 't-001', status: 'NAVIGATING', poiIndex: 1, battery: 95 },
  { tourId: 't-001', status: 'NARRATING', poiIndex: 1, battery: 95 },
  { tourId: 't-001', status: 'NAVIGATING', poiIndex: 2, battery: 94 },
  { tourId: 't-001', status: 'NARRATING', poiIndex: 2, battery: 94 },
  { tourId: 't-001', status: 'COMPLETED', poiIndex: 2, battery: 93 },
]

const TYPE_MS = 14
const HOLD_MS = 1500

/** Mẫu tin nhắn state tự gõ ra, dữ liệu giả lập theo hợp đồng contracts/mqtt.md. */
export default function StateTicker() {
  const reduced = prefersReducedMotion()
  const [frame, setFrame] = useState(0)
  const [chars, setChars] = useState(reduced ? Infinity : 0)
  const text = JSON.stringify(FRAMES[frame], null, 2)

  useEffect(() => {
    if (reduced) return
    if (chars < text.length) {
      const id = setTimeout(() => setChars((c) => c + 1), TYPE_MS)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setFrame((f) => (f + 1) % FRAMES.length)
      setChars(0)
    }, HOLD_MS)
    return () => clearTimeout(id)
  }, [chars, text, reduced])

  return (
    <div className="ticker" aria-label="Sample robot state message">
      <div className="ticker-bar">
        <span>compassguide/robot-01/state</span>
        <span className="badge">simulated sample</span>
      </div>
      <pre>
        {text.slice(0, chars)}
        <span className="caret" aria-hidden="true" />
      </pre>
    </div>
  )
}
