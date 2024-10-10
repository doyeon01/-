package com.ssafy.handam.photocard.presentation.request;

public record PhotoCardSaveRequest(

        Long userId,
        Long feedId,
        Long totalPlanId,
        String planTitle,
        String photoCardUrl) {

    public static PhotoCardSaveRequest from(

            Long userId,
            Long feedId,
            Long totalPlanId,
            String planTitle,
            String photoCardUrl) {

        return new PhotoCardSaveRequest(
                userId,
                feedId,
                totalPlanId,
                planTitle,
                photoCardUrl);
    }
}
