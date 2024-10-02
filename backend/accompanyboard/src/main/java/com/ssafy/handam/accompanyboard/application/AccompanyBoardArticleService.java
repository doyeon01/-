package com.ssafy.handam.accompanyboard.application;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticleDetailDto;
import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardArticleDomainService;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardCommentDomainService;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByTitleResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByUserResponse;
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
    private final AccompanyBoardCommentDomainService accompanyBoardCommentDomainService;

    public AccompanyBoardArticleDetailResponse createArticle(AccompanyBoardArticleCreationRequest request) {
        Article article = accompanyBoardArticleDomainService.createArticle(request);
        return AccompanyBoardArticleDetailResponse.of(AccompanyBoardArticleDetailDto.of(article, 0));
    }

    public AccompanyBoardArticlesResponse getArticles() {
        List<AccompanyBoardArticlePreviewDto> articles = getAccompanyBoardArticlePreviewDtoList(
                accompanyBoardArticleDomainService.getArticles());
        return AccompanyBoardArticlesResponse.of(articles);
    }

    public AccompanyBoardArticleDetailResponse getArticleDetails(Long articleId) {
        Article article = accompanyBoardArticleDomainService.getArticleDetails(articleId);
        int commentCount = accompanyBoardCommentDomainService.getCommentCountByAccompanyBoardArticleId(articleId);
        return AccompanyBoardArticleDetailResponse.of(AccompanyBoardArticleDetailDto.of(article, commentCount));
    }

    public AccompanyBoardArticlesByUserResponse getArticlesByUser(Long userId) {
        List<AccompanyBoardArticleDetailDto> articles = getAccompanyBoardArticleDetailDtoList(
                accompanyBoardArticleDomainService.getArticlesByUser(userId));
        return AccompanyBoardArticlesByUserResponse.of(articles);
    }

    public AccompanyBoardArticlesByTitleResponse getArticlesByTitle(String title) {
        List<AccompanyBoardArticlePreviewDto> articles = getAccompanyBoardArticlePreviewDtoList(
                accompanyBoardArticleDomainService.getArticlesByTitle(title));
        return AccompanyBoardArticlesByTitleResponse.of(articles);
    }

    private List<AccompanyBoardArticlePreviewDto> getAccompanyBoardArticlePreviewDtoList(List<Article> articles) {
        return articles.stream()
                .map(AccompanyBoardArticlePreviewDto::of)
                .toList();
    }

    private List<AccompanyBoardArticleDetailDto> getAccompanyBoardArticleDetailDtoList(List<Article> articles) {
        return articles.stream()
                .map(article -> {
                    int commentCount = accompanyBoardCommentDomainService.getCommentCountByAccompanyBoardArticleId(article.getId());
                    return AccompanyBoardArticleDetailDto.of(article, commentCount);
                })
                .toList();
    }
}
