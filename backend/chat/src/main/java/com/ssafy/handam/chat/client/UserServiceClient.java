package com.ssafy.handam.chat.client;

import com.ssafy.handam.chat.controller.ApiUtils.ApiResult;
import com.ssafy.handam.chat.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "http://j11c206.p.ssafy.io:8081")
public interface UserServiceClient {

    @GetMapping("/api/v1/user/{id}")
    ApiResult<UserDto> getUserById(
            @PathVariable("id") Long userId,
            @CookieValue("accessToken") String token
    );
}
