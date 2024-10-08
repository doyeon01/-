package com.ssafy.handam.user.presentation.api;

import static com.ssafy.handam.user.presentation.api.ApiUtils.success;

import com.ssafy.handam.user.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.user.application.service.UserApplicationService;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import com.ssafy.handam.user.presentation.response.UserInfoResponse;
import com.ssafy.handam.user.domain.service.UserService;
import com.ssafy.handam.user.presentation.response.UserInfoResponseWithFollowInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserApplicationService userApplicationService;
    private final UserService userService;

    @GetMapping("/myInfo")
    public ApiResult<UserInfoResponseWithFollowInfo> getCurrentUserInfo(HttpServletRequest request) {
        UserInfoResponseWithFollowInfo userInfoResponseWithFollowInfo = userApplicationService.getCurrentUserInfo(request);
        log.info("userInfoResponse: {}", userInfoResponseWithFollowInfo.toString());
        return success(userInfoResponseWithFollowInfo);
    }

    @PostMapping("/survey")
    public ApiResult<Void> submitUserSurvey(HttpServletRequest request, @RequestBody UserSurveyRequest surveyRequest) {
        userApplicationService.updateUserSurvey(request, surveyRequest.toServiceRequest(surveyRequest));
        return success(null);
    }

    @Valid
    @GetMapping("/follow-status/{targetId}")
    public ApiResult<UserInfoResponse> getUserInfoAndFollowStatus(@CookieValue(value = "accessToken", required = false) String token,
                                                                  @PathVariable("targetId") Long targetId) {
        UserInfoResponse userInfoResponse = userApplicationService.findUserWithFollowStatus(token,targetId);
        return success(userInfoResponse);
    }

    @GetMapping("/{id}")
    public ApiResult<UserInfoResponse> getUserInfo(@PathVariable("id") Long id) {
        UserInfoResponse userInfoResponse = userService.findUserById(id);
        return success(userInfoResponse);
    }
    @GetMapping("/info")
    public ApiResult<UserInfoResponse> getUserInfoByToken(@CookieValue(value = "accessToken", required = false) String token) {
        Long userId = userApplicationService.getUserInfoByToken(token);
        UserInfoResponse userInfoResponse = userService.findUserById(userId);
        return success(userInfoResponse);
    }


    @GetMapping("/test")
    public void test(){
        System.out.println("통과~");
    }

    @GetMapping("/search")
    public ApiResult<List<UserInfoResponse>> searchUsersByKeyword(@CookieValue(value = "accessToken", required = false) String token, @RequestParam("keyword") String keyword) {
        List<UserInfoResponse> userInfoResponses = userApplicationService.searchUsersByKeyword(token,keyword);
        return success(userInfoResponses);
    }
    @PostMapping("/follow/{followTargetId}")
    public ApiResult<Void> followUser(@CookieValue(value = "accessToken", required = false) String token, @PathVariable Long followTargetId) {
        userApplicationService.followUser(token,followTargetId);
        return success(null);
    }
    @PostMapping("/unfollow/{followTargetId}")
    public ApiResult<Void> unfollowUser(@CookieValue(value = "accessToken", required = false) String token, @PathVariable Long followTargetId) {
        userApplicationService.unfollowUser(token,followTargetId);
        return success(null);
    }
    @GetMapping("/following-users")
    public ApiResult<List<UserInfoResponse>> getFollowingUsers(@CookieValue(value = "accessToken", required = false) String token) {
        List<UserInfoResponse> userInfoResponses = userApplicationService.getFollowingUsers(token);
        return success(userInfoResponses);
    }
}
