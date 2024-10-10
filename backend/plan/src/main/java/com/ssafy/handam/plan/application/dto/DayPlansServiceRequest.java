package com.ssafy.handam.plan.application.dto;

import com.ssafy.handam.plan.domain.valueobject.DayPlanData;
import lombok.Builder;
import java.util.List;
import java.util.stream.Collectors;

@Builder
public record DayPlansServiceRequest(
        Long day,
        List<PlanServiceRequest> planServiceRequests
) {
    public DayPlanData toDayPlansData() {
        return DayPlanData.builder()
                .day(this.day)
                .plansData(this.planServiceRequests.stream()
                        .map(PlanServiceRequest::toPlanData)
                        .collect(Collectors.toList()))
                .build();
    }
}
