package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FeedDetailDto {
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private String imageUrl;
    private String address; // 추가된 필드
    private Double longitude;
    private Double latitude;
    private String placeType;
    private int likeCount;

    public static FeedDetailDto of(Feed feed) {
        return new FeedDetailDto(
            feed.getId(),
            feed.getUserId(),
            feed.getTitle(),
            feed.getContent(),
            feed.getImageUrl(),
            feed.getAddress(), // 추가된 부분
            feed.getLongitude(),
            feed.getLatitude(),
            feed.getPlaceType().name(),
            feed.getLikeCount()
        );
    }
}
