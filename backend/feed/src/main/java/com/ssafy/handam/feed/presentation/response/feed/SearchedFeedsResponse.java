package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record SearchedFeedsResponse(List<FeedPreviewDto> feeds) {

    public static SearchedFeedsResponse of(List<FeedPreviewDto> feeds) {
        return new SearchedFeedsResponse(feeds);
    }
}
