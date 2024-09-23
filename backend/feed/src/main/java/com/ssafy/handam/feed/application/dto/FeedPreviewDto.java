package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.valueobject.Address;

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

    public static FeedPreviewDto from(Feed feed, Address address, String username, String userProfileImageUrl) {
        return new FeedPreviewDto(
                feed.getId(),
                feed.getTitle(),
                feed.getImageUrl(),
                feed.getUserId(),
                feed.getLikeCount(),
                address.getAddress(),
                address.getLongitude(),
                address.getLatitude(),
                username,
                userProfileImageUrl);
    }
}
