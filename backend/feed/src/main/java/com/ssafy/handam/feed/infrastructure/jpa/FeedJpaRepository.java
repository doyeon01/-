package com.ssafy.handam.feed.infrastructure.jpa;

import com.ssafy.handam.feed.domain.entity.Feed;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedJpaRepository extends JpaRepository<Feed, Long> {
    List<Feed> findByUserId(Long userId, Pageable pageable);
}
