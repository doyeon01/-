package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record FeedsByFiltersResponse(List<FeedPreviewDto> feeds) {

    public static FeedsByFiltersResponse of(List<FeedPreviewDto> feeds) {
        return new FeedsByFiltersResponse(feeds);
    }
}
