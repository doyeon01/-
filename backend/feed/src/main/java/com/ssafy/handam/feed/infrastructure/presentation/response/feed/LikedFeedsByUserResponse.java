package com.ssafy.handam.feed.infrastructure.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record LikedFeedsByUserResponse(List<FeedPreviewDto> feeds, int currentPage, boolean hasNextPage) {

    public static LikedFeedsByUserResponse of(List<FeedPreviewDto> feeds, int currentPage, boolean hasNextPage) {
        return new LikedFeedsByUserResponse(feeds, currentPage, hasNextPage);
    }
}
