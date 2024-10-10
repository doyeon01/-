package com.ssafy.handam.feed.application.dto.request.feed;


import com.ssafy.handam.feed.domain.PlaceType;
import lombok.Builder;

@Builder
public record FeedCreationServiceRequest(
        Long totalPlanId,
        String placeName,
        String title,
        String content,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        PlaceType placeType,
        Long userId
) {
}
