package com.ssafy.handam.user.application.service;

import com.ssafy.handam.user.application.dto.request.UserSurveyServiceRequest;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.service.UserService;
import com.ssafy.handam.user.infrastructure.jwt.JwtUtil;
import com.ssafy.handam.user.infrastructure.util.CookieUtil;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import com.ssafy.handam.user.presentation.response.UserInfoResponse;
import com.ssafy.handam.user.presentation.response.UserInfoResponseWithFollowInfo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserApplicationService {

    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
    public Long getUserInfoByToken(String token) {
        return jwtUtil.extractUserId(token);
    }
    public UserInfoResponseWithFollowInfo getCurrentUserInfo(HttpServletRequest request) {
        String accessToken = cookieUtil.getJwtFromCookies(request);
        String email = jwtUtil.extractUserEmail(accessToken);
        User user = userService.getCurrentUserByEmail(email);
        int followerCount = userService.countByFollowing(user.getId()).size();
        int followingCount = userService.countByFollower(user.getId()).size();
        return UserInfoResponseWithFollowInfo.of(user,followerCount,followingCount);
    }

    public void updateUserSurvey(HttpServletRequest request, UserSurveyServiceRequest surveyRequest) {
        String accessToken = cookieUtil.getJwtFromCookies(request);
        String email = jwtUtil.extractUserEmail(accessToken);
        userService.updateUserSurvey(email, surveyRequest.toSurveyData(surveyRequest));
    }
    public List<UserInfoResponse> searchUsersByKeyword(String token, String keyword){
        Long userId = jwtUtil.extractUserId(token);
        return userService.searchUsersByKeyword(userId,keyword);

    }
    public UserInfoResponse findUserWithFollowStatus(String token,Long targetUserId) {
        Long userId = jwtUtil.extractUserId(token);
        return userService.findUserWithFollowStatus(userId,targetUserId);
    }
    public void followUser(String token,Long followTargetId){
        Long userId = jwtUtil.extractUserId(token);
        userService.followUser(userId,followTargetId);
    }
    public void unfollowUser(String token,Long followTargetId){
        Long userId = jwtUtil.extractUserId(token);
        userService.unfollowUser(userId,followTargetId);
    }
    public List<UserInfoResponse> getFollowingUsers(String token){
        Long userId = jwtUtil.extractUserId(token);
        return userService.getFollowingUsers(userId);
    }

}
