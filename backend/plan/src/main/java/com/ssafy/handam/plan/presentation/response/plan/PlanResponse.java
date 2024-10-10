package com.ssafy.handam.plan.presentation.response.plan;

import com.ssafy.handam.plan.domain.entity.Plan;
import com.ssafy.handam.plan.domain.valueobject.PlaceType;


public record PlanResponse(
        Long id,
        Long day,
        String placeName,
        String imageUrl,
        String address,
        PlaceType placeType,
        String details,
        Double longitude,
        Double latitude
) {
    public static PlanResponse of(Plan plan,String address) {

        return new PlanResponse(
                plan.getId(),
                plan.getDayPlan().getDay(),
                plan.getPlaceName(),
                plan.getImageUrl(),
                address,
                plan.getPlaceType(),
                plan.getDetails(),
                plan.getLongitude(),
                plan.getLatitude()
        );
    }
}
