package com.ssafy.handam.plan.presentation.api;

import com.ssafy.handam.plan.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.plan.application.service.PlanApplicationService;
import com.ssafy.handam.plan.domain.entity.TotalPlan;
import com.ssafy.handam.plan.presentation.request.totalplan.TotalPlansRequest;
import com.ssafy.handam.plan.presentation.response.PlanResponse;
import com.ssafy.handam.plan.presentation.response.totalplan.TotalPlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.handam.plan.application.common.ApiUtils.success;

@RestController
@RequestMapping("/api/v1/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanApplicationService planApplicationService;

    @PostMapping("/create")
    public ApiResult<Void> createPlan(@RequestBody TotalPlansRequest totalPlansRequest) {
        planApplicationService.createPlan(totalPlansRequest.toTotalPlansServiceRequest());
        return success(null);
    }

    @GetMapping("/total")
    public ApiResult<List<TotalPlanResponse>> getTotalPlans(@CookieValue(value = "accessToken", required = false) String token) {
        List<TotalPlanResponse> totalPlanResponses = planApplicationService.getTotalPlans(token);
        return success(totalPlanResponses);
    }
    

}
