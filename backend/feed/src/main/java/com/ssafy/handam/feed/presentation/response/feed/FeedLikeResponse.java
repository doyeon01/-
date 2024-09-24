package com.ssafy.handam.feed.presentation.response.feed;

public record FeedLikeResponse(
        Long userId,
        Long feedId,
        boolean isLiked) {

    FeedLikeResponse of (Long userId, Long feedId, boolean isLiked) {
        return new FeedLikeResponse(userId, feedId, isLiked);
    }
}
