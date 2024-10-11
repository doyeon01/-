package com.ssafy.handam.plan.domain.valueobject;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record TotalPlanData(
        Long userId,
        String title,
        LocalDate startDate,
        LocalDate endDate,
        List<DayPlanData> dayPlanData
) {
}
