package com.ssafy.handam.accompanyboard.domain.repository;

import com.ssafy.handam.accompanyboard.domain.entity.Comment;
import com.ssafy.handam.accompanyboard.infrastructure.jpa.AccompanyBoardCommentJpaRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccompanyBoardCommentRepositoryImpl implements AccompanyBoardCommentRepository{

    private final AccompanyBoardCommentJpaRepository accompanyBoardCommentJpaRepository;

    @Override
    public Optional<Comment> findById(Long id) {
        return accompanyBoardCommentJpaRepository.findById(id);
    }

    @Override
    public Comment save(Comment comment) {

        Comment savedComment = accompanyBoardCommentJpaRepository.save(comment);
        return savedComment;
    }

//    @Override
//    public List<Comment> findAll() { return accompanyBoardCommentJpaRepository.findAll(); }
}
