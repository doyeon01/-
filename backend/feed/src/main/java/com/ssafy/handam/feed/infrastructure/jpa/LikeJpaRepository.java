package com.ssafy.handam.feed.infrastructure.jpa;

import com.ssafy.handam.feed.domain.entity.Like;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeJpaRepository extends JpaRepository<Like, Long> {

    List<Like> findByFeedId(Long feedId);
    
    List<Like> findByUserId(Long userId);

    List<Like> findByFeedIdAndUserId(Long feedId, Long userId);
}