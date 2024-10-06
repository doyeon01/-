package com.ssafy.handam.feed.application.dto;

public record FeedPreviewWithClusterDto(FeedPreviewDto feed, String clusterId) {
    public static FeedPreviewWithClusterDto of(FeedPreviewDto feed, String clusterId) {
        return new FeedPreviewWithClusterDto(feed, clusterId);
    }
}
