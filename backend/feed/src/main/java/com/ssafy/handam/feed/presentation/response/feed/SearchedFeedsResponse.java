package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record SearchedFeedsResponse(List<FeedPreviewDto> feeds, int currentPageNumber, boolean hasNext) {

    public static SearchedFeedsResponse of(List<FeedPreviewDto> feeds, int currentPageNumber, boolean hasNext) {
        return new SearchedFeedsResponse(feeds, currentPageNumber, hasNext);
    }
}
