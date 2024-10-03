package com.ssafy.handam.plan.application.service;

import com.ssafy.handam.plan.application.dto.TotalPlansServiceRequest;
import com.ssafy.handam.plan.domain.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlanApplicationService {

    private final PlanService planService;

    public void createPlan(TotalPlansServiceRequest totalPlansServiceRequest) {
        planService.createPlan(totalPlansServiceRequest.toTotalPlansData());
    }
}
