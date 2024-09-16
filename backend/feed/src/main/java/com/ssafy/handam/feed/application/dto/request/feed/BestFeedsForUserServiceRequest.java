package com.ssafy.handam.feed.application.dto.request.feed;

public record BestFeedsForUserServiceRequest(Long userId, int page, int size) {

    public static BestFeedsForUserServiceRequest of(long userId, int page, int size) {
        return new BestFeedsForUserServiceRequest(userId, page, size);
    }
}
