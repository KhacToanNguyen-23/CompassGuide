package com.compassguide.tour;

import java.time.Instant;

public record RobotEventRequest(String type, String detail, Instant ts) {
}
