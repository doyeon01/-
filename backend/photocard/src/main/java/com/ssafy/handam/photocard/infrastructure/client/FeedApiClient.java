package com.ssafy.handam.photocard.infrastructure.client;

import com.ssafy.handam.photocard.infrastructure.client.dto.FeedListDto;
import com.ssafy.handam.photocard.presentation.api.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class FeedApiClient {

    private final RestTemplate restTemplate;

    @Value("${feed.service.url}")
    private String feedSericeUrl;

    public ApiResult<FeedListDto> getFeedsByTotalPlanId(Long totalPlanId) {

        ResponseEntity<ApiResult<FeedListDto>> response = restTemplate.exchange(
                feedSericeUrl + "/feeds/search/images/" + totalPlanId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<ApiResult<FeedListDto>>() {}
        );
        return response.getBody();
    }
}
