package com.ssafy.handam.accompanyboard.infrastructure.client;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class UserApiClient {

    private final RestTemplate restTemplate;

//    @Value("http://j11c205.p.ssafy.io:8081")
    private String userServiceUrl;

//    public
}
