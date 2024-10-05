package com.ssafy.handam.user.infrastructure.repository;

import com.ssafy.handam.user.domain.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String keyword);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
}
