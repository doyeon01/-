package com.ssafy.handam.feed.domain.repository;

import com.ssafy.handam.feed.domain.entity.Comment;
import java.util.List;

public interface CommentRepository {

    Comment save(Comment comment);

    List<Comment> findAllByFeedId(Long feedId);
}
