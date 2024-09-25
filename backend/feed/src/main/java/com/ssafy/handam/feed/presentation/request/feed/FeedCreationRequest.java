package com.ssafy.handam.feed.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.domain.PlaceType;
import lombok.Builder;

@Builder
public record FeedCreationRequest(
        String title,
        String content,
        String feedImageUrl,
        String address,
        Double longitude,
        Double latitude,
        PlaceType placeType,
        Long userId
) {
    public static FeedCreationServiceRequest toServiceRequest(FeedCreationRequest request) {
        return FeedCreationServiceRequest.builder()
                .title(request.title())
                .content(request.content())
                .feedImageUrl(request.feedImageUrl())
                .address(request.address())
                .longitude(request.longitude())
                .latitude(request.latitude())
                .placeType(request.placeType())
                .userId(request.userId())
                .build();
    }
}