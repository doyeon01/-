package com.ssafy.handam.feed.infrastructure.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record RecommendedFeedsForUserResponse(List<FeedPreviewDto> feeds, int currentPage, boolean hasNextPage) {

    public static RecommendedFeedsForUserResponse of(List<FeedPreviewDto> feeds, int currentPage,
                                                     boolean hasNextPage) {
        return new RecommendedFeedsForUserResponse(feeds, currentPage, hasNextPage);
    }
}
