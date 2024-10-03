package com.ssafy.handam.feed.infrastructure.presentation.response.feed;

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
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        String placeType,
        int likeCount
) {
    public static FeedResponse from(Feed feed, UserDto userDto) {
        return new FeedResponse(
                feed.getId(),
                userDto.id(),
                userDto.name(),
                userDto.profileImage(),
                feed.getTitle(),
                feed.getContent(),
                feed.getImageUrl(),
                feed.getAddress1(),
                feed.getAddress2(),
                feed.getLongitude(),
                feed.getLatitude(),
                feed.getPlaceType().name(),
                feed.getLikeCount());
    }
}
