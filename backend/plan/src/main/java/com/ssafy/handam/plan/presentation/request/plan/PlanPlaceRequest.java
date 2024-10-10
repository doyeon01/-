package com.ssafy.handam.plan.presentation.request.plan;

import com.ssafy.handam.plan.application.dto.PlanServiceRequest;
import com.ssafy.handam.plan.infrastructure.PlaceTypeMapper;
import lombok.Builder;

@Builder
public record PlanPlaceRequest(
        String placeName,
        String roadAddressName,
        String addressName,
        String placeType,
        Double x,
        Double y,
        String details
) implements PlanRequest {
    @Override
    public PlanServiceRequest toPlanServiceRequest() {
        return PlanServiceRequest.builder()
                .placeName(this.placeName)
                .imageUrl(null)
                .address1(this.roadAddressName)
                .address2(this.addressName)
                .longitude(this.x)
                .latitude(this.y)
                .placeType(PlaceTypeMapper.mapToPlaceType(this.placeType))
                .details(this.details)
                .build();
    }

}

