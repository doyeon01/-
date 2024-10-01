package com.ssafy.handam.accompanyboard.domain.repository;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.util.List;
import java.util.Optional;

public interface AccompanyBoardArticleRepository {

    Optional<Article> findById(Long id);
    Article save(Article article);
    List<Article> findAll();
    List<Article> findByUserId(Long userId);
}
