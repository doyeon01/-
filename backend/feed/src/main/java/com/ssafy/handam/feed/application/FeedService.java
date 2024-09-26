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
import com.ssafy.handam.feed.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedService {

    private final FeedDomainService feedDomainService;
    private final UserApiClient userApiClient;

    public RecommendedFeedsForUserResponse getRecommendedFeedsForUser(RecommendedFeedsForUserServiceRequest request) {
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(1L, "title", "content", 1L, 0, "address", 32.1323,
                127.123123, "username", "profileImageUrl");
        List<FeedPreviewDto> previewDtos = List.of(feedPreviewDto);
        return RecommendedFeedsForUserResponse.of(previewDtos);
    }

    public FeedsByFiltersResponse getFeedsByFilters(FeedsByFiltersServiceRequest request) {
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(1L, "title", "content", 1L, 0, "address", 32.1323,
                127.123123, "username", "profileImageUrl");
        List<FeedPreviewDto> previewDtos = List.of(feedPreviewDto);
        return FeedsByFiltersResponse.of(previewDtos);
    }

    public FeedDetailResponse getFeedDetails(Long feedId) {
        Feed feed = feedDomainService.findById(feedId);
        UserDetailDto userDetailDto = UserDetailDto.from(userApiClient.getUserById(feed.getUserId()));
        return FeedDetailResponse.of(FeedDetailDto.of(feed), userDetailDto.name(), userDetailDto.profileImageUrl());
    }

    public FeedResponse createFeed(FeedCreationServiceRequest request) {

        return new FeedResponse(
                1L,
                1L,
                "testUser",
                "http://example.com/profile.jpg",
                "Test Title",
                "Test Content",
                "http://example.com/feed.jpg",
                "Test Address",
                127.123123,
                32.1323,
                "CAFE",
                0
        );
    }

    public FeedLikeResponse likeFeed(Long feedId, Long userId) {
        feedDomainService.likeFeed(feedId, userId);
        int size = feedDomainService.countUpLike(feedId).size();
        return FeedLikeResponse.of(feedId, true, size);
    }

    public FeedLikeResponse unlikeFeed(Long feedId, Long userId) {
        feedDomainService.unlikeFeed(feedId, userId);
        int size = feedDomainService.countDownLike(feedId).size();
        return FeedLikeResponse.of(feedId, false, size);
    }
}
