package com.compassguide.gateway;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** Hợp đồng: contracts/openapi/robot-gateway.yaml. Chưa cài MQTT. */
@RestController
@RequestMapping("/robots")
public class RobotController {

    /** NỘI BỘ: chỉ tour-service gọi. Không được route qua api-gateway. */
    @PostMapping("/{robotId}/commands")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void sendCommand(@PathVariable String robotId, @RequestBody CommandRequest command) {
        throw notImplemented();
    }

    @GetMapping("/{robotId}/state")
    public RobotStateResponse state(@PathVariable String robotId) {
        throw notImplemented();
    }

    private static ResponseStatusException notImplemented() {
        return new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Chưa cài đặt");
    }
}
