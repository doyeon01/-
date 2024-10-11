package com.ssafy.handam.accompanyboard.infrastructure.jpa;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccompanyBoardArticleJpaRepository extends JpaRepository <Article, Long>{

    Page<Article> findByUserId(Long userId, Pageable pageable);
    Page<Article> findByTitleContains(String title, Pageable pageable);
}
