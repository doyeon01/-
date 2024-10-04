package com.ssafy.handam.plan.application.service;

import com.ssafy.handam.plan.application.dto.TotalPlansServiceRequest;
import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.domain.service.PlanService;
import com.ssafy.handam.plan.presentation.jwt.JwtUtil;
import com.ssafy.handam.plan.presentation.response.totalplan.TotalPlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanApplicationService {

    private final PlanService planService;
    private final JwtUtil jwtUtil;

    public void createPlan(TotalPlansServiceRequest totalPlansServiceRequest) {
        planService.createPlan(totalPlansServiceRequest.toTotalPlansData());
    }
    public List<TotalPlanResponse> getTotalPlans (String token){
        Long userId = jwtUtil.extractUserId(token);
        List<TotalPlan> totalPlans = planService.getTotalPlans(userId);
        return totalPlans.stream()
                .map(TotalPlanResponse::of)
                .collect(Collectors.toList());
    }
}
