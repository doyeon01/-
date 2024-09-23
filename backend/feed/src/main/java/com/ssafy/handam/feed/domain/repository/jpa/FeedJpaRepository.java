package com.ssafy.handam.feed.domain.repository.jpa;

import com.ssafy.handam.feed.domain.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedJpaRepository extends JpaRepository<Feed, Long> {
}
