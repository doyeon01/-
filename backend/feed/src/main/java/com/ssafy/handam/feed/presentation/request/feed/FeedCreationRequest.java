package com.ssafy.handam.feed.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.domain.PlaceType;
import lombok.Builder;

@Builder
public record FeedCreationRequest(
        Long scheduleId,
        String title,
        String content,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        PlaceType placeType,
        Long userId
) {
    public static FeedCreationServiceRequest toServiceRequest(FeedCreationRequest request) {
        return FeedCreationServiceRequest.builder()
                .scheduleId(request.scheduleId())
                .title(request.title())
                .content(request.content())
                .address1(request.address1())
                .address2(request.address2())
                .longitude(request.longitude())
                .latitude(request.latitude())
                .placeType(request.placeType())
                .userId(request.userId())
                .build();
    }
}