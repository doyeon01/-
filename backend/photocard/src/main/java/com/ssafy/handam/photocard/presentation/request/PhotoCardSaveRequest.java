package com.ssafy.handam.photocard.presentation.request;

public record PhotoCardSaveRequest(

        Long userId,
        Long feedId,
        String photoCardUrl) {

    public static PhotoCardSaveRequest of(

            Long userId,
            Long feedId,
            String photoCardUrl
    ) {

        return new PhotoCardSaveRequest(
                userId,
                feedId,
                photoCardUrl);
    }
}
