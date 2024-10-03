package com.ssafy.handam.accompanyboard.domain.repository;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import com.ssafy.handam.accompanyboard.infrastructure.jpa.AccompanyBoardArticleJpaRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccompanyBoardArticleRepositoryImpl implements AccompanyBoardArticleRepository {

    private final AccompanyBoardArticleJpaRepository accompanyBoardArticleJpaRepository;

    @Override
    public Optional<Article> findById(Long id) {
        return accompanyBoardArticleJpaRepository.findById(id);
    }

    @Override
    public Article save(Article article) { return accompanyBoardArticleJpaRepository.save(article); }

    @Override
    public Page<Article> findAll(Pageable pageable) {
        return accompanyBoardArticleJpaRepository.findAll(pageable);
    }

    @Override
    public Page<Article> findByUserId(Long userId, Pageable pageable) {
        return accompanyBoardArticleJpaRepository.findByUserId(userId, pageable);
    }

    @Override
    public Page<Article> findByTitleContains(String title, Pageable pageable) {
        return accompanyBoardArticleJpaRepository.findByTitleContains(title, pageable);
    }
}
