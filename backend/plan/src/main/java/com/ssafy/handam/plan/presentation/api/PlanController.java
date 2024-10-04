package com.ssafy.handam.plan.presentation.api;

import com.ssafy.handam.plan.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.plan.application.service.PlanApplicationService;
import com.ssafy.handam.plan.presentation.request.totalplan.TotalPlansRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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
}
