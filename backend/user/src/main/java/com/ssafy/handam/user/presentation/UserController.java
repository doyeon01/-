package com.ssafy.handam.user.presentation;

import static com.ssafy.handam.user.application.common.ApiUtils.success;

import com.ssafy.handam.user.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;
import com.ssafy.handam.user.domain.model.valueobject.response.UserInfoResponse;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    @PostMapping("/{id}/survey")
    public ApiResult<Void> submitUserSurvey(@PathVariable("id") Long id, @RequestBody UserSurveyRequest request) {

        return success(null);
    }

    @Valid
    @GetMapping("/{id}")
    public ApiResult<UserInfoResponse> getUserInfo(@NotNull @PathVariable("id") Long id) {
        User user = User.builder()
                .id(id)
                .username("고도연")
                .birth("2000.01.09")
                .gender(Gender.FEMALE)
                .residence("싸피")
                .introduction("안녕하세요 개발자 입니다.")
                .accompanyTemperature(36.5)
                .build();
        UserInfoResponse response = UserInfoResponse.of(user);
        return success(response);
    }
}
