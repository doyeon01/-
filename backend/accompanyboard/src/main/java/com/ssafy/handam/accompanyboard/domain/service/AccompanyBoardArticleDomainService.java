package com.ssafy.handam.accompanyboard.domain.service;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardArticleRepository;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardArticleDomainService {

    private final AccompanyBoardArticleRepository accompanyBoardArticleRepository;

    public Article createArticle(AccompanyBoardArticleCreationRequest request) {
        return accompanyBoardArticleRepository.save(Article.builder()
                .userId(request.userId())
                .scheduleId(request.scheduleId())
                .title(request.title())
                .description(request.description())
                .build());
    }

    public List<Article> getArticles() {
        return accompanyBoardArticleRepository.findAll();
    }

    public Article getArticleDetails(Long articleId) {
        return accompanyBoardArticleRepository.findById(articleId).orElseThrow(() -> new IllegalArgumentException("Article not found"));
    }

    public List<Article> getArticlesByUser(Long userId) {
        return accompanyBoardArticleRepository.findByUserId(userId);
    }

    public List<Article> getArticlesByTitle(String title) {
        return accompanyBoardArticleRepository.findByTitleContains(title); }

}
