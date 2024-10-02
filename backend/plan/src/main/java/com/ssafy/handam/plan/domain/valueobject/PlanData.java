package com.ssafy.handam.plan.domain.valueobject;

import com.ssafy.handam.plan.domain.PlaceType;
import lombok.Builder;

@Builder
public record PlanData(
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
}
