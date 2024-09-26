package com.ssafy.handam.feed.domain.service;


import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import com.ssafy.handam.feed.domain.repository.LikeRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedDomainService {

    private final FeedRepository feedRepository;
    private final LikeRepository likeRepository;

    public Feed findById(Long id) {
        return findBy(id);
    }

    public Feed saveFeed(Feed feed) {
        return feedRepository.save(feed);
    }

    public Like likeFeed(Long feedId, Long userId) {
        Feed feed = findBy(feedId);
        feed.incrementLikeCount();
        feedRepository.save(feed);
        Like like = Like.builder().feed(feed).userId(userId).build();
        likeRepository.save(like);
        return like;
    }

    private Feed findBy(Long feedId) {
        return feedRepository.findById(feedId).orElseThrow(() -> new IllegalArgumentException("Feed not found"));
    }

    public List<Like> countUpLike(Long feedId) {
        return likeRepository.findByFeedId(feedId);
    }
}