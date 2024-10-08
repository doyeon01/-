package com.ssafy.handam.user.domain.repository;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.infrastructure.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {
    private final UserJpaRepository userJpaRepository;

    @Override
    public Optional<User> findById(Long id) {
        return userJpaRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userJpaRepository.save(user);
    }


    @Override
    public List<User> findByNicknameContaining(String keyword) {
        return userJpaRepository.findByNicknameContaining(keyword);
    }

    @Override
    public List<User> findByNameContaining(String keyword) {
        return userJpaRepository.findByNameContaining(keyword);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userJpaRepository.findByEmail(email);
    }
}
