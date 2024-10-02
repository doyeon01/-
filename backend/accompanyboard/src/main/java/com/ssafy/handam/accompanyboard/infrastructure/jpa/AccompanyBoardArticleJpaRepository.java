package com.ssafy.handam.accompanyboard.infrastructure.jpa;

import com.ssafy.handam.accompanyboard.domain.entity.Article;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccompanyBoardArticleJpaRepository extends JpaRepository <Article, Long>{

    List<Article> findByUserId(Long userId);
    List<Article> findByTitleContains(String title);
}
