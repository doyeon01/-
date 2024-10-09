package com.ssafy.handam.photocard.presentation.request;

import java.util.List;

public record PhotoCardCreationToGpuRequest(
        Long userId,
        Long feedId,
        String feedImageUrl,
        Long totalPlanId) {

    public static PhotoCardCreationToGpuRequest from(
            Long userId,
            Long feedId,
            String feedImageUrl,
            Long totalPlanId) {

        return new PhotoCardCreationToGpuRequest(
                userId,
                feedId,
                feedImageUrl,
                totalPlanId
        );
    }
}
