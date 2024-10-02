package com.ssafy.handam.accompanyboard.presentation.response.article;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import java.util.List;

public record AccompanyBoardArticlesResponse(
        List<AccompanyBoardArticlePreviewDto> articles,
        int currentPage,
        boolean hasNextPage) {
    public static AccompanyBoardArticlesResponse of(
            List<AccompanyBoardArticlePreviewDto> articles,
            int currentPage,
            boolean hasNextPage) {
        return new AccompanyBoardArticlesResponse(
                articles,
                currentPage,
                hasNextPage);
    }
}
