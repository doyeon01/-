package com.ssafy.handam.photocard.presentation.request;

public record PhotoCardSaveRequest(

        Long userId,
        Long totalPlanId,
        String planTitle,
        String photoCardUrl) {

    public static PhotoCardSaveRequest from(

            Long userId,
            Long totalPlanId,
            String planTitle,
            String photoCardUrl) {

        return new PhotoCardSaveRequest(
                userId,
                totalPlanId,
                planTitle,
                photoCardUrl);
    }
}
