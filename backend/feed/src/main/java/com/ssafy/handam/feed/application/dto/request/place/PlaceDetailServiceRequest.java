package com.ssafy.handam.feed.application.dto.request.place;

public record PlaceDetailServiceRequest(Long id) {

    public PlaceDetailServiceRequest toServiceRequest() {
        return new PlaceDetailServiceRequest(id);
    }
}
