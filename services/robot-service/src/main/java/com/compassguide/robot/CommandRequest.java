package com.compassguide.robot;

public record CommandRequest(String cmdId, String tourId, String action, String routeId) {
}
