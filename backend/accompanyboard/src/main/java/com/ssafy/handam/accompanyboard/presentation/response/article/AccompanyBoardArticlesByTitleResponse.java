package com.ssafy.handam.accompanyboard.presentation.response.article;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import java.util.List;

public record AccompanyBoardArticlesByTitleResponse(List<AccompanyBoardArticlePreviewDto> articles) {
    public static AccompanyBoardArticlesByTitleResponse of(List<AccompanyBoardArticlePreviewDto> articles) {
        return new AccompanyBoardArticlesByTitleResponse(articles);
    }
}
