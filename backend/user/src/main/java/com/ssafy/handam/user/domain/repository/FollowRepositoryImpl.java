package com.ssafy.handam.user.domain.repository;

import com.ssafy.handam.user.domain.model.entity.Follow;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.infrastructure.repository.FollowJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class FollowRepositoryImpl implements FollowRepository{
    private final FollowJpaRepository followRepository;
    @Override
    public Optional<Follow> findByFollowerAndFollowing(User follower, User following) {
        return followRepository.findByFollowerAndFollowing(follower, following);
    }

    @Override
    public Follow save(Follow follow) {
        return followRepository.save(follow);
    }
}
