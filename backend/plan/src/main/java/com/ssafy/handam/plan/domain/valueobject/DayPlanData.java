package com.ssafy.handam.plan.domain.valueobject;

import lombok.Builder;
import java.util.List;

@Builder
public record DayPlanData(
        Long day,
        List<PlanData> plansData
) {
}
