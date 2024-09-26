package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Like;

public record LikeDto(Long userId, Long feedId) {

    public static LikeDto of(Like like ) {
        return new LikeDto(like.getUserId(), like.getFeed().getId() );
    }
}
