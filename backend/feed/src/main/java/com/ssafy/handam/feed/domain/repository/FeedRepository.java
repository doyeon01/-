package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface FeedRepository {
    Optional<Feed> findById(Long id);

    Feed save(Feed feed);

    Like save(Like like);

    List<Feed> findByUserId(Long userId, Pageable pageable);
}
