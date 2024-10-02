package com.ssafy.handam.accompanyboard.presentation.response.article;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticleDetailDto;
import java.util.List;

public record AccompanyBoardArticlesByUserResponse(
        List<AccompanyBoardArticleDetailDto> articles,
        int currentPage,
        boolean hasNextPage) {
    public static AccompanyBoardArticlesByUserResponse of(
            List<AccompanyBoardArticleDetailDto> articles,
            int currentPage,
            boolean hasNextPage) {
        return new AccompanyBoardArticlesByUserResponse(
                articles,
                currentPage,
                hasNextPage);
    }
}
