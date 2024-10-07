package com.ssafy.handam.accompanyboard.domain.service;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardArticleRepository;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardArticleDomainService {

    private final AccompanyBoardArticleRepository accompanyBoardArticleRepository;

    public Article createArticle(AccompanyBoardArticleCreationRequest request) {

        return accompanyBoardArticleRepository.save(Article.builder()
                .userId(request.userId())
                .totalPlanId(request.totalPlanId())
                .title(request.title())
                .description(request.description())
                .build());
    }

    public Page<Article> getArticles(Pageable pageable) {
        return accompanyBoardArticleRepository.findAll(pageable);
    }

    public Article getArticleDetails(Long articleId) {

        return accompanyBoardArticleRepository.findById(articleId).orElseThrow(() -> new IllegalArgumentException("Article not found"));
    }

    public Page<Article> getArticlesByUser(Long userId, Pageable pageable) {

        return accompanyBoardArticleRepository.findByUserId(userId, pageable);
    }

    public Page<Article> getArticlesByTitle(String title, Pageable pageable) {

        return accompanyBoardArticleRepository.findByTitleContains(title, pageable);
    }

}
