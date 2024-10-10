package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedImageInfoDto;
import java.util.List;

public record FeedsImageInfoResponse(List<FeedImageInfoDto> feedImageInfo) {

    public static FeedsImageInfoResponse of(List<FeedImageInfoDto> feedImageInfo) {
        return new FeedsImageInfoResponse(feedImageInfo);
    }
}
