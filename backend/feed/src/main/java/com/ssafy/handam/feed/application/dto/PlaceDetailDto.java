package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Place;

public record PlaceDetailDto(
        Long id,
        String name,
        String address,
        String imageUrl,
        Double longitude,
        Double latitude,
        PlaceType placeType
) {

    public static PlaceDetailDto of(Place place) {
        return new PlaceDetailDto(
                place.getId(),
                place.getName(),
                place.getAddress().getAddress(),
                place.getImageUrl(),
                place.getAddress().getLongitude(),
                place.getAddress().getLatitude(),
                place.getPlaceType());
    }
}