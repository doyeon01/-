package com.ssafy.handam.accompanyboard.presentation.response.article;

import lombok.Builder;

@Builder
public record AccompanyBoardArticleDetailResponse(
        Long id,
        Long userId,
        Long scheduleId,
        String title,
        String description
) {

    public static AccompanyBoardArticleDetailResponseBuilder of(

    )
}
