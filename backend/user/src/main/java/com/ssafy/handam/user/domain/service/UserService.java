package com.ssafy.handam.user.domain.service;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.response.UserInfoResponse;
import com.ssafy.handam.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다. ID: " + id));
    }
    public UserInfoResponse getUserInfo(Long id) {
        User user = findUserById(id); // User ID로 사용자를 찾음
        return UserInfoResponse.of(user); // UserInfoResponse로 변환하여 반환
    }
}
