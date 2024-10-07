package com.ssafy.handam.feed.infrastructure.elasticsearch;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedElasticsearchRepository extends ElasticsearchRepository<FeedDocument, Long> {

    Page<FeedDocument> findByTitleContainingOrContentContainingOrAddress1ContainingOrAddress2ContainingOrPlaceTypeOrPlaceNameOrderByLikeCount(
            String title, String content, String address1, String address2, String placeType, Pageable pageable);

    Page<FeedDocument> findByLocationNear(GeoPoint location, String distance, Pageable pageable);

    Iterable<FeedDocument> findAllById(List<Long> feedIds);
}