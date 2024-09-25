package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.LikeDto;

public record FeedLikeResponse(
        Long userId,
        Long feedId,
        boolean isLiked,
        int likeCount
) {

    public static FeedLikeResponse of(LikeDto likeDto, boolean isLiked, int likeCount) {
        return new FeedLikeResponse(likeDto.userId(), likeDto.feedId(), isLiked, likeCount);
    }
}
