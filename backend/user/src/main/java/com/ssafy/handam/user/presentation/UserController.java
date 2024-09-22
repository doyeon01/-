package com.ssafy.handam.user.presentation;

import static com.ssafy.handam.user.application.common.ApiUtils.success;
import com.ssafy.handam.user.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.response.UserInfoResponse;
import com.ssafy.handam.user.domain.service.UserService;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


// 제발 변경사항 인식해라!!!
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/{id}/survey")
    public ApiResult<Void> submitUserSurvey(@PathVariable("id") Long id, @RequestBody UserSurveyRequest request) {

        return success(null);
    }

    @Valid
    @GetMapping("/{id}")
    public ApiResult<UserInfoResponse> getUserInfo(@NotNull @PathVariable("id") Long id) {

        User user = userService.findUserById(id);
        UserInfoResponse response = UserInfoResponse.of(user);
        return success(response);
    }

    @GetMapping("/search")
    public ApiResult<List<UserInfoResponse>> searchUsers(@RequestParam("keyword") String keyword) {
        List<User> users = userService.searchUsersByKeyword(keyword);

        List<UserInfoResponse> response = users.stream()
                .map(UserInfoResponse::of)
                .collect(Collectors.toList());
        return success(response);
    }
    @PostMapping("/toggle-follow/{followTargetId}")
    public ApiResult<Void> toggleFollow(@PathVariable Long followTargetId) {
        Long userId = 2L;  // 현재 사용자 id (임시)
        userService.toggleFollow(userId, followTargetId);
        return success(null);
    }
}
