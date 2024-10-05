package com.ssafy.handam.plan.presentation.response.plan;

import com.ssafy.handam.plan.domain.entity.Plan;


public record PlanResponse(
        Long id,
        Long day,
        String placeName,
        String imageUrl,
        String address,
        String placeType,
        String details
) {
    public static PlanResponse of(Plan plan,String address) {

        return new PlanResponse(
                plan.getId(),
                plan.getDayPlan().getDay(),
                plan.getPlaceName(),
                plan.getImageUrl(),
                address,
                plan.getPlaceType(),
                plan.getDetails()
        );
    }
}
