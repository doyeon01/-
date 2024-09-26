package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Like;
import com.ssafy.handam.feed.infrastructure.jpa.LikeJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class LikeRepositoryImpl implements LikeRepository {

    private final LikeJpaRepository likeJpaRepository;

    @Override
    public void save(Like like) {
        likeJpaRepository.save(like);
    }

    @Override
    public void delete(Like like) {
        likeJpaRepository.delete(like);
    }

    @Override
    public List<Like> findByFeedId(Long id) {
        return likeJpaRepository.findByFeedId(id);
    }

    @Override
    public List<Like> findByUserId(Long id) {
        return likeJpaRepository.findByUserId(id);
    }

    @Override
    public List<Like> findByFeedIdAndUserId(Long feedId, Long userId) {
        return likeJpaRepository.findByFeedIdAndUserId(feedId, userId);
    }
}
