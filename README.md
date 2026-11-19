# CompassGuide (platform)

Platform của CompassGuide: robot tự hành dẫn đoàn khách tham quan theo tuyến cố định, điều khiển và giám sát qua web và AWS. Phần robot nằm trong thư mục `robot/` của chính repo này.

SRS: https://claude.ai/artifact/6nPZxwjN2YKKkybmMro7Fm

## Nguyên tắc

1. An toàn nằm trên robot, không chờ cloud.
2. Robot chạy offline được.
3. Cloud chỉ giao lệnh cấp tour: START, PAUSE, RESUME, END. Không có lệnh vận tốc.
4. AI không có quyền điều khiển robot (`assistant-service` chỉ đọc).
5. Mỗi service sở hữu dữ liệu của mình; web chỉ gọi `api-gateway`.

Ranh giới service, dữ liệu và đường gọi: [`contracts/architecture.md`](contracts/architecture.md).

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `services/api-gateway` | Spring Cloud Gateway: định tuyến, CORS (xác thực sẽ thêm sau) |
| `services/tour-service` | Vòng đời tour, lịch sử, sự kiện |
| `services/robot-service` | Cầu nối MQTT với robot / AWS IoT Core |
| `services/content-service` | Tuyến, điểm tham quan, thuyết minh |
| `services/assistant-service` | Hỏi đáp (Bedrock), chỉ đọc |
| `web/` | React + TypeScript + Vite |
| `robot/` | ROS 2 + Nav2 chạy trên xe, có Docker dev riêng (xem `robot/README.md`) |
| `simulator/` | Robot giả lập (Python) khi chưa có robot thật |
| `contracts/` | `architecture.md`, `mqtt.md`, `openapi/*.yaml`: sửa ở đây trước khi sửa code |
| `infra/` | Cấu hình hạ tầng dev (Mosquitto) |
| `kb/` | Tài liệu cho Bedrock Knowledge Base |
| `docs/` | Tài liệu |

Backend: Java 21 + Spring Boot 3. Frontend: React + TypeScript. Mỗi service là một container Docker.

## Trạng thái

Đây là **khung**: ranh giới, hợp đồng, cổng gateway, controller, client giữa service, test khởi động và CI đã có. **Nghiệp vụ chưa viết:** các endpoint của service trả `501 Not Implemented`; chưa có DynamoDB, MQTT thật, xác thực Cognito.

## Chạy ở máy dev

Cần Docker Desktop.

```bash
docker compose up --build
```

| Thành phần | Địa chỉ |
| --- | --- |
| Web | http://localhost:3000 |
| api-gateway | http://localhost:8080/actuator/health |
| tour / robot / content / assistant | cổng 8081 / 8082 / 8083 / 8084 (`/actuator/health`) |
| MQTT (Mosquitto) | localhost:1883 (WebSocket 9001) |
| DynamoDB Local | http://localhost:8000 |

Chạy web riêng khi dev giao diện: `cd web && npm install && npm run dev` (proxy `/api` sang gateway ở cổng 8080).

## Quy ước

- Không commit chứng chỉ, khóa, `.env`.
- **Nhánh:** `main` là production (dùng để deploy, chỉ nhận từ `dev` khi phát hành). `dev` là nhánh làm việc chung. Mỗi việc làm trên nhánh `feature/...` tách từ `dev`, gộp lại vào `dev` bằng pull request.
- **CI:** `.github/workflows/` có ba workflow (`services`, `web`, `robot`) chỉ chạy khi thư mục tương ứng đổi.
- Đổi giao thức MQTT/API: sửa `contracts/` trước, báo cả team.
- Lệnh điều khiển robot chỉ gọi nội bộ, không route qua gateway.
