package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record LikedFeedsByUserResponse(List<FeedPreviewDto> feeds, int currentPageNumber, boolean hasNext) {

    public static LikedFeedsByUserResponse of(List<FeedPreviewDto> feeds, int currentPageNumber, boolean hasNext) {
        return new LikedFeedsByUserResponse(feeds, currentPageNumber, hasNext);
    }
}
