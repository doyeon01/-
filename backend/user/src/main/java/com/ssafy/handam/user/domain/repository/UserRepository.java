package com.ssafy.handam.user.domain.repository;

import com.ssafy.handam.user.domain.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findById(Long id);
    User save(User user);
    List<User> findByNicknameContaining(String keyword);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
