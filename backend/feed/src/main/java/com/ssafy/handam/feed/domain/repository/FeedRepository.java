package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface FeedRepository {
    Optional<Feed> findById(Long id);

    Feed save(Feed feed);

    List<Feed> findByUserId(Long userId, Pageable pageable);
}
