package com.ssafy.handam.feed.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.FeedsByTotalPlanIdServiceRequest;

public record FeedsByTotalPlanIdRequest(Long totalPlanId) {

    public static FeedsByTotalPlanIdServiceRequest toService(Long totalPlanId) {
        return new FeedsByTotalPlanIdServiceRequest(totalPlanId);
    }
}
