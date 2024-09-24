package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.domain.PlaceType;
import lombok.Builder;

@Builder
public record FeedDetailResponse(
        Long id,
        Long userId,
        String username,
        String profileImageUrl,
        String feedImageUrl,
        String title,
        String content,
        Double longitude,
        Double latitude,
        PlaceType placeType,
        int likeCount
) {

    public static FeedDetailResponse of(
            Long id,
            Long userId,
            String username,
            String profileImageUrl,
            String feedImageUrl,
            String title,
            String content,
            Double longitude,
            Double latitude,
            PlaceType placeType,
            int likeCount
    ) {
        return FeedDetailResponse.builder()
                .id(id)
                .userId(userId)
                .username(username)
                .profileImageUrl(profileImageUrl)
                .feedImageUrl(feedImageUrl)
                .title(title)
                .content(content)
                .longitude(longitude)
                .latitude(latitude)
                .placeType(placeType)
                .likeCount(likeCount)
                .build();
    }
}
