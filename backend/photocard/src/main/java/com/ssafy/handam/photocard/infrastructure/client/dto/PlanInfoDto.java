package com.ssafy.handam.photocard.infrastructure.client.dto;

public record PlanInfoDto(
        Long id,
        String startDate,
        String endDate,
        String title,
        String address,
        String thumbNailImageUrl) {

    public static PlanInfoDto from(
            Long id,
            String startDate,
            String endDate,
            String title,
            String address,
            String thumbNailImageUrl) {

        return new PlanInfoDto(
                id,
                startDate,
                endDate,
                title,
                address,
                thumbNailImageUrl
        );
    }
}
