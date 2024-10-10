package com.ssafy.handam.feed.application.dto.request.feed;

public record FeedsByTotalPlanIdServiceRequest(Long totalPlanId) {

    public static FeedsByTotalPlanIdServiceRequest of(Long totalPlanId) {
        return new FeedsByTotalPlanIdServiceRequest(totalPlanId);
    }
}
