package com.ssafy.handam.photocard.presentation.request;

public record PhotoCardCreationRequest(

        Long userId,
        Long feedId,
        String thumbnailUrl) {

    public static PhotoCardCreationRequest toServiceRequest(PhotoCardCreationRequest request) {

        return new PhotoCardCreationRequest(request.userId().longValue(), request.feedId().longValue(), request.thumbnailUrl());
    }
}
