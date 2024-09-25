package com.ssafy.handam.feed.application;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.FeedsByFiltersServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.service.FeedDomainService;
import com.ssafy.handam.feed.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedService {

    FeedDomainService feedDomainService;

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
        return FeedDetailResponse.of(
                1L,
                1L,
                "testUser",
                "http://example.com/profile.jpg",
                "http://example.com/feed.jpg",
                "Test Title",
                "Test Content",
                127.123123,
                32.1323,
                PlaceType.CAFE,
                0
        );
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
        return new FeedLikeResponse(1L, 1L, true);
    }
}
