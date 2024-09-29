package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Article;

public record AccompanyBoardArticlePreviewDto(
        Long id,
        Long userId,
        Long scheduleId,
        String title
) {

    public static AccompanyBoardArticlePreviewDto of(Article article) {
        return new AccompanyBoardArticlePreviewDto(
                article.getId(),
                article.getUserId(),
                article.getScheduleId(),
                article.getTitle()
        );
    }

}
