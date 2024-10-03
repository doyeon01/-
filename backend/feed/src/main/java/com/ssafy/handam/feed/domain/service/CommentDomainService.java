package com.ssafy.handam.feed.domain.service;

import com.ssafy.handam.feed.application.dto.response.comment.CreateCommentServiceResponse;
import com.ssafy.handam.feed.domain.dto.request.comment.CreateCommentDomainRequest;
import com.ssafy.handam.feed.domain.dto.response.comment.CreateCommentDomainResponse;
import com.ssafy.handam.feed.domain.entity.Comment;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.repository.CommentRepository;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentDomainService {

    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;

    public CreateCommentServiceResponse save(CreateCommentDomainRequest request) {
        Comment saved = commentRepository.save(Comment.create(request));
        Long feedId = request.feedId();
        Feed feed = feedRepository.findById(feedId).orElseThrow(IllegalArgumentException::new);
        feed.incrementCommentCount();
        feedRepository.save(feed);
        return CreateCommentServiceResponse.from(CreateCommentDomainResponse.from(saved));
    }
}
