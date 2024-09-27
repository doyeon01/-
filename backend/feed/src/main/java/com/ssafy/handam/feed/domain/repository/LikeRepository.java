package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Like;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface LikeRepository {

    void save(Like like);

    void delete(Like like);

    List<Like> findByFeedId(Long id);

    List<Like> findByUserId(Long id, Pageable pageable);

    List<Like> findByFeedIdAndUserId(Long feedId, Long userId);
}
