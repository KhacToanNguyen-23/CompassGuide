const ITEMS = [
  'AWS IoT Core',
  'Amazon DynamoDB',
  'Amazon Bedrock',
  'Amazon Polly',
  'ROS 2',
  'Nav2',
  'Spring Boot',
  'React',
  'MQTT',
  'OpenAPI',
  'Docker',
]

/** Dải công nghệ chạy ngang liên tục. */
export default function Marquee() {
  return (
    <div className="marquee" aria-label="Technologies used">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} aria-hidden={i >= ITEMS.length}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
