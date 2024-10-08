package com.ssafy.handam.photocard.infrastructure.client.dto;

import java.util.List;

public record FeedListDto(List<String> feedImageUrls) {

    public static FeedListDto of(List<String> feedImageUrls) {
        return new FeedListDto(feedImageUrls);
    }
}
