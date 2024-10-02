package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Getter;

public record AccompanyBoardArticleDetailDto(
        Long id,
        Long userId,
        Long scheduleId,
        String title,
        String description,
        String createdDate,
        int commentCount) {

    public static AccompanyBoardArticleDetailDto of(Article article, int commentCount) {

            String formattedCreatedDate = (article.getCreatedDate() != null) ?
            article.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) :
            "N/A";
        return new AccompanyBoardArticleDetailDto(
                article.getId(),
                article.getUserId(),
                article.getScheduleId(),
                article.getTitle(),
                article.getDescription(),
                formattedCreatedDate,
                commentCount);
    }
}
