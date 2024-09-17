package com.ssafy.handam.feed.application.dto.request.feed;

public record RecommendedFeedsForUserServiceRequest(Long userId, int page, int size) {

    public static RecommendedFeedsForUserServiceRequest of(long userId, int page, int size) {
        return new RecommendedFeedsForUserServiceRequest(userId, page, size);
    }
}
