package com.ssafy.handam.feed.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.BestFeedsForUserServiceRequest;

public record BestFeedsForUserRequest(long userId, int page, int size) {

    public static BestFeedsForUserServiceRequest toServiceRequest(long userId, int page, int size) {
        return new BestFeedsForUserServiceRequest(userId, page, size);
    }
}