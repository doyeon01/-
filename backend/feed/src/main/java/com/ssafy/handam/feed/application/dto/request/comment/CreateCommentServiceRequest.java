package com.ssafy.handam.feed.application.dto.request.comment;

import com.ssafy.handam.feed.infrastructure.presentation.request.comment.CreateCommentRequest;

public record CreateCommentServiceRequest(
        Long feedId,
        Long userId,
        String content
) {
    public static CreateCommentServiceRequest of(Long feedId, CreateCommentRequest createCommentRequest) {
        return new CreateCommentServiceRequest(feedId, createCommentRequest.userId(), createCommentRequest.content());
    }
}
