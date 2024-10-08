package com.ssafy.handam.photocard.presentation.request;

import java.util.List;

public record PhotoCardCreationToGpuRequest(
        Long userId,
        Long totalPlanId,
        List<String> feedImageUrls) {

    public static PhotoCardCreationToGpuRequest from(
            Long userId,
            Long totalPlanId,
            List<String> feedImageUrls) {

        return new PhotoCardCreationToGpuRequest(
                userId,
                totalPlanId,
                feedImageUrls
        );
    }
}
