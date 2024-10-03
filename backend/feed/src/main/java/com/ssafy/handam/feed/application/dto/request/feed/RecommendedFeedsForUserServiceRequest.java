package com.ssafy.handam.feed.application.dto.request.feed;

import org.springframework.data.domain.Pageable;

public record RecommendedFeedsForUserServiceRequest(Long userId, Pageable pageable) {

    public static RecommendedFeedsForUserServiceRequest of(long userId, Pageable pageable) {
        return new RecommendedFeedsForUserServiceRequest(userId, pageable);
    }
}
