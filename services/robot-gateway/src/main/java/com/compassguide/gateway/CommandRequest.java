package com.compassguide.gateway;

public record CommandRequest(String cmdId, String tourId, String action, String routeId) {
}
