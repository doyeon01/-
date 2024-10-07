package com.ssafy.handam.feed.infrastructure.jpa;

import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Feed;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedJpaRepository extends JpaRepository<Feed, Long> {

    Page<Feed> findByUserId(Long userId, Pageable pageable);

    List<Feed> findByIdIn(List<Long> feedIds);

    Page<Feed> findByTitleContainingOrContentContainingOrAddress1ContainingOrAddress2ContainingAndPlaceTypeOrderByLikeCountDesc(
            String title, String content, String address1, String address2, PlaceType placeType, Pageable pageable
    );

    List<Feed> findAll();
}
