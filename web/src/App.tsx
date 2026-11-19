import CountUp from './components/CountUp'
import Reveal from './components/Reveal'
import RouteHero from './components/RouteHero'
import StateTicker from './components/StateTicker'

const REPO_URL = 'https://github.com/KhacToanNguyen-23/CompassGuide'

const steps = [
  { title: 'Choose a route', text: 'Staff open the web app, pick a tour route and press Start.' },
  { title: 'The robot leads', text: 'It drives slowly along a mapped route while the group follows on foot.' },
  { title: 'Stop and narrate', text: 'At each point of interest the robot stops completely, then plays a stored narration.' },
  { title: 'Monitor remotely', text: 'A dashboard shows position, current stop, battery and live events.' },
]

const features = [
  { title: 'Fixed guided routes', text: 'One mapped area, one or two routes, three to five stops each, at a pace suited to walking.' },
  { title: 'Safety first', text: 'The robot stops on obstacles or lost connection, and a physical emergency stop cuts motor power in hardware.', safety: true },
  { title: 'Works offline', text: 'Map, route and audio live on the robot. Losing the network costs new commands, never the ability to stop.' },
  { title: 'Tour control from the web', text: 'Start, pause, resume and end a tour from a single web app.' },
  { title: 'Real-time monitoring', text: 'Robot state and events stream to the dashboard through AWS IoT Core.' },
  { title: 'AI assistant', text: 'Visitors ask about the campus and get answers from approved content. The AI cannot control the robot.' },
]

const topics = ['cmd', 'ack', 'state', 'event', 'presence']

const stack = [
  'ROS 2',
  'Nav2',
  'Java 21 + Spring Boot',
  'React + TypeScript',
  'AWS IoT Core',
  'DynamoDB',
  'Amazon Bedrock',
  'Amazon Polly',
  'Docker',
]

const status: { tone: 'done' | 'doing' | 'next'; label: string; text: string }[] = [
  { tone: 'done', label: 'Done', text: 'Microservice architecture, API and MQTT contracts, five service skeletons, robot simulator, Docker setup.' },
  { tone: 'doing', label: 'In progress', text: 'End-to-end control flow: from pressing Start on the web to the simulated robot responding.' },
  { tone: 'doing', label: 'In progress', text: 'A simulated robot driving through stops with ROS 2 and Nav2.' },
  { tone: 'next', label: 'Next', text: 'Narration, AI assistant, digital twin, and tests on the real robot.' },
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
        <nav className="nav" aria-label="Main">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true" />
            CompassGuide
          </a>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#architecture">Architecture</a>
            <a href="#status">Status</a>
          </div>
          <a className="btn small" href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <div className="hero">
          <div className="wrap">
            <span className="eyebrow">Proposed for First Cloud AI Journey</span>
            <h1>
              The autonomous <span className="grad">tour-guide robot</span>, powered by AWS
            </h1>
            <p className="lead">
              CompassGuide leads a group on foot along a mapped route, stops to narrate each point of interest, and lets
              staff control and monitor the tour from a single web app.
            </p>
            <div className="actions">
              <a className="btn primary" href="#how">
                See how it works
              </a>
              <a className="btn" href={REPO_URL} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </div>
            <RouteHero />
          </div>
        </div>

        <section className="stats-band" aria-label="Design targets">
          <div className="wrap stats">
            <div>
              <strong>3–5</strong>
              <span>stops per route</span>
            </div>
            <div>
              <strong>
                <CountUp to={0.5} decimals={1} prefix="≤ " suffix=" m/s" />
              </strong>
              <span>max guiding speed</span>
            </div>
            <div>
              <strong>
                <CountUp to={5} />
              </strong>
              <span>microservices</span>
            </div>
            <div>
              <strong>
                <CountUp to={0} />
              </strong>
              <span>velocity commands from the cloud</span>
            </div>
          </div>
          <p className="wrap fine">Design targets from the project requirements, not measured results.</p>
        </section>

        <section id="how">
          <div className="wrap">
            <Reveal>
              <h2>How it works</h2>
              <p className="sub">The robot is a group guide: it does not carry visitors and does not go looking for them.</p>
            </Reveal>
            <div className="grid cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="card">
                    <span className="step-no">{i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="alt">
          <div className="wrap">
            <Reveal>
              <h2>Features</h2>
              <p className="sub">Designed from the requirements specification the team wrote for the project.</p>
            </Reveal>
            <div className="grid cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <div className={f.safety ? 'card safety' : 'card'}>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="live">
          <div className="wrap split">
            <Reveal>
              <h2>Every tour is a stream of small messages</h2>
              <p className="sub">
                The cloud sends tour-level commands only. The robot answers with acknowledgements, a state heartbeat and
                events, all defined in a shared contract.
              </p>
              <div className="chips">
                {topics.map((t) => (
                  <span className="chip mono" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <StateTicker />
            </Reveal>
          </div>
        </section>

        <section id="architecture" className="alt">
          <div className="wrap">
            <Reveal>
              <h2>Architecture</h2>
              <p className="sub">
                The robot handles driving and stopping safely. AWS handles tasks, monitoring and AI. Losing the network
                never removes the robot's ability to stop.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="arch">
                <div className="layer">
                  <h3>Web</h3>
                  <p>Operator interface</p>
                  <ul>
                    <li>Tour control</li>
                    <li>Dashboard</li>
                    <li>AI chat</li>
                  </ul>
                </div>
                <FlowLink label="REST" />
                <div className="layer">
                  <h3>AWS</h3>
                  <p>Microservices</p>
                  <ul>
                    <li>api-gateway</li>
                    <li>tour, content, robot, assistant</li>
                    <li>IoT Core, DynamoDB, Bedrock</li>
                  </ul>
                </div>
                <FlowLink label="MQTT" />
                <div className="layer">
                  <h3>Robot</h3>
                  <p>ROS 2, on the vehicle</p>
                  <ul>
                    <li>Nav2 navigation</li>
                    <li>Safety supervisor</li>
                    <li>Narration playback</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="stack">
          <div className="wrap">
            <Reveal>
              <h2>Built with</h2>
              <p className="sub">Each part uses the tool that fits it best.</p>
              <div className="chips">
                {stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="status" className="alt">
          <div className="wrap">
            <Reveal>
              <h2>Status</h2>
              <p className="sub">The project is under construction. This page describes goals, not a finished product.</p>
            </Reveal>
            <ul className="status-list">
              {status.map((s, i) => (
                <Reveal key={s.text} delay={i * 70}>
                  <li>
                    <span className={`tag ${s.tone}`}>{s.label}</span>
                    <span>{s.text}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="start">
          <div className="wrap">
            <Reveal>
              <h2>Get started</h2>
              <p className="sub">Everything lives in one repository.</p>
            </Reveal>
            <div className="grid cols-3">
              <Reveal>
                <a className="card link" href={REPO_URL} target="_blank" rel="noreferrer">
                  <h3>Source code</h3>
                  <p>Services, web app, robot workspace and simulator on GitHub.</p>
                </a>
              </Reveal>
              <Reveal delay={80}>
                <a className="card link" href={`${REPO_URL}/tree/dev/contracts`} target="_blank" rel="noreferrer">
                  <h3>Contracts</h3>
                  <p>MQTT topics, OpenAPI files and the service architecture.</p>
                </a>
              </Reveal>
              <Reveal delay={160}>
                <div className="card">
                  <h3>Run it locally</h3>
                  <p>With Docker Desktop installed:</p>
                  <code className="cmd">docker compose up --build</code>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          CompassGuide ·{' '}
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </>
  )
}
