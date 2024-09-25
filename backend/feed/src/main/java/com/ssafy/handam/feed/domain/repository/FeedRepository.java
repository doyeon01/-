package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import java.util.List;
import java.util.Optional;

public interface FeedRepository {
        Optional<Feed> findById(Long id);
        Feed save(Feed feed);

}