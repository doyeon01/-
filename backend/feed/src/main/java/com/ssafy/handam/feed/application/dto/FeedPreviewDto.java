package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;
import java.time.LocalDateTime;

public record FeedPreviewDto(
        Long id,
        String title,
        String content,
        String imageUrl,
        Long userId,
        int likeCount,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        String placeType,
        String username,
        String userProfileImageUrl,
        boolean isLiked,
        LocalDateTime createdDate
) {

    public static FeedPreviewDto from(Feed feed, String username, String userProfileImageUrl, boolean isLiked) {
        return new FeedPreviewDto(
                feed.getId(),
                feed.getTitle(),
                feed.getContent(),
                feed.getImageUrl(),
                feed.getUserId(),
                feed.getLikeCount(),
                feed.getAddress1(),
                feed.getAddress2(),
                feed.getLongitude(),
                feed.getLatitude(),
                feed.getPlaceType().name(),
                username,
                userProfileImageUrl,
                isLiked,
                feed.getCreatedDate()
        );
    }
}
