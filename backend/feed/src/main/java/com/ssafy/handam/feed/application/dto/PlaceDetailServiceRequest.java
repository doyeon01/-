package com.ssafy.handam.feed.application.dto;

public record PlaceDetailServiceRequest(Long id) {

    public PlaceDetailServiceRequest toServiceRequest() {
        return new PlaceDetailServiceRequest(id);
    }
}
