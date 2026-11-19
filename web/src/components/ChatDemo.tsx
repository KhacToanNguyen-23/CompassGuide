import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const PAIRS = [
  {
    q: 'Điểm dừng tiếp theo có gì?',
    a: 'Tiếp theo là điểm 2 trên tuyến này. Robot sẽ dừng lại và phát phần thuyết minh.',
  },
  {
    q: 'Bạn lái robot lại gần hơn được không?',
    a: 'Tôi chỉ trả lời câu hỏi về chuyến tham quan, không điều khiển được robot. Bạn vui lòng nhờ hướng dẫn viên.',
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
        <strong>Hỏi hướng dẫn viên</strong>
        <i className="badge">mô phỏng</i>
      </div>
      <div className="bubbles" aria-live="off">
        <div className="bubble user">{q}</div>
        <div className="bubble bot">{chars === 0 ? <span className="muted">Đang trả lời…</span> : a.slice(0, chars)}</div>
      </div>
      <p className="fine">Câu trả lời chỉ lấy từ nội dung đã được duyệt.</p>
    </div>
  )
}
