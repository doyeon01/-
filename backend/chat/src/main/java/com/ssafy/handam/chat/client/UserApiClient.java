package com.ssafy.handam.chat.client;

import com.ssafy.handam.chat.controller.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserApiClient {

    private final UserServiceClient userServiceClient;

    public UserDto getUserById(Long userId, String accessToken) {
        String cookie = "accessToken=" + accessToken;
        ApiResult<UserDto> apiResult = userServiceClient.getUserById(userId, cookie);

        if (apiResult != null && apiResult.isSuccess()) {
            return apiResult.getResponse();
        } else if (apiResult != null && apiResult.getError() != null) {
            throw new RuntimeException("API 호출 실패: " + apiResult.getError().getMessage());
        } else {
            throw new RuntimeException("API 응답이 null입니다.");
        }
    }

    public UserDto getUserByToken(String accessToken) {
        String cookie = "accessToken=" + accessToken;
        ApiResult<UserDto> apiResult = userServiceClient.getUserByToken(cookie);

        if (apiResult != null && apiResult.isSuccess()) {
            return apiResult.getResponse();
        } else if (apiResult != null && apiResult.getError() != null) {
            throw new RuntimeException("API 호출 실패: " + apiResult.getError().getMessage());
        } else {
            throw new RuntimeException("API 응답이 null입니다.");
        }
    }
}
