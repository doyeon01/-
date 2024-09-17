package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record BestFeedsForUserResponse(List<FeedPreviewDto> feedsBest) {

    public static BestFeedsForUserResponse of(List<FeedPreviewDto> feedsBest) {
        return new BestFeedsForUserResponse(feedsBest);
    }
}
