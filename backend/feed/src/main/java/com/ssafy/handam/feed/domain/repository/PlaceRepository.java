package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Place;
import java.util.Optional;

public interface PlaceRepository {

    Optional<Place> findById(Long id);
    Optional<Place> findByAddress(String address);
}