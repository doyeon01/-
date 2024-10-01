package com.ssafy.handam.user.domain.service;

import com.ssafy.handam.user.domain.model.entity.Follow;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.FollowStatus;
import com.ssafy.handam.user.domain.model.valueobject.OAuthUserInfo;
import com.ssafy.handam.user.domain.repository.UserRepository;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import com.ssafy.handam.user.presentation.response.UserInfoResponse;
import com.ssafy.handam.user.infrastructure.repository.FollowRepository;
import com.ssafy.handam.user.infrastructure.repository.UserJpaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public void handleUserLogin(OAuthUserInfo oAuthUserInfo) {
        String email = oAuthUserInfo.email();
        if (doesUserNotExist(email)) {
            saveUser(oAuthUserInfo);
        }
    }

    private boolean doesUserNotExist(String email) {
        return !userRepository.existsByEmail(email);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found with email: " + email));
    }
    public void updateUserSurvey(String email, UserSurveyRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        user.updateUser(
                request.nickname(),
                request.residence(),
                request.introduction(),
                request.travelStyl1(),
                request.travelStyl2(),
                request.travelStyl3(),
                request.travelStyl4()
        );

        userRepository.save(user); // 변경된 내용 저장
    }

    public void saveUser(OAuthUserInfo oAuthUserInfo) {
        User user = User.builder()
                .email((oAuthUserInfo.email()))
                .name(oAuthUserInfo.name())
                .gender(oAuthUserInfo.gender())
                .age(oAuthUserInfo.age())
                .profileImage(oAuthUserInfo.profileImage())
                .build();

        userRepository.save(user);
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
