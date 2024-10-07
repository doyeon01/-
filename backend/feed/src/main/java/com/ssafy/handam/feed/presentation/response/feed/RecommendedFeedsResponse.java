package com.ssafy.handam.feed.presentation.response.feed;

public record RecommendedFeedsResponse(
        Long id,
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
        String createdDate
) {
}
