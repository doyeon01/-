package com.ssafy.handam.photocard.presentation.request;

public record PhotoCardSaveRequest(

        Long userId,
        Long totalPlanId,
        String photoCardUrl,
        String caption) {

    public static PhotoCardSaveRequest of(

            Long userId,
            Long totalPlanId,
            String photoCardUrl,
            String caption
    ) {

        return new PhotoCardSaveRequest(
                userId,
                totalPlanId,
                photoCardUrl,
                caption);
    }
}
