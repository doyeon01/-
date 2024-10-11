package com.ssafy.handam.plan.presentation.api;

import com.ssafy.handam.plan.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.plan.application.service.PlanApplicationService;
import com.ssafy.handam.plan.presentation.request.totalplan.TotalPlansRequest;
import com.ssafy.handam.plan.presentation.response.dayplan.DayPlanResponse;
import com.ssafy.handam.plan.presentation.response.plan.PlanResponse;
import com.ssafy.handam.plan.presentation.response.totalplan.TotalPlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ssafy.handam.plan.application.common.ApiUtils.success;

@RestController
@RequestMapping("/api/v1/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanApplicationService planApplicationService;

    @PostMapping("/create")
    public ApiResult<Void> createPlan(@CookieValue(value = "accessToken", required = false) String token, @RequestBody TotalPlansRequest totalPlansRequest) {
        planApplicationService.createPlan(totalPlansRequest,token);
        return success(null);
    }

    @GetMapping("/total")
    public ApiResult<List<TotalPlanResponse>> getTotalPlans(@CookieValue(value = "accessToken", required = false) String token) {
        List<TotalPlanResponse> totalPlanResponses = planApplicationService.getTotalPlans(token);
        return success(totalPlanResponses);
    }

    @GetMapping("/{totalPlanId}")
    public ApiResult<TotalPlanResponse> getTotalPlan(@PathVariable Long totalPlanId) {
        TotalPlanResponse totalPlanResponse = planApplicationService.getTotalPlan(totalPlanId);
        return success(totalPlanResponse);
    }

    @GetMapping("/{totalPlanId}/all")
    public ApiResult<List<DayPlanResponse>> getAllPlans(@PathVariable Long totalPlanId, @CookieValue(value = "accessToken", required = false) String token) {
        List<DayPlanResponse> planResponses = planApplicationService.getAllPlans(totalPlanId);
        return success(planResponses);
    }


}
