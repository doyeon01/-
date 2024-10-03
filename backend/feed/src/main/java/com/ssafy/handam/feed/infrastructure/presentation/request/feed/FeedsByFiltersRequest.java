package com.ssafy.handam.feed.infrastructure.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.FeedsByFiltersServiceRequest;

import java.util.List;

public record FeedsByFiltersRequest(
        String placeType,
        int ageRange,
        String gender,
        Double latitude,     // 위도
        Double longitude,    // 경도
        String keyword,
        List<String> sortBy,
        int page,
        int size
) {

    public static FeedsByFiltersServiceRequest toServiceRequest(FeedsByFiltersRequest request) {
        return new FeedsByFiltersServiceRequest(
                request.placeType(),
                request.ageRange(),
                request.gender(),
                request.latitude(),
                request.longitude(),
                request.keyword(),
                request.sortBy(),
                request.page(),
                request.size());
    }
}
