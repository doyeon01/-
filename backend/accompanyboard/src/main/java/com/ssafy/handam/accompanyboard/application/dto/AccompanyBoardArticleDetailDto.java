package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Getter;

public record AccompanyBoardArticleDetailDto(
        Long id,
        Long userId,
        Long totalPlanId,
        String profileImageUrl,
        String nickName,
        String title,
        String description,
        String createdDate,
        int commentCount) {

    public static AccompanyBoardArticleDetailDto from(Article article, int commentCount, UserDetailDto userDetailDto) {

            String formattedCreatedDate = (article.getCreatedDate() != null) ?
            article.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) :
            "N/A";
        return new AccompanyBoardArticleDetailDto(
                article.getId(),
                article.getUserId(),
                article.getTotalPlanId(),
                userDetailDto.profileImageUrl(),
                userDetailDto.nickName(),
                article.getTitle(),
                article.getDescription(),
                formattedCreatedDate,
                commentCount);
    }
}
