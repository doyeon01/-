package com.ssafy.handam.feed.presentation.response.place;

import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.application.dto.PlaceDetailDto;

public record PlaceDetailResponse(
        Long id,
        String name,
        String address,
        String imageUrl,
        Double longitude,
        Double latitude,
        PlaceType placeType
) {

    public static PlaceDetailResponse of(PlaceDetailDto place) {
        return new PlaceDetailResponse(
                place.id(),
                place.name(),
                place.address(),
                place.imageUrl(),
                place.longitude(),
                place.latitude(),
                place.placeType());
    }
}