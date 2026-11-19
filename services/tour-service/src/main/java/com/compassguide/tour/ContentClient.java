package com.compassguide.tour;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/** Gọi content-service để kiểm tra tuyến tồn tại trước khi tạo tour. */
@Component
public class ContentClient {

    private final RestClient client;

    public ContentClient(RestClient.Builder builder, @Value("${services.content-service.url}") String baseUrl) {
        this.client = builder.baseUrl(baseUrl).build();
    }

    public boolean routeExists(String routeId) {
        return client.get()
                .uri("/routes/{routeId}", routeId)
                .exchange((request, response) -> response.getStatusCode().is2xxSuccessful());
    }
}
