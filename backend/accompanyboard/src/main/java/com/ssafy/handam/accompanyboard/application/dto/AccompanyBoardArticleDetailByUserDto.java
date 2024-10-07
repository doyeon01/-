package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.time.format.DateTimeFormatter;

public record AccompanyBoardArticleDetailByUserDto(
        Long id,
        Long userId,
        Long totalPlanId,
        String title,
        String description,
        String createdDate,
        int commentCount,
        String address,
        String planImageUrl) {

    public static AccompanyBoardArticleDetailByUserDto from(
            Article article,
            int commentCount,
            PlanPreviewDto planPreviewDto) {

            String formattedCreatedDate = (article.getCreatedDate() != null) ?
            article.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) :
            "N/A";

            String address = planPreviewDto.address().split(" ")[0];

        return new AccompanyBoardArticleDetailByUserDto(
                article.getId(),
                article.getUserId(),
                article.getTotalPlanId(),
                article.getTitle(),
                article.getDescription(),
                formattedCreatedDate,
                commentCount,
                address,
                planPreviewDto.planImageUrl()
        );
    }
}
