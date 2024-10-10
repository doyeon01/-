package com.ssafy.handam.feed.domain.service;


import static com.ssafy.handam.feed.domain.entity.QLike.like;

import co.elastic.clients.elasticsearch.core.GetRequest;
import co.elastic.clients.elasticsearch.core.GetResponse;
import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import com.ssafy.handam.feed.domain.repository.LikeRepository;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedDomainService {

    private final FeedRepository feedRepository;
    private final LikeRepository likeRepository;
    private final RedisTemplate<String, Object> redisTemplate;


    public Feed findById(Long id) {
        return findBy(id);
    }

    public int likeFeed(Long feedId, Long userId) {
        Feed feed = findBy(feedId);
        feed.incrementLikeCount();
        feedRepository.save(feed);
        Like like = Like.builder().feed(feed).userId(userId).build();
        likeRepository.save(like);
        return feed.getLikeCount();
    }

    public int unlikeFeed(Long feedId, Long userId) {
        Feed feed = findBy(feedId);
        feed.decrementLikeCount();
        feedRepository.save(feed);
        List<Like> like = likeRepository.findByFeedIdAndUserId(feedId, userId);
        if(like.isEmpty()){
            throw new IllegalArgumentException("Like not found");
        }
        likeRepository.delete(like.get(0));
        return feed.getLikeCount();
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
        Page<Like> likes = likeRepository.findByUserId(userId, pageable);
        if (likes == null || likes.isEmpty()) {
            return List.of();
        }

        List<Long> feedIds = likes.stream()
                .map(like -> like.getFeed().getId())
                .toList();

        return feedRepository.findByIdIn(feedIds);
    }


    public Page<Feed> getCreatedFeedsByUser(Long userId, Pageable pageable) {
        return feedRepository.findByUserId(userId, pageable);
    }

    public boolean isLikedFeed(Long feedId, Long userId) {
        return !likeRepository.findByFeedIdAndUserId(feedId, userId).isEmpty();
    }

    public Feed createFeed(FeedCreationServiceRequest request, String savedImagePath, UserDto userDto) {
        return feedRepository.save(Feed.builder()
                .placeName(request.placeName())
                .totalPlanId(request.totalPlanId())
                .title(request.title())
                .content(request.content())
                .imageUrl(savedImagePath)
                .address1(request.address1())
                .address2(request.address2())
                .longitude(request.longitude())
                .latitude(request.latitude())
                .placeType(request.placeType())
                .userId(request.userId())
                .build(),userDto);
    }

    public Page<FeedDocument> searchFeedsByKeywordSortedByLikeCount(String keyword, Pageable pageable) {
        return feedRepository.searchFeedsByKeywordSortedByLikeCount(keyword, pageable);
    }

    public Page<FeedDocument> getNearbyClusterCenter(
            Double latitude,
            Double longitude,
            String distance,
            Pageable pageable) {
        GeoPoint geoPoint = new GeoPoint(latitude, longitude);
        return feedRepository.getNearbyClusterCenter(geoPoint, distance, pageable);
    }


    //이상민 작업
    public RecommendedFeedsForUserResponse getRecommendedFeeds(
            List<Long> recommendedFeedIds,
            List<Long> topLikedFeedIds,
            List<Long> trendingFeedIds,
            List<Long> randomFeedIds,
            int page,
            int pageSize,
            Long userId) {

        // 카테고리별로 가져올 비율
        double recommendedRatio = 0.6;
        double topLikedRatio = 0.2;
        double trendingRatio = 0.1;
        double randomRatio = 0.1;

        // 카테고리별로 가져올 개수 결정 (총 페이지 기준)
        int numRecommended = (int) (pageSize * recommendedRatio);
        int numTopLiked = (int) (pageSize * topLikedRatio);
        int numTrending = (int) (pageSize * trendingRatio);
        int numRandom = (int) (pageSize * randomRatio);


        int offset = page * pageSize;

        List<FeedPreviewDto> resultFeeds = new ArrayList<>();
        Set<Long> selectedFeedIds = new HashSet<>(); // 중복 체크를 위한 Set

        // 추천 피드에 대해 페이지 네이션 적용 후 중복 제거하여 resultFeeds에 추가
        List<FeedPreviewDto> recommendedFeeds = getPaginatedFeedsFromElasticsearch(recommendedFeedIds, numRecommended, offset,userId);
        addUniqueFeeds(resultFeeds, recommendedFeeds, selectedFeedIds);

        // TopLiked 피드에 대해 페이지 네이션 적용 후 중복 제거하여 resultFeeds에 추가
        List<FeedPreviewDto> topLikedFeeds = getPaginatedFeedsWithUnique(resultFeeds, topLikedFeedIds, numTopLiked, offset, selectedFeedIds,userId);
        addUniqueFeeds(resultFeeds, topLikedFeeds, selectedFeedIds);

        // 트렌딩 피드에 대해 페이지 네이션 적용 후 중복 제거하여 resultFeeds에 추가
        List<FeedPreviewDto> trendingFeeds = getPaginatedFeedsWithUnique(resultFeeds, trendingFeedIds, numTrending, offset, selectedFeedIds,userId);
        addUniqueFeeds(resultFeeds, trendingFeeds, selectedFeedIds);

        // 랜덤 피드에 대해 페이지 네이션 적용 후 중복 제거하여 resultFeeds에 추가
        List<FeedPreviewDto> randomFeeds = getPaginatedFeedsWithUnique(resultFeeds, randomFeedIds, numRandom, offset, selectedFeedIds,userId);
        addUniqueFeeds(resultFeeds, randomFeeds, selectedFeedIds);

        int remaining = pageSize - resultFeeds.size();
        if (remaining > 0) {
            // 랜덤 피드에서 부족한 수만큼 추가로 가져옴
            List<FeedPreviewDto> additionalFeeds = getPaginatedFeedsFromElasticsearch(randomFeedIds, remaining, offset + resultFeeds.size(), userId);
            resultFeeds.addAll(additionalFeeds);
        }

        // 페이지네이션 정보를 포함한 결과 반환
        boolean hasNextPage = resultFeeds.size() == pageSize;

        return RecommendedFeedsForUserResponse.of(resultFeeds, page, hasNextPage);
    }

    // 중복되지 않는 피드를 추가하는 메서드
    private void addUniqueFeeds(List<FeedPreviewDto> resultFeeds, List<FeedPreviewDto> newFeeds, Set<Long> selectedFeedIds) {
        for (FeedPreviewDto feed : newFeeds) {
            if (!selectedFeedIds.contains(feed.id())) { // 중복 검사
                resultFeeds.add(feed);
                selectedFeedIds.add(feed.id()); // 추가된 피드의 ID 추적
            }
        }
    }

    // 중복된 피드가 있을 경우 다음 offset으로 추가 조회하는 메서드
    private List<FeedPreviewDto> getPaginatedFeedsWithUnique(List<FeedPreviewDto> resultFeeds, List<Long> feedIds, int count, int offset, Set<Long> selectedFeedIds,Long userId) {
        List<FeedPreviewDto> feeds = new ArrayList<>();

        while (feeds.size() < count && offset < feedIds.size()) {
            List<FeedPreviewDto> paginatedFeeds = getPaginatedFeedsFromElasticsearch(feedIds, count - feeds.size(), offset,userId);

            for (FeedPreviewDto feed : paginatedFeeds) {
                if (!selectedFeedIds.contains(feed.id())) { // 중복 검사
                    feeds.add(feed);
                    selectedFeedIds.add(feed.id()); // 중복 방지
                }
            }

            offset += paginatedFeeds.size(); // 다음 offset 적용
        }

        return feeds;
    }

    private List<FeedPreviewDto> getPaginatedFeedsFromElasticsearch(List<Long> feedIds, int count, int offset,Long userId) {
        List<FeedPreviewDto> feeds = new ArrayList<>();

        if (feedIds == null || feedIds.isEmpty()) {
            return feeds;
        }

        // 페이지네이션을 위해 feedIds를 슬라이스
        int toIndex = Math.min(offset + count, feedIds.size());
        if (offset < feedIds.size()) {
            List<Long> paginatedFeedIds = feedIds.subList(offset, toIndex);

            // Elasticsearch에서 feedId에 해당하는 FeedDocument 조회
            Iterable<FeedDocument> feedDocuments = feedRepository.findAllById(paginatedFeedIds);

            // FeedDocument를 FeedPreviewDto로 변환
            for (FeedDocument feedDocument : feedDocuments) {
                feeds.add(FeedPreviewDto.fromDocument(feedDocument, isLikedFeed(feedDocument.getId(),userId)));
            }
        }

        return feeds;
    }

    public Page<Like> getLikesBy(Long userId, Pageable pageable) {
        return likeRepository.findByUserId(userId, pageable);
    }

    public List<Feed> getFeedByIds(List<Long> feedIds) {
        return feedRepository.findByIdIn(feedIds);
    }

    public List<Feed> getFeedsByTotalPlanId(Long totalPlanId) { return feedRepository.findByTotalPlanId(totalPlanId); }

    public FeedDocument getFeedDocumentById(Long feedId) {
        return feedRepository.findFeedDocumentById(feedId).orElseThrow(() -> new IllegalArgumentException("Feed not found"));
    }
}