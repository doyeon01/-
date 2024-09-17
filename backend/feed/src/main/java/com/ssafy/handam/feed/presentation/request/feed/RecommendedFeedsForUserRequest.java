package com.ssafy.handam.feed.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;

public record RecommendedFeedsForUserRequest(long userId, int page, int size) {

    public static RecommendedFeedsForUserServiceRequest toServiceRequest(long userId, int page, int size) {
        return new RecommendedFeedsForUserServiceRequest(userId, page, size);
    }
}