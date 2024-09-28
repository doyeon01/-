package com.ssafy.handam.user.domain.service;

import com.ssafy.handam.user.domain.model.entity.Follow;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.FollowStatus;
import com.ssafy.handam.user.domain.model.valueobject.response.UserInfoResponse;
import com.ssafy.handam.user.domain.repository.FollowRepository;
import com.ssafy.handam.user.domain.repository.UserRepository;
import com.ssafy.handam.user.infrastructure.jwt.JwtUtil;
import com.ssafy.handam.user.presentation.request.OAuthUserLoginRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final JwtUtil jwtUtil;


    public String generateToken(OAuthUserLoginRequest loginRequest) {
        return jwtUtil.generateToken(loginRequest);
    }

    public ResponseCookie createCookie(String token) {
        return ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(3600)  // 1시간 유효
                .sameSite("Strict")
                .build();
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다. ID: " + id));
    }
    public UserInfoResponse getUserInfo(Long id) {
        User user = findUserById(id);
        return UserInfoResponse.of(user);
    }
    public List<User> searchUsersByKeyword(String keyword) {
        return userRepository.findByNicknameContaining(keyword);
    }

    @Transactional
    public void toggleFollow(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 하는 사용자를 찾을 수 없습니다."));
        User following = userRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 대상 사용자를 찾을 수 없습니다."));

        Follow follow = followRepository.findByFollowerAndFollowing(follower, following)
                .orElseGet(() -> new Follow(follower, following, FollowStatus.ACTIVE));

        follow.toggleStatus();

        followRepository.save(follow);
    }
}
