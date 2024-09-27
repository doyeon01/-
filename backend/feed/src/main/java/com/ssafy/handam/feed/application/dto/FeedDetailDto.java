package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;

public record FeedDetailDto(
        Long id,
        Long userId,
        String title,
        String content,
        String imageUrl,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        String placeType,
        int likeCount,
        boolean isLiked
) {

    public static FeedDetailDto of(Feed feed, boolean isLiked) {
        return new FeedDetailDto(
                feed.getId(),
                feed.getUserId(),
                feed.getTitle(),
                feed.getContent(),
                feed.getImageUrl(),
                feed.getAddress1(),
                feed.getAddress2(),
                feed.getLongitude(),
                feed.getLatitude(),
                feed.getPlaceType().name(),
                feed.getLikeCount(),
                isLiked
        );
    }
}
