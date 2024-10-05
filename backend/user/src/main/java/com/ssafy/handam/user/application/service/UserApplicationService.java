package com.ssafy.handam.user.application.service;

import com.ssafy.handam.user.application.dto.request.UserSurveyServiceRequest;
import com.ssafy.handam.user.domain.service.UserService;
import com.ssafy.handam.user.infrastructure.jwt.JwtUtil;
import com.ssafy.handam.user.infrastructure.util.CookieUtil;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import com.ssafy.handam.user.presentation.response.UserInfoResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserApplicationService {

    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public UserInfoResponse getCurrentUserInfo(HttpServletRequest request) {
        String accessToken = cookieUtil.getJwtFromCookies(request);
        String email = jwtUtil.extractUserEmail(accessToken);
        return UserInfoResponse.of(userService.getCurrentUserByEmail(email));
    }

    public void updateUserSurvey(HttpServletRequest request, UserSurveyServiceRequest surveyRequest) {
        String accessToken = cookieUtil.getJwtFromCookies(request);
        String email = jwtUtil.extractUserEmail(accessToken);
        userService.updateUserSurvey(email, surveyRequest.toSurveyData(surveyRequest));
    }
    public void followUser(String token,Long followTargetId){
        Long userId = jwtUtil.extractUserId(token);
        userService.followUser(userId,followTargetId);
    }
    public void unfollowUser(String token,Long followTargetId){
        Long userId = jwtUtil.extractUserId(token);
        userService.unfollowUser(userId,followTargetId);
    }

}
