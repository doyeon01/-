package com.ssafy.handam.user.presentation;

import static com.ssafy.handam.user.application.common.ApiUtils.success;

import com.ssafy.handam.user.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.user.domain.model.valueobject.response.UserInitSettingResponse;
import com.ssafy.handam.user.presentation.request.UserInitSettingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/users/{id}")
    public ApiResult<UserInitSettingResponse> getUserInfo(@PathVariable("id") Long id) {
        // 하드코딩된 요청 데이터를 사용하여 UserInitSettingRequest 생성
        UserInitSettingRequest request = UserInitSettingRequest.defaultRequest();
        request.setId(id);

        // 요청 데이터를 사용하여 응답 생성
        UserInitSettingResponse response = UserInitSettingResponse.of(request.getId());

        // 성공적인 응답 반환
        return success(response);
    }
}
