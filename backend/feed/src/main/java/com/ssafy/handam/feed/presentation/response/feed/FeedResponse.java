package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.valueobject.Address;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;

public record FeedResponse(
        Long id,
        String title,
        String content,
        String feedImageUrl,
        String address,
        Double longitude,
        Double latitude,
        String placeType,
        Long userId
) {
    public static FeedResponse from(Feed feed, Address address, UserDto userDto , PlaceType placeType) {
        return new FeedResponse(
                feed.getId(),
                feed.getTitle(),
                feed.getContent(),
                feed.getImageUrl(),
                address.getAddress(),
                address.getLongitude(),
                address.getLatitude(),
                placeType.name(),
                userDto.id());
    }
}
