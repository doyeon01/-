package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record RecommendedFeedsForUserResponse(List<FeedPreviewDto> feeds) {

    public static RecommendedFeedsForUserResponse of(List<FeedPreviewDto> feeds) {
        return new RecommendedFeedsForUserResponse(feeds);
    }
}
