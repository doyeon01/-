package com.ssafy.handam.plan.application.dto;

import com.ssafy.handam.plan.domain.valueobject.TotalPlanData;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
@Builder
public record TotalPlansServiceRequest(
        Long userId,
        String title,
        LocalDate startDate,
        LocalDate endDate,
        List<DayPlansServiceRequest> dayPlansServiceRequests
) {
    public TotalPlanData toTotalPlansData() {
        return TotalPlanData.builder()
                .userId(this.userId)
                .title(this.title)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .dayPlanData(this.dayPlansServiceRequests.stream()
                        .map(DayPlansServiceRequest::toDayPlansData)
                        .collect(Collectors.toList()))
                .build();
    }
}
