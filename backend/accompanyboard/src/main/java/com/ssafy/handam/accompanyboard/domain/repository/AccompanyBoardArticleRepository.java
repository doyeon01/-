package com.ssafy.handam.accompanyboard.domain.repository;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AccompanyBoardArticleRepository {

    Optional<Article> findById(Long id);
    Article save(Article article);
    Page<Article> findAll(Pageable pageable);
    Page<Article> findByUserId(Long userId, Pageable pageable);
    Page<Article> findByTitleContains(String title, Pageable pageable);
}
