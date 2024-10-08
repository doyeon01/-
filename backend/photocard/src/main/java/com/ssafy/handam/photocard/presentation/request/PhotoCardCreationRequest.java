package com.ssafy.handam.photocard.presentation.request;

public record PhotoCardCreationRequest(

        Long userId,
        Long totalPlanId) {

    public static PhotoCardCreationRequest toServiceRequest(PhotoCardCreationRequest request) {

        return new PhotoCardCreationRequest(request.userId().longValue(), request.totalPlanId().longValue());
    }
}
