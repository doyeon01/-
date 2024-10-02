package com.ssafy.handam.plan.application.dto;

import com.ssafy.handam.plan.domain.PlaceType;
import com.ssafy.handam.plan.domain.valueobject.PlanData;
import lombok.Builder;

@Builder
public record PlanServiceRequest(
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
){
    public PlanData toPlanData() {
        return PlanData.builder()
                .userId(this.userId)
                .title(this.title)
                .content(this.content)
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
