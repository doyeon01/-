package com.ssafy.handam.accompanyboard.infrastructure.jpa;

import com.ssafy.handam.accompanyboard.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccompanyBoardCommentJpaRepository extends JpaRepository <Comment, Long> {
}
