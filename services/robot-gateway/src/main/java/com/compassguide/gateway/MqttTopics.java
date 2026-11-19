package com.compassguide.gateway;

/** Tên topic theo contracts/mqtt.md. Chỉ định nghĩa ở đây, không ghi cứng chỗ khác. */
public final class MqttTopics {

    private static final String ROOT = "compassguide";

    private MqttTopics() {
    }

    public static String cmd(String robotId) {
        return ROOT + "/" + robotId + "/cmd";
    }

    public static String ack(String robotId) {
        return ROOT + "/" + robotId + "/ack";
    }

    public static String state(String robotId) {
        return ROOT + "/" + robotId + "/state";
    }

    public static String event(String robotId) {
        return ROOT + "/" + robotId + "/event";
    }

    public static String presence(String robotId) {
        return ROOT + "/" + robotId + "/presence";
    }
}
