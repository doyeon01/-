package com.ssafy.handam.plan.domain.valueobject;

import lombok.Builder;

@Builder
public record PlanData(
        String placeName,
        String imageUrl,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        PlaceType placeType,
        String details
) {
}
