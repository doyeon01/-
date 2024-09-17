package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;

public record FeedPreviewDto(Long id, String imageUrl, Long userId, int likeCount) {

    public static FeedPreviewDto from(Feed feed) {
        return new FeedPreviewDto(feed.getId(), feed.getImageUrl(), feed.getUserId(), feed.getLikeCount());
    }
}