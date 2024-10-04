package com.ssafy.handam.plan.presentation.request.dayplan;

import com.ssafy.handam.plan.application.dto.DayPlansServiceRequest;
import com.ssafy.handam.plan.presentation.request.plan.PlanRequest;
import lombok.Builder;

import java.util.List;
import java.util.stream.Collectors;

@Builder
public record DayPlanRequest(
        String day,
        List<PlanRequest> plans
) {
    public DayPlansServiceRequest toDayPlansServiceRequest() {
        return DayPlansServiceRequest.builder()
                .day(this.day)
                .planServiceRequests(this.plans.stream()
                        .map(PlanRequest::toPlanServiceRequest)
                        .collect(Collectors.toList()))
                .build();
    }
}