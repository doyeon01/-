package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;
import java.time.format.DateTimeFormatter;

public record FeedPreviewDto(
        Long id,
        Long scheduleId,
        String placeName,
        String title,
        String content,
        String imageUrl,
        Long userId,
        int likeCount,
        int commentCount,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        String placeType,
        String nickName,
        String profileImageUrl,
        boolean isLiked,
        String createdDate
) {

    public static FeedPreviewDto from(Feed feed, String nickName, String profileImageUrl, boolean isLiked) {
        String formattedCreatedDate = (feed.getCreatedDate() != null) ?
                feed.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) :
                "N/A";
        return new FeedPreviewDto(
                feed.getId(),
                feed.getTotalPlanId(),
                feed.getPlaceName(),
                feed.getTitle(),
                feed.getContent(),
                feed.getImageUrl(),
                feed.getUserId(),
                feed.getLikeCount(),
                feed.getCommentCount(),
                feed.getAddress1(),
                feed.getAddress2(),
                feed.getLongitude(),
                feed.getLatitude(),
                feed.getPlaceType().name(),
                nickName,
                profileImageUrl,
                isLiked,
                formattedCreatedDate
        );
    }
}
