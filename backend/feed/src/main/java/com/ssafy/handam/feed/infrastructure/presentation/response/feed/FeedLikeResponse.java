package com.ssafy.handam.feed.infrastructure.presentation.response.feed;

public record FeedLikeResponse(
        Long feedId,
        boolean isLiked,
        int likeCount
) {

    public static FeedLikeResponse of(long feedId, boolean isLiked, int likeCount) {
        return new FeedLikeResponse(feedId, isLiked, likeCount);
    }
}