const LEGEND = [
  'LiDAR 2D: bản đồ, định vị, phát hiện vật cản',
  'Nút dừng khẩn cấp: ngắt nguồn động cơ bằng phần cứng',
  'Loa: phát thuyết minh khi robot đã dừng',
  'Mini PC: chạy ROS 2 và Nav2',
  'Pin và bộ giám sát pin',
  'Hai bánh dẫn động và bánh tự do',
  'Vùng dừng khi có vật cản',
]

type MarkerProps = { n: number; x: number; y: number; fromX: number; fromY: number }

function Marker({ n, x, y, fromX, fromY }: MarkerProps) {
  return (
    <g>
      <line x1={fromX} y1={fromY} x2={x + (fromX < x ? -9 : 9)} y2={y} className="bp-leader" />
      <circle cx={x} cy={y} r="9" className="bp-marker" />
      <text x={x} y={y + 3.5} textAnchor="middle" className="bp-num">
        {n}
      </text>
    </g>
  )
}

/** Bản vẽ nhìn từ trên xuống: bố trí cảm biến theo yêu cầu thiết kế, không phải mô hình robot. */
export default function SensorLayout() {
  return (
    <figure className="fig">
      <svg viewBox="0 0 560 360" role="img" aria-label="Bản vẽ nhìn từ trên xuống: bố trí LiDAR, nút dừng khẩn cấp, loa, mini PC, pin và bánh xe.">
        <defs>
          <pattern id="bpgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" className="bp-gridline" />
          </pattern>
        </defs>
        <rect width="560" height="360" fill="url(#bpgrid)" />

        <text x="240" y="16" textAnchor="middle" className="bp-text">
          TRƯỚC
        </text>
        <path d="M 240 22 L 240 34 M 235 29 L 240 22 L 245 29" className="bp-arrow" />

        <polygon points="205,92 275,92 305,36 175,36" className="bp-zone" />

        <rect x="165" y="92" width="150" height="210" rx="6" className="bp-body" />
        <rect x="150" y="182" width="15" height="48" className="bp-part" />
        <rect x="315" y="182" width="15" height="48" className="bp-part" />
        <circle cx="240" cy="112" r="7" className="bp-part" />
        <circle cx="240" cy="284" r="7" className="bp-part" />

        <circle cx="240" cy="160" r="95" className="bp-scan" />
        <circle cx="240" cy="160" r="12" className="bp-part strong" />
        <rect x="222" y="100" width="36" height="10" className="bp-part" />
        <rect x="185" y="196" width="110" height="32" className="bp-part" />
        <rect x="185" y="240" width="110" height="34" className="bp-part" />
        <circle cx="295" cy="286" r="8" className="bp-signal" />

        <Marker n={1} x={400} y={150} fromX={252} fromY={160} />
        <Marker n={2} x={400} y={286} fromX={303} fromY={286} />
        <Marker n={3} x={400} y={100} fromX={258} fromY={105} />
        <Marker n={4} x={400} y={212} fromX={295} fromY={212} />
        <Marker n={5} x={400} y={250} fromX={295} fromY={257} />
        <Marker n={6} x={90} y={206} fromX={150} fromY={206} />
        <Marker n={7} x={90} y={52} fromX={180} fromY={52} />
      </svg>
      <figcaption className="figcap">Hình 1. Bố trí cảm biến theo yêu cầu thiết kế. Khung robot chưa được chọn, nên hình không thể hiện dáng robot.</figcaption>
      <ol className="legend">
        {LEGEND.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
    </figure>
  )
}
