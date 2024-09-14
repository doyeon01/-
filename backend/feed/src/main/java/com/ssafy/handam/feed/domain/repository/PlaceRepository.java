package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository  extends JpaRepository<Place, Long> {

}
