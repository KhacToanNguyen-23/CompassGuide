package com.compassguide.tour;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** NỘI BỘ: chỉ robot-gateway gọi. Không đi qua api-gateway. */
@RestController
@RequestMapping("/internal/tours")
public class InternalEventController {

    @PostMapping("/{tourId}/events")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void report(@PathVariable String tourId, @RequestBody RobotEventRequest event) {
        throw TourController.notImplemented();
    }
}
