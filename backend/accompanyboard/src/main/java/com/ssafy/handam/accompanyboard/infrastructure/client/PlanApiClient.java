package com.ssafy.handam.accompanyboard.infrastructure.client;

import com.ssafy.handam.accompanyboard.infrastructure.client.dto.PlanInfoDto;
import com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PlanApiClient {

    private final RestTemplate restTemplate;

    @Value("${plan.service.url}")
    private String planServiceUrl;

    public ApiResult<PlanInfoDto> getTotalPlan(Long totalPlanId) {

        ResponseEntity<ApiResult<PlanInfoDto>> response = restTemplate.exchange(
            planServiceUrl + "/plans/" + totalPlanId,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<ApiResult<PlanInfoDto>>() {}
        );
        return response.getBody();
    }
}
