package com.ssafy.handam.plan.application.service;

import com.ssafy.handam.plan.application.dto.TotalPlansServiceRequest;
import com.ssafy.handam.plan.domain.entity.Plan;
import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.domain.service.PlanService;
import com.ssafy.handam.plan.presentation.jwt.JwtUtil;
import com.ssafy.handam.plan.presentation.response.plan.PlanResponse;
import com.ssafy.handam.plan.presentation.response.totalplan.TotalPlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanApplicationService {

    private final PlanService planService;
    private final JwtUtil jwtUtil;

    public void createPlan(TotalPlansServiceRequest totalPlansServiceRequest) {
        planService.createPlan(totalPlansServiceRequest.toTotalPlansData());
    }
    public List<TotalPlanResponse> getTotalPlans(String token) {
        Long userId = jwtUtil.extractUserId(token);
        List<TotalPlan> totalPlans = planService.getTotalPlans(userId);
        return totalPlans.stream()
                .map(totalPlan -> {
                    Plan firstPlan = getFirstPlan(totalPlan);
                    String imageUrl = extractImage(totalPlan);
                    String address = extractAddress(firstPlan);
                    return TotalPlanResponse.of(totalPlan, address, imageUrl);
                })
                .collect(Collectors.toList());
    }
    public List<PlanResponse> getAllPlans(Long totalPlanId){
        List<Long> dayPlanIds = planService.getDayPlanIdsByTotalPlanId(totalPlanId);

        List<Plan> plans = dayPlanIds.stream()
                .flatMap(dayPlanId -> planService.getPlansByDayPlanId(dayPlanId).stream())
                .collect(Collectors.toList());

        return plans.stream()
                .map(plan -> {
                    String address = (plan.getAddress1() != null) ? plan.getAddress1() : plan.getAddress2();
                    return PlanResponse.of(plan, address);
                })
                .collect(Collectors.toList());
    }
    private Plan getFirstPlan(TotalPlan totalPlan) { //첫번째 플랜 반환
        return totalPlan.getDayPlans().stream()
                .flatMap(dayPlan -> dayPlan.getPlans().stream())
                .findFirst()
                .orElse(null);
    }
    private String extractImage(TotalPlan totalPlan) {
        return totalPlan.getDayPlans().stream()
                .flatMap(dayPlan -> dayPlan.getPlans().stream())
                .map(Plan::getImageUrl)
                .filter(Objects::nonNull)
                .findFirst()
                .orElse("http://example.com/default.jpg");
    }

    private String extractAddress(Plan plan) {
        String address = plan.getAddress1() != null ? plan.getAddress1() : plan.getAddress2();
        if (address != null) {
            String[] addressParts = address.split(" ");
            return addressParts[0] + " " + addressParts[1];
        }
        return null;
    }

}
