# Kiến trúc microservice

Tài liệu này chốt ranh giới giữa các service. Sửa ở đây trước khi sửa code.

## Nguyên tắc

1. **Mỗi service sở hữu dữ liệu của mình.** Service khác muốn dữ liệu đó phải gọi API, không đọc thẳng bảng.
2. **Web chỉ gọi `api-gateway`.** Không service nào mở thẳng ra ngoài.
3. **Chỉ `robot-gateway` nói chuyện MQTT với robot.** Các service khác không biết MQTT.
4. **`ai-service` chỉ đọc, không có đường tới `robot-gateway`.** Đây là yêu cầu an toàn, không đổi.
5. **Lệnh điều khiển robot không lộ ra ngoài.** `POST /robots/{id}/commands` chỉ gọi từ trong mạng nội bộ (từ `tour-service`); gateway chỉ cho web đọc trạng thái.
6. **Hợp đồng trước, code sau.** API mô tả trong `contracts/openapi/`, MQTT trong `contracts/mqtt.md`.

## Ranh giới và dữ liệu

| Service | Trách nhiệm | Sở hữu dữ liệu (DynamoDB) | Gọi tới |
| --- | --- | --- | --- |
| `api-gateway` | Cửa duy nhất cho web: định tuyến, CORS, kiểm tra token | không | tất cả service |
| `tour-service` | Vòng đời tour: tạo, tạm dừng, tiếp tục, kết thúc; lịch sử và sự kiện | `Tours`, `Events` | `content-service` (kiểm tra tuyến), `robot-gateway` (gửi lệnh) |
| `robot-gateway` | Cầu nối MQTT/IoT Core: gửi `cmd`, nhận `ack`/`state`/`event`/`presence` | `RobotState` (trạng thái mới nhất) | `tour-service` (báo ack và sự kiện) |
| `content-service` | Tuyến, điểm tham quan, thuyết minh (Polly, S3) | `Routes`, `Pois` | không |
| `ai-service` | Hỏi đáp qua Bedrock Knowledge Base | `ChatLogs` (tuỳ chọn) | Bedrock (không gọi service nội bộ nào) |

## Ai gọi ai

```text
Web ──> api-gateway ──> tour-service ──> content-service
                    │         │
                    │         └──> robot-gateway ──MQTT──> Robot
                    ├──> content-service
                    ├──> robot-gateway   (chỉ GET trạng thái)
                    └──> ai-service

robot-gateway ──> tour-service   (báo ack, sự kiện, cập nhật trạng thái tour)
```

Không có vòng gọi khác. Nếu cần thêm một đường gọi, cập nhật bảng trên trước.

## Đường API công khai (qua gateway)

| Đường dẫn ngoài | Chuyển tới | Ghi chú |
| --- | --- | --- |
| `/api/tours/**` | `tour-service` `/tours/**` | |
| `/api/routes/**`, `/api/pois/**` | `content-service` | |
| `GET /api/robots/{id}/state` | `robot-gateway` `/robots/{id}/state` | Chỉ GET, không lộ lệnh |
| `POST /api/chat` | `ai-service` `/chat` | |

## Đường nội bộ (không qua gateway)

| Đường dẫn | Service | Ai gọi |
| --- | --- | --- |
| `POST /robots/{robotId}/commands` | `robot-gateway` | `tour-service` |
| `POST /internal/tours/{tourId}/events` | `tour-service` | `robot-gateway` |

## Cấu hình

URL của service khác lấy từ biến môi trường (ví dụ `ROBOT_GATEWAY_URL`), có giá trị mặc định cho Docker Compose. Không ghi cứng địa chỉ trong code.

## Chưa làm

- Xác thực Cognito (JWT) ở gateway.
- Lưu DynamoDB thật và client AWS.
- Cài đặt MQTT thật trong `robot-gateway`.
- Log tập trung, trace.
