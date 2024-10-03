package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Feed;
import java.time.format.DateTimeFormatter;

public record FeedDetailDto(
        Long id,
        Long scheduleId,
        String placeName,
        Long userId,
        String title,
        String content,
        String imageUrl,
        String address1,
        String address2,
        Double longitude,
        Double latitude,
        String placeType,
        String createdDate,
        int likeCount,
        int commentCount,
        boolean isLiked
) {

    public static FeedDetailDto of(Feed feed, boolean isLiked) {
        String formattedCreatedDate = (feed.getCreatedDate() != null) ?
                feed.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) :
                "N/A";
        return new FeedDetailDto(
                feed.getId(),
                feed.getScheduleId(),
                feed.getPlaceName(),
                feed.getUserId(),
                feed.getTitle(),
                feed.getContent(),
                feed.getImageUrl(),
                feed.getAddress1(),
                feed.getAddress2(),
                feed.getLongitude(),
                feed.getLatitude(),
                feed.getPlaceType().name(),
                formattedCreatedDate,
                feed.getLikeCount(),
                feed.getCommentCount(),
                isLiked
        );
    }
}
