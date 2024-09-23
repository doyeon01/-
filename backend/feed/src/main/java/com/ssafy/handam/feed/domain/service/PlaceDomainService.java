package com.ssafy.handam.feed.domain.service;

import com.ssafy.handam.feed.domain.entity.Place;
import com.ssafy.handam.feed.infrastructure.jpa.PlaceJpaRepository;
import com.ssafy.handam.feed.application.dto.PlaceDetailDto;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PlaceDomainService {

    private final PlaceJpaRepository placeJpaRepository;

    public PlaceDetailDto getPlaceDetail(Long placeId) {
        Place place = placeJpaRepository.findById(placeId).orElseThrow(() -> new IllegalArgumentException(placeId.toString()));
        return PlaceDetailDto.of(place);
    }
}