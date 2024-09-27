package com.ssafy.handam.accompanyboard.domain.repository;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.util.Optional;

public interface AccompanyBoardArticleRepository {

    Optional<Article> findById(Long id);
    Article save(Article article);
}
