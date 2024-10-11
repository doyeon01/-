package com.ssafy.handam.plan.presentation.response.dayplan;

import com.ssafy.handam.plan.presentation.response.plan.PlanResponse;

import java.util.List;

public record DayPlanResponse(
        Long day,
        List<PlanResponse> plans
) {
}
