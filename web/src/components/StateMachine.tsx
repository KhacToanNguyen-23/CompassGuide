/** Máy trạng thái tour rút từ contracts/mqtt.md và SRS mục 6.4. Do robot quyết định, cloud chỉ phản ánh lại. */
export default function StateMachine() {
  return (
    <figure className="fig">
      <svg viewBox="0 0 720 236" role="img" aria-label="Sơ đồ trạng thái tour: READY, NAVIGATING, NARRATING, COMPLETED, cùng BLOCKED và PAUSED.">
        <defs>
          <marker id="smarrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        <g className="sm-lines">
          <line x1="140" y1="74" x2="208" y2="74" markerEnd="url(#smarrow)" />
          <line x1="330" y1="74" x2="398" y2="74" markerEnd="url(#smarrow)" />
          <line x1="520" y1="74" x2="588" y2="74" markerEnd="url(#smarrow)" />
          <path d="M 460 56 C 460 22, 270 22, 270 54" fill="none" markerEnd="url(#smarrow)" />
          <line x1="270" y1="92" x2="270" y2="166" markerStart="url(#smarrow)" markerEnd="url(#smarrow)" className="alert" />
          <line x1="460" y1="92" x2="460" y2="166" markerStart="url(#smarrow)" markerEnd="url(#smarrow)" />
        </g>

        <text x="174" y="64" textAnchor="middle" className="sm-label">START</text>
        <text x="364" y="64" textAnchor="middle" className="sm-label">đến điểm</text>
        <text x="554" y="64" textAnchor="middle" className="sm-label">điểm cuối</text>
        <text x="365" y="16" textAnchor="middle" className="sm-label">điểm kế tiếp</text>
        <text x="260" y="132" textAnchor="end" className="sm-label alert">vật cản</text>
        <text x="280" y="132" className="sm-label">thông đường</text>
        <text x="450" y="132" textAnchor="end" className="sm-label">PAUSE</text>
        <text x="470" y="132" className="sm-label">RESUME</text>

        <g className="sm-box">
          <rect x="20" y="56" width="120" height="36" rx="2" />
          <rect x="210" y="56" width="120" height="36" rx="2" />
          <rect x="400" y="56" width="120" height="36" rx="2" />
          <rect x="590" y="56" width="120" height="36" rx="2" />
          <rect x="210" y="168" width="120" height="36" rx="2" className="alert" />
          <rect x="400" y="168" width="120" height="36" rx="2" />
        </g>
        <g className="sm-name">
          <text x="80" y="78" textAnchor="middle">READY</text>
          <text x="270" y="78" textAnchor="middle">NAVIGATING</text>
          <text x="460" y="78" textAnchor="middle">NARRATING</text>
          <text x="650" y="78" textAnchor="middle">COMPLETED</text>
          <text x="270" y="190" textAnchor="middle">BLOCKED</text>
          <text x="460" y="190" textAnchor="middle">PAUSED</text>
        </g>
      </svg>
      <figcaption className="figcap">
        Hình 3. Các trạng thái chính của một tour. Lệnh END đưa tour đang chạy sang ABORTED rồi về READY; lỗi nghiêm trọng đưa về ERROR và cần người xác nhận.
      </figcaption>
    </figure>
  )
}
