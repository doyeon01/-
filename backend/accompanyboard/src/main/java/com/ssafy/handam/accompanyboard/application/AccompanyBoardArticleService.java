package com.ssafy.handam.accompanyboard.application;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticleDetailDto;
import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardArticleDomainService;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesResponse;
import jakarta.transaction.Transactional;
import java.util.List;
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

    public AccompanyBoardArticlesResponse getArticles() {
        List<AccompanyBoardArticlePreviewDto> articles = getAccompanyBoardArticlePreviewDtoList(
                accompanyBoardArticleDomainService.getArticles());
        return AccompanyBoardArticlesResponse.of(articles);
    }

    private List<AccompanyBoardArticlePreviewDto> getAccompanyBoardArticlePreviewDtoList(List<Article> articles) {
        return articles.stream()
                .map(AccompanyBoardArticlePreviewDto::of)
                .toList();
    }
}
