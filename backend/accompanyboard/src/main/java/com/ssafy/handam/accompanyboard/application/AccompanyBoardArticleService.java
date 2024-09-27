package com.ssafy.handam.accompanyboard.application;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticleDetailDto;
import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardArticleDomainService;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardArticleService {

    private final AccompanyBoardArticleDomainService accompanyBoardArticleDomainService;

    public AccompanyBoardArticleDetailResponse createArticle(AccompanyBoardArticleCreationRequest request) {
        Article article = accompanyBoardArticleDomainService.createArticle(request);
        return AccompanyBoardArticleDetailResponse.of(AccompanyBoardArticleDetailDto.of(article));
    }
}
