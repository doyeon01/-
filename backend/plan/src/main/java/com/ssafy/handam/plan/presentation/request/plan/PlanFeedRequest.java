package com.ssafy.handam.plan.presentation.request.plan;

import com.ssafy.handam.plan.application.dto.PlanServiceRequest;
import lombok.Builder;

@Builder
public record PlanFeedRequest(
        Long userId,
        String placeName,
        String title,
        String content,
        String imageUrl,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        String placeType,
        String details
) implements PlanRequest {
    @Override
    public PlanServiceRequest toPlanServiceRequest() {
        return PlanServiceRequest.builder()
                .placeName(this.placeName)
                .imageUrl(this.imageUrl)
                .address1(this.address1)
                .address2(this.address2)
                .longitude(this.longitude)
                .latitude(this.latitude)
                .placeType(this.placeType)
                .details(this.details)
                .build();
    }

}
