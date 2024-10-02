package com.ssafy.handam.plan.presentation.api;

import com.ssafy.handam.plan.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.plan.application.dto.PlanServiceRequest;
import com.ssafy.handam.plan.presentation.response.PlanResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.handam.plan.application.common.ApiUtils.success;

@RestController
@RequestMapping("/api/v1/plan")
@RequiredArgsConstructor
public class PlanController {
    @PostMapping("/")
    public ApiResult<Void> getPlan(HttpServletRequest request,@RequestBody List<PlanServiceRequest> planServiceRequests) {
        return success(null);
    }
}
