# CompassGuide

Robot tự hành dẫn đoàn khách tham quan theo tuyến cố định, thuyết minh tại từng điểm dừng, được điều khiển và giám sát từ web qua AWS.

Tài liệu yêu cầu đầy đủ (SRS): https://claude.ai/artifact/6nPZxwjN2YKKkybmMro7Fm

## Nguyên tắc

1. An toàn nằm trên robot, không chờ cloud.
2. Robot chạy offline được (bản đồ, tuyến, âm thanh lưu cục bộ).
3. Cloud chỉ giao lệnh cấp tour: START, PAUSE, RESUME, END. Không có lệnh vận tốc.
4. AI không có quyền điều khiển robot.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `robot/src/` | Các node ROS 2: `tour_manager`, `safety_supervisor`, `audio_player`, `cloud_bridge` |
| `robot/config/` | Tham số Nav2, AMCL |
| `robot/maps/` | Bản đồ `.pgm` + `.yaml` |
| `robot/routes/` | Tuyến và điểm tham quan (YAML) |
| `robot/audio/` | Âm thanh đồng bộ từ S3 (không commit) |
| `cloud/functions/` | Lambda |
| `cloud/simulator/` | Robot giả lập để test cloud khi chưa có robot thật |
| `cloud/kb/` | Tài liệu cho Bedrock Knowledge Base |
| `web/` | Web điều khiển, dashboard, chat |
| `docs/` | Tài liệu, quy ước, nhật ký đo đạc |

## Quy ước

- Tên robot (Thing): `robot-01`. Topic MQTT: `compassguide/{robotId}/cmd|ack|state|event|presence`.
- Không commit chứng chỉ, khóa, `.env`. Xem `.gitignore`.
- Nhánh: `main` luôn chạy được; làm việc trên nhánh `feature/...`, gộp bằng pull request.
- Mỗi thay đổi tham số robot (Nav2, bản đồ, tuyến) ghi lại kết quả đo trong `docs/`.

## Bắt đầu

Làm theo mục 7 của SRS, bắt đầu từ Giai đoạn 0 (chuẩn bị nền tảng).
