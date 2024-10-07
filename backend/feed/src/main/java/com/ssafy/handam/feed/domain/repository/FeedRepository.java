package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

public interface FeedRepository {
    Optional<Feed> findById(Long id);

    Feed save(Feed feed);

    Page<Feed> findByUserId(Long userId, Pageable pageable);

    Page<FeedDocument> searchFeedsByKeywordSortedByLikeCount(String keyword, Pageable pageable);

    List<Feed> findByIdIn(List<Long> feedIds);

    Page<FeedDocument> getNearbyClusterCenter(GeoPoint geoPoint, String distance, Pageable pageable);
}
