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
    private String address;
    private Double longitude;
    private Double latitude;
    private String placeType;
    private int likeCount;
    private boolean isLiked;

    public static FeedDetailDto of(Feed feed, boolean isLiked) {
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
                feed.getLikeCount(),
                isLiked
        );
    }
}
