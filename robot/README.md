# CompassGuide Robot

Phần robot của CompassGuide: ROS 2 + Nav2 chạy trên xe tự hành dẫn tour. Cùng repo với phần platform (AWS, web, microservice, ở các thư mục `services/` và `web/`). Hợp đồng MQTT giữa hai bên nằm ở `../contracts/mqtt.md`.

## Nguyên tắc

1. Quyết định dừng nằm trên robot, không chờ cloud.
2. Robot chạy offline được (bản đồ, tuyến, âm thanh lưu cục bộ).
3. Chỉ nhận lệnh cấp tour (START, PAUSE, RESUME, END), không nhận lệnh vận tốc từ cloud.
4. Các node chỉ nói chuyện qua topic ROS chuẩn (`/scan`, `/odom`, `/cmd_vel`, `/tf`), nên robot mô phỏng và robot thật thay nhau được.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `src/tour_manager` | Máy trạng thái tour, đi tới từng điểm |
| `src/safety_supervisor` | Vật cản, watchdog, dừng an toàn |
| `src/audio_player` | Phát thuyết minh lưu cục bộ |
| `src/cloud_bridge` | Cầu nối MQTT với AWS IoT Core |
| `config/` | Tham số Nav2, AMCL |
| `maps/` | Bản đồ `.pgm` + `.yaml` |
| `routes/` | Tuyến và điểm tham quan (YAML) |
| `audio/` | Âm thanh đồng bộ từ S3 (không commit) |
| `simulation/` | Thế giới Gazebo, robot mô phỏng |
| `hardware/` | Chờ robot thật: driver, URDF thật, đấu dây, vỏ in 3D |
| `docker/` | Môi trường dev chung (ROS 2 Humble + Nav2 + Gazebo) |

Các package hiện chỉ là khung: mỗi node chỉ khởi động và ghi một dòng log.

## Chạy môi trường dev

Cần Docker Desktop. Build lần đầu khá lâu và nặng (vài GB).

```bash
docker compose run --rm dev
```

Trong container:

```bash
cd /ws
colcon build
source install/setup.bash
ros2 run tour_manager tour_manager
```

Dùng VS Code thì mở thư mục này rồi chọn "Reopen in Container" (cấu hình trong `.devcontainer/`).

## Lưu ý về giao diện đồ họa

Gazebo và RViz cần hiển thị đồ họa. Docker Desktop trên Windows không tự có sẵn việc này; hướng đi là WSL2 với WSLg hoặc truy cập qua VNC. Phần này chưa được cấu hình và chưa kiểm thử.

## Quy ước

- Không commit chứng chỉ AWS IoT, khóa, `.env`.
- Làm trên nhánh `feature/...` tách từ `dev`, gộp vào `dev` bằng pull request. `main` chỉ nhận từ `dev` khi cần phát hành.
- Số đo từ robot thật (quãng phanh, sai số odometry, độ ổn định định vị) ghi vào `docs/`.
