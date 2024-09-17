package com.ssafy.handam.feed.presentation.request.place;

import com.ssafy.handam.feed.application.dto.request.place.PlaceDetailServiceRequest;
import jakarta.validation.constraints.NotNull;

public record PlaceDetailRequest(@NotNull Long id) {

    public PlaceDetailServiceRequest toServiceRequest() {
        return new PlaceDetailServiceRequest(id);
    }
}
