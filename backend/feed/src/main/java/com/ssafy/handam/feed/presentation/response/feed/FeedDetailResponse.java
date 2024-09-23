package com.ssafy.handam.feed.presentation.response.feed;

import com.ssafy.handam.feed.domain.PlaceType;

public record FeedDetailResponse(Long id,
                                 String imageUrl,
                                 Long userId,
                                 int likeCount,
                                 String nickname,
                                 String profileImageUrl,
                                 String placeName,
                                 String placeAddress,
                                 Double latitude,
                                 Double longitude,
                                 PlaceType placeType
                                 ) {

    public static FeedDetailResponse of(Long id,
                                        String imageUrl,
                                        Long userId,
                                        int likeCount,
                                        String nickname,
                                        String profileImageUrl,
                                        String placeName,
                                        String placeAddress,
                                        Double latitude,
                                        Double longitude,
                                        PlaceType placeType) {
        return new FeedDetailResponse(id, imageUrl, userId, likeCount, nickname, profileImageUrl, placeName, placeAddress, latitude, longitude, placeType);
    }
}
