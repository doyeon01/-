package com.ssafy.handam.feed.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import org.springframework.data.domain.Pageable;

public record RecommendedFeedsForUserRequest(long userId, Pageable pageable) {

    public static RecommendedFeedsForUserServiceRequest toServiceRequest(RecommendedFeedsForUserRequest request) {
        return new RecommendedFeedsForUserServiceRequest(request.userId(), request.pageable());
    }
}