package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FeedRepository {
    Optional<Feed> findById(Long id);

    Feed save(Feed feed);

    List<Feed> findByUserId(Long userId, Pageable pageable);

    Page<FeedDocument> searchFeedsByKeywordSortedByLikeCount(String keyword, Pageable pageable);
}
