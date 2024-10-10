package com.ssafy.handam.feed.application.dto;

public record FeedImageInfoDto(
        Long feedId,
        String feedImageUrl) {

    public static FeedImageInfoDto of(
            Long feedId,
            String feedImageUrl) {

        return new FeedImageInfoDto(
                feedId,
                feedImageUrl);
    }
}
