package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record RecommendedFeedsForUserResponse(List<FeedPreviewDto> feeds, int currentPageNumber, boolean hasNext) {

    public static RecommendedFeedsForUserResponse of(List<FeedPreviewDto> feeds, int currentPageNumber,
                                                     boolean hasNext) {
        return new RecommendedFeedsForUserResponse(feeds, currentPageNumber, hasNext);
    }
}
