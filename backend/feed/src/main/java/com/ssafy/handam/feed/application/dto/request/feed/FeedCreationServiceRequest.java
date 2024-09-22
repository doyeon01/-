package com.ssafy.handam.feed.application.dto.request.feed;


import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.valueobject.Address;
import lombok.Builder;

@Builder
public record FeedCreationServiceRequest(
        String title,
        String content,
        String feedImageUrl,
        Address address,
        PlaceType placeType,
        Long userId
) {
}
