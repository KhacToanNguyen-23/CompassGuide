"""Robot giả lập: nhận lệnh tour qua MQTT, chạy máy trạng thái đơn giản, gửi ack/state/event.

Theo hợp đồng trong contracts/mqtt.md. Không điều khiển phần cứng.
"""
import json
import os
import threading
import time
from datetime import datetime, timezone

import paho.mqtt.client as mqtt

ROBOT_ID = os.getenv("ROBOT_ID", "robot-01")
HOST = os.getenv("MQTT_HOST", "localhost")
PORT = int(os.getenv("MQTT_PORT", "1883"))
POI_COUNT = int(os.getenv("POI_COUNT", "3"))
STEP_SECONDS = float(os.getenv("STEP_SECONDS", "3"))
BASE = "compassguide/" + ROBOT_ID

lock = threading.Lock()
state = {"status": "READY", "tourId": None, "poiIndex": 0, "battery": 100}
prev_status = "READY"
step_started = time.time()


def now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def publish(client, topic, payload):
    client.publish(BASE + "/" + topic, json.dumps(payload), qos=1)


def event(client, etype, detail=""):
    publish(client, "event", {"type": etype, "tourId": state["tourId"], "detail": detail, "ts": now()})


def on_connect(client, userdata, flags, reason_code, properties):
    client.subscribe(BASE + "/cmd", qos=1)
    client.publish(BASE + "/presence", json.dumps({"online": True, "ts": now()}), qos=1, retain=True)
    print("[sim] connected, listening on " + BASE + "/cmd")


def on_message(client, userdata, msg):
    global prev_status, step_started
    cmd = json.loads(msg.payload)
    action = cmd.get("action")
    with lock:
        status = state["status"]
        ok = False
        if action == "START" and status == "READY":
            state.update(status="NAVIGATING", tourId=cmd.get("tourId"), poiIndex=0)
            ok = True
        elif action == "PAUSE" and status in ("NAVIGATING", "NARRATING"):
            prev_status = status
            state["status"] = "PAUSED"
            ok = True
        elif action == "RESUME" and status == "PAUSED":
            state["status"] = prev_status
            ok = True
        elif action == "END" and status not in ("READY", "IDLE"):
            state.update(status="READY", tourId=None, poiIndex=0)
            ok = True
        if ok:
            step_started = time.time()
    publish(client, "ack", {
        "cmdId": cmd.get("cmdId"),
        "result": "ACCEPTED" if ok else "REJECTED",
        "reason": None if ok else "invalid in " + status,
    })
    if ok:
        event(client, "CMD_" + str(action))


def run_tour(client):
    global step_started
    while True:
        time.sleep(1)
        with lock:
            status = state["status"]
            if status in ("NAVIGATING", "NARRATING") and time.time() - step_started >= STEP_SECONDS:
                step_started = time.time()
                if status == "NAVIGATING":
                    state["status"] = "NARRATING"
                    event(client, "ARRIVED", "poi " + str(state["poiIndex"]))
                else:
                    state["poiIndex"] += 1
                    if state["poiIndex"] >= POI_COUNT:
                        event(client, "TOUR_COMPLETED")
                        state.update(status="READY", tourId=None, poiIndex=0)
                    else:
                        state["status"] = "NAVIGATING"
            snapshot = dict(state, ts=now())
        publish(client, "state", snapshot)


def main():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.will_set(BASE + "/presence", json.dumps({"online": False}), qos=1, retain=True)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(HOST, PORT)
    threading.Thread(target=run_tour, args=(client,), daemon=True).start()
    client.loop_forever()


if __name__ == "__main__":
    main()
