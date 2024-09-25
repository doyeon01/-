package com.ssafy.handam.feed.infrastructure.client;

import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class UserApiClient {

    private final RestTemplate restTemplate;

    @Value("${user.service.url}")
    private String userServiceUrl;

    public UserDto getUserById(Long userId){
        return restTemplate.getForObject(userServiceUrl + "/user/" + userId, UserDto.class);
    }
}
