package com.ssafy.handam.plan.presentation.response.totalplan;

import com.ssafy.handam.plan.domain.entity.TotalPlan;

public record TotalPlanResponse(
        Long id,
        Long userId,
        String title
) {
    public static TotalPlanResponse of(TotalPlan totalPlan) {
        return new TotalPlanResponse(totalPlan.getId(), totalPlan.getUserId(), totalPlan.getTitle());
    }
}
