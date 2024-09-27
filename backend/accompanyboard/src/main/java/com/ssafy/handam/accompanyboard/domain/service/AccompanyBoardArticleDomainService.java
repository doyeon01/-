package com.ssafy.handam.accompanyboard.domain.service;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardArticleRepository;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import jakarta.transaction.Transactional;
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

}
