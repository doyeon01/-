package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import java.util.Optional;

public interface FeedRepository {
        Optional<Feed> findById(Long id);
        Feed save(Feed feed);
        Like save(Like like);
}
