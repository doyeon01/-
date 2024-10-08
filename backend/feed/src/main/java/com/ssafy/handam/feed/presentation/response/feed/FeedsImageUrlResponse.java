package com.ssafy.handam.feed.presentation.response.feed;

import java.util.List;

public record FeedsImageUrlResponse(List<String> feedImageUrls) {

    public static FeedsImageUrlResponse of(List<String> feedImageUrls) {
        return new FeedsImageUrlResponse(feedImageUrls);
    }
}
