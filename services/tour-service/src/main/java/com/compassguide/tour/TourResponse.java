package com.compassguide.tour;

import java.time.Instant;

public record TourResponse(String tourId, String routeId, String robotId, TourStatus status, Instant createdAt) {
}
