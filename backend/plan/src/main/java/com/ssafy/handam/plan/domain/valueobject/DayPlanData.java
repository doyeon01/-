package com.ssafy.handam.plan.domain.valueobject;

import lombok.Builder;
import java.util.List;

@Builder
public record DayPlanData(
        String day,
        List<PlanData> plansData
) {
}
