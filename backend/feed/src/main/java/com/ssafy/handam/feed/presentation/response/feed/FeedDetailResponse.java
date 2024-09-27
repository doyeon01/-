package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.FeedDetailDto;
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
        String address,
        Double longitude,
        Double latitude,
        String placeType,
        int likeCount,
        boolean isLiked
) {

    public static FeedDetailResponse of(
            FeedDetailDto feedDetailDto, String username, String profileImageUrl) {

        return FeedDetailResponse.builder()
                .id(feedDetailDto.getId())
                .userId(feedDetailDto.getUserId())
                .username(username)
                .profileImageUrl(profileImageUrl)
                .feedImageUrl(feedDetailDto.getImageUrl())
                .title(feedDetailDto.getTitle())
                .content(feedDetailDto.getContent())
                .address(feedDetailDto.getAddress())
                .longitude(feedDetailDto.getLongitude())
                .latitude(feedDetailDto.getLatitude())
                .placeType(feedDetailDto.getPlaceType())
                .likeCount(feedDetailDto.getLikeCount())
                .isLiked(feedDetailDto.isLiked())
                .build();
    }
}
