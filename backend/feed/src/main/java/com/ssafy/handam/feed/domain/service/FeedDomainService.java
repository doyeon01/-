package com.ssafy.handam.feed.domain.service;


import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import com.ssafy.handam.feed.domain.repository.LikeRepository;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public void likeFeed(Long feedId, Long userId) {
        Feed feed = findBy(feedId);
        feed.incrementLikeCount();
        feedRepository.save(feed);
        Like like = Like.builder().feed(feed).userId(userId).build();
        likeRepository.save(like);
    }

    public void unlikeFeed(Long feedId, Long userId) {
        Feed feed = findBy(feedId);
        feed.decrementLikeCount();
        feedRepository.save(feed);
        Like like = likeRepository.findByFeedIdAndUserId(feedId, userId).get(0);
        likeRepository.delete(like);
    }

    
    private Feed findBy(Long feedId) {
        return feedRepository.findById(feedId).orElseThrow(() -> new IllegalArgumentException("Feed not found"));
    }

    public List<Like> countUpLike(Long feedId) {
        return likeRepository.findByFeedId(feedId);
    }

    public List<Like> countDownLike(Long feedId) {
        return likeRepository.findByFeedId(feedId);
    }

    public List<Feed> getLikedFeedsByUser(Long userId, Pageable pageable) {
        List<Like> likes = likeRepository.findByUserId(userId, pageable);
        if (likes == null || likes.isEmpty()) {
            return Collections.emptyList();
        }
        return likes.stream()
                .map(Like::getFeed)
                .toList();
    }


    public List<Feed> getCreatedFeedsByUser(Long userId, Pageable pageable) {
        return feedRepository.findByUserId(userId, pageable);
    }

    public boolean isLikedFeed(Long feedId, Long userId) {
        return !likeRepository.findByFeedIdAndUserId(feedId, userId).isEmpty();
    }

    public Feed createFeed(FeedCreationServiceRequest request) {
        return feedRepository.save(Feed.builder()
                .title(request.title())
                .content(request.content())
                .imageUrl(request.feedImageUrl())
                .address1(request.address1())
                .address2(request.address2())
                .longitude(request.longitude())
                .latitude(request.latitude())
                .placeType(request.placeType())
                .userId(request.userId())
                .build());
    }

    public Page<FeedDocument> searchFeedsByKeywordSortedByLikeCount(String keyword, Pageable pageable) {
        return feedRepository.searchFeedsByKeywordSortedByLikeCount(keyword, pageable);
    }
}