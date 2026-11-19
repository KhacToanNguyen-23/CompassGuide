package com.compassguide.content;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** Hợp đồng: contracts/openapi/content-service.yaml. Chưa cài đặt nghiệp vụ. */
@RestController
public class ContentController {

    @GetMapping("/routes")
    public List<Route> listRoutes() {
        throw notImplemented();
    }

    @GetMapping("/routes/{routeId}")
    public Route getRoute(@PathVariable String routeId) {
        throw notImplemented();
    }

    @PutMapping("/routes/{routeId}")
    public Route putRoute(@PathVariable String routeId, @RequestBody Route route) {
        throw notImplemented();
    }

    @GetMapping("/pois/{poiId}")
    public Poi getPoi(@PathVariable String poiId) {
        throw notImplemented();
    }

    @PutMapping("/pois/{poiId}")
    public Poi putPoi(@PathVariable String poiId, @RequestBody Poi poi) {
        throw notImplemented();
    }

    @PostMapping("/pois/{poiId}/narration")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void generateNarration(@PathVariable String poiId) {
        throw notImplemented();
    }

    private static ResponseStatusException notImplemented() {
        return new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Chưa cài đặt");
    }
}
