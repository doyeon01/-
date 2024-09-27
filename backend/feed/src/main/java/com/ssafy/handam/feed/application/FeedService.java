package com.ssafy.handam.feed.application;

import com.ssafy.handam.feed.application.dto.FeedDetailDto;
import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.UserDetailDto;
import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.FeedsByFiltersServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.service.FeedDomainService;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.presentation.response.feed.CreatedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.LikedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedService {

    private final FeedDomainService feedDomainService;
    private final UserApiClient userApiClient;

    public RecommendedFeedsForUserResponse getRecommendedFeedsForUser(RecommendedFeedsForUserServiceRequest request) {
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(1L, "title", "content", 1L, 0, "address1", "address2",
                32.1323,
                127.123123, "CAFE", "username", "profileImageUrl", true);
        List<FeedPreviewDto> previewDtos = List.of(feedPreviewDto);
        return RecommendedFeedsForUserResponse.of(previewDtos);
    }

    public FeedsByFiltersResponse getFeedsByFilters(FeedsByFiltersServiceRequest request) {
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(1L, "title", "content", 1L, 0, "address", "address2",
                32.1323,
                127.123123, "CAFE", "username", "profileImageUrl", true);
        List<FeedPreviewDto> previewDtos = List.of(feedPreviewDto);
        return FeedsByFiltersResponse.of(previewDtos);
    }

    public FeedDetailResponse getFeedDetails(Long feedId) {
        Feed feed = feedDomainService.findById(feedId);
        UserDetailDto userDetailDto = getUserDetailDto(feed.getUserId());
        return FeedDetailResponse.of(FeedDetailDto.of(feed, isLikedFeed(feed, userDetailDto.id())),
                userDetailDto.name(), userDetailDto.profileImageUrl());
    }

    public FeedResponse createFeed(FeedCreationServiceRequest request) {
        Feed feed = feedDomainService.createFeed(request);
        return FeedResponse.from(feed, userApiClient.getUserById(feed.getUserId()));
    }

    public FeedLikeResponse likeFeed(Long feedId, Long userId) {
        feedDomainService.likeFeed(feedId, userId);
        int size = feedDomainService.countUpLike(feedId).size();
        return FeedLikeResponse.of(feedId, true, size);
    }

    public FeedLikeResponse unlikeFeed(Long feedId, Long userId) {
        feedDomainService.unlikeFeed(feedId, userId);
        return FeedLikeResponse.of(feedId, false, feedDomainService.countDownLike(feedId).size());
    }

    @Transactional(readOnly = true)
    public LikedFeedsByUserResponse getLikedFeedsByUser(Long userId, Pageable pageable) {
        List<FeedPreviewDto> likedFeeds = getFeedPreviewDtoList(feedDomainService.getLikedFeedsByUser(userId, pageable),
                userApiClient.getUserById(userId));
        return LikedFeedsByUserResponse.of(likedFeeds);
    }

    @Transactional(readOnly = true)
    public CreatedFeedsByUserResponse getCreatedFeedsByUser(Long userId, Pageable pageable) {
        List<FeedPreviewDto> createdFeeds = getFeedPreviewDtoList(
                feedDomainService.getCreatedFeedsByUser(userId, pageable),
                userApiClient.getUserById(userId));
        return CreatedFeedsByUserResponse.of(createdFeeds);
    }

    private List<FeedPreviewDto> getFeedPreviewDtoList(List<Feed> feeds, UserDto user) {
        return feeds.stream()
                .map(feed -> FeedPreviewDto.from(feed, user.name(), user.profileImageUrl(),
                        isLikedFeed(feed, user.id())))
                .toList();
    }

    private boolean isLikedFeed(Feed feed, Long userId) {
        return feedDomainService.isLikedFeed(feed.getId(), userId);
    }

    private UserDetailDto getUserDetailDto(Long userId) {
        return UserDetailDto.from(userApiClient.getUserById(userId));
    }
}
