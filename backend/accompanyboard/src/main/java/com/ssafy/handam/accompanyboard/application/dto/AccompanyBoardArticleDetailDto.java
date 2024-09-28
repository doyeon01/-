package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

public record AccompanyBoardArticleDetailDto(
        Long id,
        Long userId,
        Long scheduleId,
        String title,
        String description
) {

    public static AccompanyBoardArticleDetailDto of(Article article) {
        return new AccompanyBoardArticleDetailDto(
            article.getId(),
            article.getUserId(),
            article.getScheduleId(),
            article.getTitle(),
            article.getDescription()
        );
    }
}
