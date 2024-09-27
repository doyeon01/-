package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record CreatedFeedsByUserResponse(List<FeedPreviewDto> feeds) {

    public static CreatedFeedsByUserResponse of(List<FeedPreviewDto> feeds) {
        return new CreatedFeedsByUserResponse(feeds);
    }
}
