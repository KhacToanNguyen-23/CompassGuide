import ChatDemo from './components/ChatDemo'
import CountUp from './components/CountUp'
import Reveal from './components/Reveal'
import RouteHero from './components/RouteHero'
import SafetyDemo from './components/SafetyDemo'

const steps = [
  { title: 'Chọn tuyến', text: 'Nhân viên chọn tuyến tham quan và bấm Bắt đầu trên ứng dụng web.' },
  { title: 'Robot dẫn đường', text: 'Robot đi chậm theo tuyến đã lập bản đồ, đoàn khách đi bộ theo sau.' },
  { title: 'Dừng và thuyết minh', text: 'Tới mỗi điểm, robot dừng hẳn rồi phát lời giới thiệu lưu sẵn trên xe.' },
  { title: 'Theo dõi từ xa', text: 'Vị trí, điểm hiện tại, pin và sự kiện được gửi về cho nhân viên.' },
]

const status: { tone: 'done' | 'doing' | 'next'; label: string; text: string }[] = [
  { tone: 'done', label: 'Đã xong', text: 'Kiến trúc microservice, hợp đồng API và MQTT, khung 5 service, robot giả lập, môi trường Docker.' },
  { tone: 'doing', label: 'Đang làm', text: 'Luồng điều khiển đầu-cuối: từ nút Bắt đầu trên web đến robot giả lập phản hồi.' },
  { tone: 'doing', label: 'Đang làm', text: 'Robot mô phỏng đi qua các điểm dừng bằng ROS 2 và Nav2.' },
  { tone: 'next', label: 'Sắp tới', text: 'Dashboard vận hành, thuyết minh, trợ lý AI, digital twin và chạy thử trên robot thật.' },
]

function FlowLink({ label }: { label: string }) {
  return (
    <div className="flow-wrap" aria-hidden="true">
      <span className="flow-label">{label}</span>
      <div className="flow" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <header className="nav-shell">
        <nav className="nav" aria-label="Điều hướng chính">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true" />
            CompassGuide
          </a>
          <div className="nav-links">
            <a href="#how">Cách hoạt động</a>
            <a href="#safety">An toàn</a>
            <a href="#ai">Trợ lý AI</a>
            <a href="#architecture">Kiến trúc</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <div className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Đề xuất cho First Cloud AI Journey</span>
              <h1>
                Robot <span className="grad">hướng dẫn viên tự hành</span>, vận hành trên AWS
              </h1>
              <p className="lead">
                CompassGuide dẫn đoàn khách đi bộ theo tuyến đã lập bản đồ, dừng thuyết minh tại từng điểm, và để nhân viên
                điều khiển, theo dõi chuyến đi từ một ứng dụng web.
              </p>
              <div className="actions">
                <a className="btn primary" href="#how">
                  Xem cách hoạt động
                </a>
              </div>
            </div>
            <RouteHero />
          </div>
        </div>

        <section id="how" className="tight">
          <div className="wrap">
            <Reveal>
              <h2>Cách hoạt động</h2>
              <p className="sub">Robot là hướng dẫn viên dẫn đoàn: không chở khách và không tự đi tìm khách.</p>
            </Reveal>
            <div className="grid cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="card">
                    <span className="step-no">{i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="stats">
              <div>
                <strong>3–5</strong>
                <span>điểm dừng mỗi tuyến</span>
              </div>
              <div>
                <strong>
                  <CountUp to={0.5} decimals={1} prefix="≤ " suffix=" m/s" />
                </strong>
                <span>tốc độ dẫn tối đa</span>
              </div>
              <div>
                <strong>
                  <CountUp to={5} />
                </strong>
                <span>microservice</span>
              </div>
              <div>
                <strong>
                  <CountUp to={0} />
                </strong>
                <span>lệnh vận tốc từ cloud</span>
              </div>
            </div>
            <p className="fine">Các con số là mục tiêu thiết kế từ yêu cầu dự án, chưa phải kết quả đo.</p>
          </div>
        </section>

        <section id="safety" className="alt show-section">
          <div className="wrap show">
            <Reveal>
              <span className="kicker">An toàn</span>
              <h2>Dừng trước, báo cáo sau</h2>
              <p className="sub">
                Quyết định dừng nằm trên robot, không chờ cloud. Gặp vật cản hoặc mất kết nối, robot tự dừng; nút dừng khẩn
                cấp ngắt nguồn động cơ bằng phần cứng.
              </p>
              <ul className="ticks">
                <li>Dừng khi có vật cản chắn đường</li>
                <li>Không cần chờ mạng để dừng</li>
                <li>Nút dừng khẩn cấp phần cứng, độc lập với phần mềm</li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <SafetyDemo />
            </Reveal>
          </div>
        </section>

        <section id="ai" className="show-section">
          <div className="wrap show rev">
            <Reveal>
              <span className="kicker">Trợ lý AI</span>
              <h2>Khách có thể hỏi, AI không thể lái</h2>
              <p className="sub">
                Trợ lý chỉ đọc, trả lời câu hỏi về campus từ nội dung đã được duyệt, và không có đường nào tới robot.
              </p>
              <ul className="ticks">
                <li>Chỉ trả lời từ nội dung đã duyệt</li>
                <li>Nói rõ khi không biết</li>
                <li>Không truy cập điều khiển robot</li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <ChatDemo />
            </Reveal>
          </div>
        </section>

        <section id="architecture" className="alt">
          <div className="wrap">
            <Reveal>
              <h2>Kiến trúc</h2>
              <p className="sub">
                Robot lo việc đi và dừng an toàn. AWS lo giao nhiệm vụ, theo dõi và AI. Mất mạng không làm robot mất khả
                năng dừng.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="arch">
                <div className="layer">
                  <h3>Web</h3>
                  <p>Giao diện cho người vận hành</p>
                  <ul>
                    <li>Điều khiển tour</li>
                    <li>Dashboard (dự kiến)</li>
                    <li>Hỏi đáp AI</li>
                  </ul>
                </div>
                <FlowLink label="REST" />
                <div className="layer">
                  <h3>AWS</h3>
                  <p>Microservice</p>
                  <ul>
                    <li>api-gateway</li>
                    <li>tour, content, robot, assistant</li>
                    <li>IoT Core, DynamoDB, Bedrock</li>
                  </ul>
                </div>
                <FlowLink label="MQTT" />
                <div className="layer">
                  <h3>Robot</h3>
                  <p>ROS 2, chạy trên xe</p>
                  <ul>
                    <li>Nav2 dẫn đường</li>
                    <li>Giám sát an toàn</li>
                    <li>Phát thuyết minh</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="subhead">Tiến độ</h2>
              <p className="sub">Dự án đang xây dựng. Trang này mô tả mục tiêu, chưa phải sản phẩm hoàn chỉnh.</p>
            </Reveal>
            <ul className="status-list">
              {status.map((s, i) => (
                <Reveal key={s.text} delay={i * 50}>
                  <li>
                    <span className={`tag ${s.tone}`}>{s.label}</span>
                    <span>{s.text}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">CompassGuide · Dự án đang xây dựng</div>
      </footer>
    </>
  )
}
