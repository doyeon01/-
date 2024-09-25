package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;

public record FeedResponse(
        Long id,
        Long userId,
        String username,
        String userProfileImageUrl,
        String title,
        String content,
        String feedImageUrl,
        String address,
        Double longitude,
        Double latitude,
        String placeType,
        int likeCount
) {
    public static FeedResponse from(Feed feed, UserDto userDto , PlaceType placeType) {
        return new FeedResponse(
                feed.getId(),
                userDto.id(),
                userDto.name(),
                userDto.profileImageUrl(),
                feed.getTitle(),
                feed.getContent(),
                feed.getImageUrl(),
                feed.getAddress(),
                feed.getLongitude(),
                feed.getLatitude(),
                placeType.name(),
                feed.getLikeCount());
    }
}
