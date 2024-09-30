package com.ssafy.handam.user.domain.repository;

import com.ssafy.handam.user.domain.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNicknameContaining(String keyword);
    boolean existsByEmail(String email);
}
