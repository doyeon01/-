package com.ssafy.handam.accompanyboard.domain.repository;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.infrastructure.jpa.AccompanyBoardArticleJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccompanyBoardArticleRepositoryImpl implements AccompanyBoardArticleRepository {

    private final AccompanyBoardArticleJpaRepository accompanyBoardArticleJpaRepository;

    @Override
    public Article save(Article article) {
        Article savedArticle = accompanyBoardArticleJpaRepository.save(article);
        return savedArticle;
    }
}
