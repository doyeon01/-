package com.ssafy.handam.user.presentation;

import static com.ssafy.handam.user.application.common.ApiUtils.success;
import com.ssafy.handam.user.application.common.ApiUtils.ApiResult;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.infrastructure.jwt.JwtUtil;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import com.ssafy.handam.user.presentation.response.UserInfoResponse;
import com.ssafy.handam.user.domain.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final JwtUtil jwtUtil;

    @Valid
    @GetMapping("/myInfo")
    public ApiResult<UserInfoResponse> getCurrentUserInfo(HttpServletRequest request) {

        String accessToken = jwtUtil.getJwtFromCookies(request);

        if (accessToken == null || !jwtUtil.isJwtValid(accessToken)) {
            throw new IllegalStateException("Invalid or missing access token");
        }

        String email = jwtUtil.extractUserEmail(accessToken);

        User user = userService.findUserByEmail(email);

        UserInfoResponse response = UserInfoResponse.of(user);
        return success(response);
    }

    @PostMapping("/survey")
    public ApiResult<Void> submitUserSurvey(HttpServletRequest request, @RequestBody UserSurveyRequest surveyRequest) {
        String accessToken = jwtUtil.getJwtFromCookies(request);

        if (accessToken == null || !jwtUtil.isJwtValid(accessToken)) {
            throw new IllegalStateException("Invalid or missing access token");
        }

        String email = jwtUtil.extractUserEmail(accessToken);

        userService.updateUserSurvey(email, surveyRequest);
        return success(null);
    }

    @Valid
    @GetMapping("/{id}")
    public ApiResult<UserInfoResponse> getUserInfo(@NotNull @PathVariable("id") Long id) {
        User user = userService.findUserById(id);
        UserInfoResponse response = UserInfoResponse.of(user);
        return success(response);
    }

    @GetMapping("/test")
    public void test(){
        System.out.println("통과~");
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
        Long userId = 1L;  // 현재 사용자 id (임시)
        userService.toggleFollow(userId, followTargetId);
        return success(null);
    }
}
