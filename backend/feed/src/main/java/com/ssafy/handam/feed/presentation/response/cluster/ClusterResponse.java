package com.ssafy.handam.feed.presentation.response.cluster;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record ClusterResponse(
        String clusterId,
        double latitude,
        double longitude,
        List<FeedPreviewDto> feeds
) {
    public static ClusterResponse of(String clusterId, double latitude, double longitude, List<FeedPreviewDto> feeds) {
        return new ClusterResponse(clusterId, latitude, longitude, feeds);
    }
}