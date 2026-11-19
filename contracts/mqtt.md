# Hợp đồng MQTT

Nguồn sự thật cho giao tiếp giữa robot và platform. Sửa file này **trước**, rồi mới sửa code robot và `robot-service`.

`{robotId}` là tên Thing của robot (ví dụ `robot-01`).

| Topic | Hướng | Nội dung |
| --- | --- | --- |
| `compassguide/{robotId}/cmd` | Cloud → Robot | START, PAUSE, RESUME, END |
| `compassguide/{robotId}/ack` | Robot → Cloud | Xác nhận lệnh |
| `compassguide/{robotId}/state` | Robot → Cloud | Trạng thái 1 lần/giây |
| `compassguide/{robotId}/event` | Robot → Cloud | Sự kiện rời rạc |
| `compassguide/{robotId}/presence` | Robot → Cloud | online/offline (Last Will) |

QoS 1 cho `cmd`, `ack`, `event`. Không có lệnh vận tốc. `cmdId` là duy nhất, robot bỏ qua lệnh đã xử lý.

## cmd

```json
{ "cmdId": "c-0007", "tourId": "t-001", "action": "START", "routeId": "route-a", "issuedAt": "2026-11-19T09:30:00Z" }
```

## ack

```json
{ "cmdId": "c-0007", "result": "ACCEPTED", "reason": null }
```

`result`: `ACCEPTED` hoặc `REJECTED` (kèm `reason`).

## state

```json
{ "tourId": "t-001", "status": "NARRATING", "poiIndex": 1, "poiId": "poi-library",
  "pose": { "x": 3.42, "y": 1.10, "yaw": 1.57 }, "battery": 78, "ts": "2026-11-19T09:31:12Z" }
```

`status`: `IDLE`, `READY`, `NAVIGATING`, `NARRATING`, `BLOCKED`, `PAUSED`, `RETURNING`, `COMPLETED`, `ABORTED`, `ERROR`.

## event

```json
{ "type": "OBSTACLE_STOP", "tourId": "t-001", "detail": "Lối đi bị chặn phía trước", "ts": "2026-11-19T09:31:40Z" }
```
