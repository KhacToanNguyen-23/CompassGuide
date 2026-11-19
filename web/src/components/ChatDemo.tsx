import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const PAIRS = [
  {
    q: 'What will we see at the next stop?',
    a: 'Next is stop 2 on this route. The robot will stop there and play its narration.',
  },
  {
    q: 'Can you drive the robot closer?',
    a: 'I can answer questions about the tour, but I cannot control the robot. Please ask your guide.',
  },
]

const TYPE_MS = 22
const HOLD_MS = 2600

/** Minh họa trợ lý hỏi đáp: trả lời theo nội dung đã duyệt, không điều khiển robot. */
export default function ChatDemo() {
  const reduced = prefersReducedMotion()
  const [pair, setPair] = useState(0)
  const [chars, setChars] = useState(reduced ? Infinity : 0)
  const { q, a } = PAIRS[pair]

  useEffect(() => {
    if (reduced) return
    if (chars < a.length) {
      const id = setTimeout(() => setChars((c) => c + 1), chars === 0 ? 700 : TYPE_MS)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setPair((p) => (p + 1) % PAIRS.length)
      setChars(0)
    }, HOLD_MS)
    return () => clearTimeout(id)
  }, [chars, a, reduced])

  return (
    <div className="demo-card chat">
      <div className="control-head">
        <strong>Ask the guide</strong>
        <i className="badge">simulated</i>
      </div>
      <div className="bubbles" aria-live="off">
        <div className="bubble user">{q}</div>
        <div className="bubble bot">
          {chars === 0 ? (
            <span className="typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          ) : (
            a.slice(0, chars)
          )}
        </div>
      </div>
      <p className="fine">Answers come only from approved content.</p>
    </div>
  )
}
