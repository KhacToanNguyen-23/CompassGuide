package com.compassguide.tour;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/** Gọi robot-service (nội bộ) để gửi lệnh cấp tour. */
@Component
public class RobotServiceClient {

    public record Command(String cmdId, String tourId, String action, String routeId) {
    }

    private final RestClient client;

    public RobotServiceClient(RestClient.Builder builder, @Value("${services.robot-service.url}") String baseUrl) {
        this.client = builder.baseUrl(baseUrl).build();
    }

    public void sendCommand(String robotId, Command command) {
        client.post()
                .uri("/robots/{robotId}/commands", robotId)
                .body(command)
                .retrieve()
                .toBodilessEntity();
    }
}
