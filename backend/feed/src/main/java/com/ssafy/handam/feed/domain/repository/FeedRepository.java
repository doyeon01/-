package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<Feed, Long> {
}
