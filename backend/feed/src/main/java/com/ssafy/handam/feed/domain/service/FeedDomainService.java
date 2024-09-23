package com.ssafy.handam.feed.domain.service;

import com.ssafy.handam.feed.common.error.place.PlaceNotFoundException;
import com.ssafy.handam.feed.domain.entity.Place;
import com.ssafy.handam.feed.domain.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FeedDomainService {

    private final PlaceRepository placeRepository;

        public Place findById(Long placeId) {
                return placeRepository.findById(placeId).orElseThrow(() -> new PlaceNotFoundException(placeId));
        }

        public Place findByAddress(String address) {
                return placeRepository.findByAddress(address).orElseThrow(() -> new IllegalArgumentException(address));
        }
}