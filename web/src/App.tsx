import ChatDemo from './components/ChatDemo'
import Reveal from './components/Reveal'
import RouteHero from './components/RouteHero'
import SafetyDemo from './components/SafetyDemo'
import SensorLayout from './components/SensorLayout'
import StateMachine from './components/StateMachine'

/**
 * Khi đã có ảnh robot hoặc địa điểm thật, đặt file vào web/public (ví dụ /hero.jpg)
 * rồi điền đường dẫn vào đây: hero sẽ chuyển sang kiểu ảnh toàn khung.
 */
const HERO_IMAGE = ''

const steps = [
  { title: 'Chọn tuyến', text: 'Nhân viên chọn tuyến tham quan và bấm Bắt đầu trên ứng dụng web.' },
  { title: 'Robot dẫn đường', text: 'Robot đi chậm theo tuyến đã lập bản đồ, đoàn khách đi bộ theo sau.' },
  { title: 'Dừng và thuyết minh', text: 'Tới mỗi điểm, robot dừng hẳn rồi phát lời giới thiệu lưu sẵn trên xe.' },
  { title: 'Theo dõi từ xa', text: 'Vị trí, điểm hiện tại, pin và sự kiện được gửi về cho nhân viên.' },
]

const spec = [
  ['Điểm dừng mỗi tuyến', '3 – 5'],
  ['Tốc độ dẫn tối đa', '≤ 0,5 m/s'],
  ['Microservice', '5'],
  ['Lệnh vận tốc từ cloud', '0'],
]

const topics = [
  ['cmd', 'cloud → robot', 'START, PAUSE, RESUME, END'],
  ['ack', 'robot → cloud', 'xác nhận lệnh'],
  ['state', 'robot → cloud', 'trạng thái, mỗi giây một lần'],
  ['event', 'robot → cloud', 'sự kiện rời rạc'],
  ['presence', 'robot → cloud', 'online hoặc offline'],
]

const status: { tone: 'done' | 'doing' | 'next'; label: string; text: string }[] = [
  { tone: 'done', label: 'ĐÃ XONG', text: 'Kiến trúc microservice, hợp đồng API và MQTT, khung 5 service, robot giả lập, môi trường Docker.' },
  { tone: 'doing', label: 'ĐANG LÀM', text: 'Luồng điều khiển đầu-cuối: từ nút Bắt đầu trên web đến robot giả lập phản hồi.' },
  { tone: 'doing', label: 'ĐANG LÀM', text: 'Robot mô phỏng đi qua các điểm dừng bằng ROS 2 và Nav2.' },
  { tone: 'next', label: 'SẮP TỚI', text: 'Dashboard vận hành, thuyết minh, trợ lý AI, digital twin và chạy thử trên robot thật.' },
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
      <header className="topbar">
        <nav className="wrap bar" aria-label="Điều hướng chính">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true" />
            COMPASSGUIDE
          </a>
          <div className="nav-links">
            <a href="#how">Cách hoạt động</a>
            <a href="#safety">An toàn</a>
            <a href="#ai">Trợ lý AI</a>
            <a href="#states">Trạng thái</a>
            <a href="#architecture">Kiến trúc</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <div
          className={HERO_IMAGE ? 'hero has-photo' : 'hero'}
          style={HERO_IMAGE ? { backgroundImage: `url(${HERO_IMAGE})` } : undefined}
        >
          <div className="wrap hero-grid">
            <div>
              <p className="status-line">
                <span className="led" aria-hidden="true" /> BẢN THIẾT KẾ · CHƯA CÓ ROBOT
              </p>
              <h1>Robot hướng dẫn viên tự hành</h1>
              <p className="lead">
                CompassGuide dẫn đoàn khách đi bộ theo tuyến đã lập bản đồ, dừng thuyết minh tại từng điểm. Nhân viên điều
                khiển và theo dõi chuyến đi từ một ứng dụng web, hệ thống chạy trên AWS.
              </p>
              <a className="btn" href="#how">
                Xem cách hoạt động ↓
              </a>
            </div>
            <SensorLayout />
          </div>
        </div>

        <section id="how">
          <div className="wrap sec">
            <div className="idx">01</div>
            <div>
              <Reveal>
                <h2>Một chuyến tham quan diễn ra thế nào</h2>
                <p className="sub">Robot là hướng dẫn viên dẫn đoàn: không chở khách và không tự đi tìm khách.</p>
              </Reveal>
              <div className="split">
                <Reveal>
                  <ol className="steps">
                    {steps.map((s, i) => (
                      <li key={s.title}>
                        <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <h3>{s.title}</h3>
                          <p>{s.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>
                <Reveal delay={80}>
                  <RouteHero />
                </Reveal>
              </div>
              <Reveal>
                <table className="spec">
                  <caption>Thông số thiết kế (mục tiêu từ yêu cầu dự án, chưa phải kết quả đo)</caption>
                  <tbody>
                    {spec.map(([k, v]) => (
                      <tr key={k}>
                        <th scope="row">{k}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="safety">
          <div className="wrap sec">
            <div className="idx">02</div>
            <div>
              <Reveal>
                <h2>Robot tự quyết định dừng</h2>
                <p className="sub">
                  Quyết định dừng nằm trên robot, không chờ cloud. Gặp vật cản hoặc mất kết nối, robot tự dừng; nút dừng khẩn
                  cấp ngắt nguồn động cơ bằng phần cứng.
                </p>
              </Reveal>
              <div className="split">
                <Reveal>
                  <ul className="plain">
                    <li>Dừng khi có vật cản chắn đường.</li>
                    <li>Không cần chờ mạng để dừng.</li>
                    <li>Nút dừng khẩn cấp phần cứng, độc lập với phần mềm.</li>
                  </ul>
                </Reveal>
                <Reveal delay={80}>
                  <SafetyDemo />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="ai">
          <div className="wrap sec">
            <div className="idx">03</div>
            <div>
              <Reveal>
                <h2>Trợ lý AI chỉ đọc, không điều khiển robot</h2>
                <p className="sub">
                  Trợ lý trả lời câu hỏi về campus từ nội dung đã được duyệt, và không có đường nào tới robot.
                </p>
              </Reveal>
              <div className="split">
                <Reveal>
                  <ul className="plain">
                    <li>Chỉ trả lời từ nội dung đã duyệt.</li>
                    <li>Nói rõ khi không biết.</li>
                    <li>Không truy cập điều khiển robot.</li>
                  </ul>
                </Reveal>
                <Reveal delay={80}>
                  <ChatDemo />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="states">
          <div className="wrap sec">
            <div className="idx">04</div>
            <div>
              <Reveal>
                <h2>Trạng thái của một tour</h2>
                <p className="sub">Robot quyết định trạng thái; cloud chỉ nhận và hiển thị lại.</p>
              </Reveal>
              <Reveal delay={60}>
                <StateMachine />
              </Reveal>
            </div>
          </div>
        </section>

        <section id="architecture">
          <div className="wrap sec">
            <div className="idx">05</div>
            <div>
              <Reveal>
                <h2>Ba lớp, một hợp đồng giao tiếp</h2>
                <p className="sub">
                  Robot lo việc đi và dừng an toàn. AWS lo giao nhiệm vụ, theo dõi và AI. Mất mạng không làm robot mất khả
                  năng dừng.
                </p>
              </Reveal>
              <Reveal delay={60}>
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
              <Reveal delay={60}>
                <table className="topics">
                  <caption>
                    Các topic MQTT, dạng <code>compassguide/{'{robotId}'}/…</code>
                  </caption>
                  <tbody>
                    {topics.map(([t, d, c]) => (
                      <tr key={t}>
                        <th scope="row">{t}</th>
                        <td>{d}</td>
                        <td>{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="status">
          <div className="wrap sec">
            <div className="idx">06</div>
            <div>
              <Reveal>
                <h2>Tiến độ</h2>
                <p className="sub">Dự án đang xây dựng. Trang này mô tả mục tiêu, chưa phải sản phẩm hoàn chỉnh.</p>
              </Reveal>
              <ul className="status-list">
                {status.map((s, i) => (
                  <Reveal key={s.text} delay={i * 40}>
                    <li>
                      <span className={`tag ${s.tone}`}>{s.label}</span>
                      <span>{s.text}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">COMPASSGUIDE · DỰ ÁN ĐANG XÂY DỰNG</div>
      </footer>
    </>
  )
}
