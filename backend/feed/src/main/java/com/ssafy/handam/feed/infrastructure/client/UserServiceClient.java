package com.ssafy.handam.feed.infrastructure.client;

import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.presentation.api.ApiUtils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-service", url = "${user.service.url}")
public interface UserServiceClient {

    @GetMapping("/api/v1/users/{id}")
    ApiResult<UserDto> getUserById(
            @PathVariable("id") Long userId,
            @RequestHeader("Cookie") String cookie
    );
    @GetMapping("/api/v1/users/info")
    ApiResult<UserDto> getUserByToken(
            @RequestHeader("Cookie") String cookie
    );
}gi
