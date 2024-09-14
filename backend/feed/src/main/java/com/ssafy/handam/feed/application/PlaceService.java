package com.ssafy.handam.feed.application;

import com.ssafy.handam.feed.application.dto.PlaceDetailServiceRequest;
import com.ssafy.handam.feed.common.error.place.PlaceNotFoundException;
import com.ssafy.handam.feed.domain.entity.Place;
import com.ssafy.handam.feed.domain.repository.PlaceRepository;
import com.ssafy.handam.feed.presentation.response.place.PlaceDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    public PlaceDetailResponse getPlaceDetail(Long id) {
        return PlaceDetailResponse.of(findPlaceById(id));
    }

    private Place findPlaceById(Long id) {
        return placeRepository.findById(id).orElseThrow(() -> new PlaceNotFoundException(id));
    }
}
