package com.ssafy.handam.feed.presentation.response.place;

import com.ssafy.handam.feed.domain.entity.Place;
import com.ssafy.handam.feed.domain.PlaceType;

public record PlaceDetailResponse(Long id,
                                  String name,
                                  String address1,
                                  String address2,
                                  String imageUrl,
                                  Double longitude,
                                  Double latitude,
                                  PlaceType placeType) {

    public static PlaceDetailResponse of(Place place) {
        return new PlaceDetailResponse(place.getId(),
                place.getName(),
                place.getAddress1(),
                place.getAddress2(),
                place.getImageUrl(),
                place.getLongitude(),
                place.getLatitude(),
                place.getPlaceType());
    }
}
