package com.ssafy.handam.feed.infrastructure.jpa;

import com.ssafy.handam.feed.domain.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedJpaRepository extends JpaRepository<Feed, Long> {
}
