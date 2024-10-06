package com.ssafy.handam.plan.application.service;

import com.ssafy.handam.plan.application.dto.TotalPlansServiceRequest;
import com.ssafy.handam.plan.domain.entity.Plan;
import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.domain.service.PlanService;
import com.ssafy.handam.plan.presentation.jwt.JwtUtil;
import com.ssafy.handam.plan.presentation.request.totalplan.TotalPlansRequest;
import com.ssafy.handam.plan.presentation.response.dayplan.DayPlanResponse;
import com.ssafy.handam.plan.presentation.response.plan.PlanResponse;
import com.ssafy.handam.plan.presentation.response.totalplan.TotalPlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanApplicationService {

    private final PlanService planService;
    private final JwtUtil jwtUtil;

    public void createPlan(TotalPlansRequest totalPlansRequest, String token) {
        Long userId = jwtUtil.extractUserId(token);
        TotalPlansServiceRequest totalPlansServiceRequest = totalPlansRequest.toTotalPlansServiceRequest(userId);
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
    public TotalPlanResponse getTotalPlan(Long totalPlanId) {

        TotalPlan totalPlan = planService.getTotalPlan(totalPlanId);
        Plan firstPlan = getFirstPlan(totalPlan);
        String imageUrl = extractImage(totalPlan);
        String address = extractAddress(firstPlan);
        return TotalPlanResponse.of(totalPlan, address, imageUrl);
    }
    public List<DayPlanResponse> getAllPlans(Long totalPlanId) {
        List<Long> dayPlanIds = planService.getDayPlanIdsByTotalPlanId(totalPlanId);

        Map<Long, List<PlanResponse>> groupedByDay = dayPlanIds.stream()
                .flatMap(dayPlanId -> planService.getPlansByDayPlanId(dayPlanId).stream())
                .map(plan -> {
                    String address = (plan.getAddress1() != null) ? plan.getAddress1() : plan.getAddress2();
                    return PlanResponse.of(plan, address);
                })
                .collect(Collectors.groupingBy(PlanResponse::day));

        return groupedByDay.keySet().stream()
                .map(day -> new DayPlanResponse(day, groupedByDay.get(day)))
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
