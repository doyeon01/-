package com.ssafy.handam.accompanyboard.application;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticleDetailDto;
import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import com.ssafy.handam.accompanyboard.application.dto.UserDetailDto;
import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardArticleDomainService;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardCommentDomainService;
import com.ssafy.handam.accompanyboard.infrastructure.client.UserApiClient;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByTitleResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByUserResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardArticleService {

    private final int INIT_COMMENT_COUNT = 0;
    private final AccompanyBoardArticleDomainService accompanyBoardArticleDomainService;
    private final AccompanyBoardCommentDomainService accompanyBoardCommentDomainService;
    private final UserApiClient userApiClient;

    public AccompanyBoardArticleDetailResponse createArticle(AccompanyBoardArticleCreationRequest request) {
        Article article = accompanyBoardArticleDomainService.createArticle(request);
        UserDetailDto userDetailDto = getUserDetailDto(article.getUserId());
        return AccompanyBoardArticleDetailResponse.of(AccompanyBoardArticleDetailDto.from(article, INIT_COMMENT_COUNT, userDetailDto));
    }

    public AccompanyBoardArticlesResponse getArticles(Pageable pageable) {

        Page<Article> page = accompanyBoardArticleDomainService.getArticles(pageable);
        List<AccompanyBoardArticlePreviewDto> articles = getAccompanyBoardArticlePreviewDtoList(page.getContent());
        return AccompanyBoardArticlesResponse.of(articles, page.getNumber(), page.hasNext());
    }

    public AccompanyBoardArticleDetailResponse getArticleDetails(Long articleId) {
        Article article = accompanyBoardArticleDomainService.getArticleDetails(articleId);
        int commentCount = accompanyBoardCommentDomainService.getCommentCountByAccompanyBoardArticleId(articleId);
        UserDetailDto userDetailDto = getUserDetailDto(article.getUserId());
        return AccompanyBoardArticleDetailResponse.of(AccompanyBoardArticleDetailDto.from(article, commentCount, userDetailDto));
    }

    public AccompanyBoardArticlesByUserResponse getArticlesByUser(Long userId, Pageable pageable) {

        Page<Article> page = accompanyBoardArticleDomainService.getArticlesByUser(userId, pageable);
        List<AccompanyBoardArticleDetailDto> articles = getAccompanyBoardArticleDetailDtoList(page.getContent());
        return AccompanyBoardArticlesByUserResponse.of(articles, page.getNumber(), page.hasNext());
    }

    public AccompanyBoardArticlesByTitleResponse getArticlesByTitle(String title, Pageable pageable) {

        Page<Article> page = accompanyBoardArticleDomainService.getArticlesByTitle(title, pageable);
        List<AccompanyBoardArticlePreviewDto> articles = getAccompanyBoardArticlePreviewDtoList(page.getContent());
        return AccompanyBoardArticlesByTitleResponse.of(articles, page.getNumber(), page.hasNext());
    }

    private List<AccompanyBoardArticlePreviewDto> getAccompanyBoardArticlePreviewDtoList(List<Article> articles) {

        return articles.stream()
                .map(article -> {
                    UserDetailDto userDetailDto = getUserDetailDto(article.getUserId());
                    return AccompanyBoardArticlePreviewDto.from(article, userDetailDto);
                })
                .toList();
    }

    private List<AccompanyBoardArticleDetailDto> getAccompanyBoardArticleDetailDtoList(List<Article> articles) {
        return articles.stream()
                .map(article -> {
                    int commentCount = accompanyBoardCommentDomainService.getCommentCountByAccompanyBoardArticleId(article.getId());
                    UserDetailDto userDetailDto = getUserDetailDto(article.getUserId());
                    return AccompanyBoardArticleDetailDto.from(article, commentCount, userDetailDto);
                })
                .toList();
    }

    private UserDetailDto getUserDetailDto(Long userId) {
        return UserDetailDto.from(userApiClient.getUserById(userId));
    }
}
