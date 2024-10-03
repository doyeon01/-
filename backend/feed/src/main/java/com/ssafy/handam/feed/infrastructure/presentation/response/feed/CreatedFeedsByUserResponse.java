package com.ssafy.handam.feed.infrastructure.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record CreatedFeedsByUserResponse(List<FeedPreviewDto> feeds , int currentPage, boolean hasNextPage) {

    public static CreatedFeedsByUserResponse of(List<FeedPreviewDto> feeds , int currentPage, boolean hasNextPage) {
        return new CreatedFeedsByUserResponse(feeds , currentPage, hasNextPage);
    }
}
