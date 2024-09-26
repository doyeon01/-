package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Like;
import java.util.List;

public interface LikeRepository {
    public Like save(Like like);
    public void delete(Like like);
    public List<Like> findByFeedId(Long id);
    public List<Like> findByUserId(Long id);
}
