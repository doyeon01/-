package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Comment;
import com.ssafy.handam.feed.infrastructure.jpa.CommentJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepository {

    private final CommentJpaRepository commentJpaRepository;

    @Override
    public Comment save(Comment comment) {
        return commentJpaRepository.save(comment);
    }

    @Override
    public List<Comment> findAllByFeedId() {
        return null;
    }
}
