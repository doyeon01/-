package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccompanyBoardArticleDetailDto {
    private Long id;
    private Long userId;
    private Long scheduleId;
    private String title;
    private String description;

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
