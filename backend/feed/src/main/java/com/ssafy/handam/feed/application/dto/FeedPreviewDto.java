package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;

public record FeedPreviewDto(
        Long id,
        String title,
        String imageUrl,
        Long userId,
        int likeCount,
        String address,
        Double longitude,
        Double latitude,
        String username,
        String userProfileImageUrl
) {

    public static FeedPreviewDto from(Feed feed, String username, String userProfileImageUrl) {
        return new FeedPreviewDto(
                feed.getId(),
                feed.getTitle(),
                feed.getImageUrl(),
                feed.getUserId(),
                feed.getLikeCount(),
                feed.getAddress(),
                feed.getLongitude(),
                feed.getLatitude(),
                username,
                userProfileImageUrl);
    }
}
