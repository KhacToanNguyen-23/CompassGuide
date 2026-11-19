package com.compassguide.content;

import java.util.List;

public record Route(String routeId, String name, List<String> poiIds) {
}
