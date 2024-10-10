package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import java.util.List;

public record NearbyClusterCenterResponse(List<FeedPreviewDto> feeds, int currentPage, boolean hasNextPage) {

    public static NearbyClusterCenterResponse of(List<FeedPreviewDto> feeds, int currentPage, boolean hasNextPage) {
        return new NearbyClusterCenterResponse(feeds, currentPage, hasNextPage);
    }
}
