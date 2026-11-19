package com.compassguide.robot;

import java.time.Instant;

public record RobotStateResponse(boolean online, String status, String tourId, Integer poiIndex,
        Integer battery, Instant lastSeen) {
}
