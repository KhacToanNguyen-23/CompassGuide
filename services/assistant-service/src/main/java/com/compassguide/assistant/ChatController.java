package com.compassguide.assistant;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Hợp đồng: contracts/openapi/assistant-service.yaml.
 * Quy tắc cứng: service này chỉ đọc kho kiến thức, KHÔNG gọi robot-service hay tour-service.
 */
@RestController
public class ChatController {

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Chưa cài đặt");
    }
}
