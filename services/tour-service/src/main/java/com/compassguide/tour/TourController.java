package com.compassguide.tour;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** Hợp đồng: contracts/openapi/tour-service.yaml. Chưa cài đặt nghiệp vụ. */
@RestController
@RequestMapping("/tours")
public class TourController {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TourResponse create(@RequestBody CreateTourRequest request) {
        throw notImplemented();
    }

    @GetMapping
    public List<TourResponse> list() {
        throw notImplemented();
    }

    @GetMapping("/{tourId}")
    public TourResponse get(@PathVariable String tourId) {
        throw notImplemented();
    }

    @PostMapping("/{tourId}/pause")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void pause(@PathVariable String tourId) {
        throw notImplemented();
    }

    @PostMapping("/{tourId}/resume")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void resume(@PathVariable String tourId) {
        throw notImplemented();
    }

    @PostMapping("/{tourId}/end")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void end(@PathVariable String tourId) {
        throw notImplemented();
    }

    static ResponseStatusException notImplemented() {
        return new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "Chưa cài đặt");
    }
}
