package com.ssafy.handam.plan.domain.valueobject;

import lombok.Builder;
import java.util.List;

@Builder
public record TotalPlanData(
        Long userId,
        String title,
        List<DayPlanData> dayPlanData
) {
}
