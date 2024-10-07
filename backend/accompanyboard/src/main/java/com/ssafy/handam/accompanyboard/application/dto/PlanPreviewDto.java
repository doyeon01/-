package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.infrastructure.client.dto.PlanInfoDto;

public record PlanPreviewDto(
        String address,
        String planImageUrl) {

    public static PlanPreviewDto from(PlanInfoDto planInfoDto) {

        return new PlanPreviewDto(
                planInfoDto.address(),
                planInfoDto.thumbNailImageUrl()
        );
    }
}
