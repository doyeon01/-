package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.time.format.DateTimeFormatter;

public record AccompanyBoardArticlePreviewDto(
        Long id,
        Long userId,
        Long scheduleId,
        String title,
        String createdDate) {

    public static AccompanyBoardArticlePreviewDto of(Article article) {

            String formattedCreatedDate = (article.getCreatedDate() != null) ?
            article.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) :
            "N/A";
        return new AccompanyBoardArticlePreviewDto(
                article.getId(),
                article.getUserId(),
                article.getScheduleId(),
                article.getTitle(),
                formattedCreatedDate);
    }

}
