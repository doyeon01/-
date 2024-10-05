package com.ssafy.handam.plan.presentation.response.totalplan;

import com.ssafy.handam.plan.domain.entity.TotalPlan;

import java.time.LocalDate;

public record TotalPlanResponse(
        Long id,
        LocalDate startDate,
        LocalDate endDate,
        String title,
        String address,
        String thumbNailImageUrl
) {
    public static TotalPlanResponse of(TotalPlan totalPlan, String address, String thumbNailImageUrl) {
        return new TotalPlanResponse(
                totalPlan.getId(),
                totalPlan.getStartDate(),
                totalPlan.getEndDate(),
                totalPlan.getTitle(),
                address,
                thumbNailImageUrl
        );
    }
}
