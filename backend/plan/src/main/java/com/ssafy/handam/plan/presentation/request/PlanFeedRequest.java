package com.ssafy.handam.plan.presentation.request;

import com.ssafy.handam.plan.application.dto.PlanServiceRequest;
import com.ssafy.handam.plan.domain.PlaceType;
import lombok.Builder;

@Builder
public record PlanFeedRequest(
        Long userId,
        String title,
        String content,
        String imageUrl,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        PlaceType placeType,
        String details
) {
    public PlanServiceRequest toPlanServiceRequest(PlanFeedRequest planFeedRequest) {
        return PlanServiceRequest.builder()
                .userId(planFeedRequest.userId)
                .title(planFeedRequest.title)
                .content(planFeedRequest.content)
                .imageUrl(planFeedRequest.imageUrl)
                .address1(planFeedRequest.address1)
                .address2(planFeedRequest.address2)
                .longitude(planFeedRequest.longitude)
                .latitude(planFeedRequest.latitude)
                .placeType(planFeedRequest.placeType)
                .details(planFeedRequest.details)
                .build();
    }
}
