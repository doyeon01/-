package com.ssafy.handam.photocard.presentation.response;

import com.ssafy.handam.photocard.application.dto.PhotoCardDetailDto;

public record PhotoCardDetailResponse(

        Long id,
        Long userId,
        Long totalPlanId,
        String planTitle,
        String photoCardUrl,
        String createdDate) {

    public static PhotoCardDetailResponse of(PhotoCardDetailDto photoCardDetailDto) {

        return new PhotoCardDetailResponse(
                photoCardDetailDto.id(),
                photoCardDetailDto.userId(),
                photoCardDetailDto.totalPlanId(),
                photoCardDetailDto.planTitle(),
                photoCardDetailDto.photoCardUrl(),
                photoCardDetailDto.createdDate()
        );
    }
}
