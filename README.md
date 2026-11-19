# CompassGuide (platform)

Platform của CompassGuide: robot tự hành dẫn đoàn khách tham quan theo tuyến cố định, điều khiển và giám sát qua web và AWS. Phần robot nằm ở repo riêng (`CompassGuide-Robot`).

SRS: https://claude.ai/artifact/6nPZxwjN2YKKkybmMro7Fm

## Nguyên tắc

1. An toàn nằm trên robot, không chờ cloud.
2. Robot chạy offline được.
3. Cloud chỉ giao lệnh cấp tour: START, PAUSE, RESUME, END. Không có lệnh vận tốc.
4. AI không có quyền điều khiển robot (`ai-service` chỉ đọc).

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `services/api-gateway` | Cửa duy nhất cho web: xác thực, định tuyến |
| `services/tour-service` | Tạo tour, gửi lệnh, lịch sử |
| `services/robot-gateway` | Nói chuyện MQTT với robot / AWS IoT Core |
| `services/content-service` | Tuyến, điểm tham quan, thuyết minh |
| `services/ai-service` | Hỏi đáp (Bedrock), chỉ đọc |
| `web/` | React + TypeScript + Vite |
| `simulator/` | Robot giả lập (Python) khi chưa có robot thật |
| `contracts/` | Hợp đồng MQTT/API: sửa ở đây trước khi sửa code |
| `infra/` | Cấu hình hạ tầng dev (Mosquitto) |
| `kb/` | Tài liệu cho Bedrock Knowledge Base |
| `docs/` | Tài liệu |

Backend: Java 21 + Spring Boot 3. Frontend: React + TypeScript. Mỗi service là một container Docker.

## Chạy ở máy dev

Cần Docker Desktop.

```bash
docker compose up --build
```

| Thành phần | Địa chỉ |
| --- | --- |
| Web | http://localhost:3000 |
| api-gateway | http://localhost:8080/actuator/health |
| tour / robot-gateway / content / ai | cổng 8081 / 8082 / 8083 / 8084 |
| MQTT (Mosquitto) | localhost:1883 (WebSocket 9001) |
| DynamoDB Local | http://localhost:8000 |

Khung hiện tại chỉ có hàm khởi động và endpoint `/actuator/health`; nghiệp vụ chưa được viết.

## Quy ước

- Không commit chứng chỉ, khóa, `.env`.
- `main` luôn chạy được; làm trên nhánh `feature/...`, gộp bằng pull request.
- Đổi giao thức MQTT/API: sửa `contracts/` trước, báo cả team.
