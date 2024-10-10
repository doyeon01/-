package com.ssafy.handam.feed.infrastructure.jpa;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import jakarta.persistence.LockModeType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

public interface LikeJpaRepository extends JpaRepository<Like, Long> {

//    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Like save(Like like);



    List<Like> findByFeedId(Long feedId);

    Page<Like> findByUserId(Long userId, Pageable pageable);

    List<Like> findByFeedIdAndUserId(Long feedId, Long userId);
}