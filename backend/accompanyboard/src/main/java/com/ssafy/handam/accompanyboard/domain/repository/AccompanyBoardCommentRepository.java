package com.ssafy.handam.accompanyboard.domain.repository;

import com.ssafy.handam.accompanyboard.domain.entity.Comment;
import java.util.List;
import java.util.Optional;

public interface AccompanyBoardCommentRepository{

    Optional<Comment> findById(Long id);
    Comment save(Comment comment);

//    List<Comment> findAll();
}
