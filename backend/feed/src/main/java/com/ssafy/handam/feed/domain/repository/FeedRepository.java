package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.infrastructure.jpa.FeedJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FeedRepository {

    private final FeedJpaRepository feedJpaRepository;

}