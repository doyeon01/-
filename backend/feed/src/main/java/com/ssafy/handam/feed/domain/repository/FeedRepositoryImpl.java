package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedElasticsearchRepository;
import com.ssafy.handam.feed.infrastructure.jpa.FeedJpaRepository;
import com.ssafy.handam.feed.infrastructure.jpa.LikeJpaRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FeedRepositoryImpl implements FeedRepository {

    private final FeedJpaRepository feedJpaRepository;
    private final LikeJpaRepository likeJpaRepository;
    private final FeedElasticsearchRepository feedElasticsearchRepository;

    @Override
    public Optional<Feed> findById(Long id) {
        return feedJpaRepository.findById(id);
    }

    @Override
    public Feed save(Feed feed) {
        Feed savedFeed = feedJpaRepository.save(feed);
        feedElasticsearchRepository.save(FeedDocument.from(savedFeed));
        return savedFeed;
    }

    @Override
    public List<Feed> findByUserId(Long userId, Pageable pageable) {
        return feedJpaRepository.findByUserId(userId, pageable);
    }
}