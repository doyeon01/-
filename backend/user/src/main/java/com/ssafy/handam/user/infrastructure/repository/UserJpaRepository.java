package com.ssafy.handam.user.infrastructure.repository;

import com.ssafy.handam.user.domain.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String keyword);

    @Query("SELECT DISTINCT u FROM User u WHERE u.nickname IS NOT NULL AND u.nickname LIKE CONCAT('%', :keyword, '%')")
    List<User> findByNicknameContaining(@Param("keyword") String keyword);
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
}
