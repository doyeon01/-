package com.ssafy.handam.feed.infrastructure.presentation.response.comment;

import com.ssafy.handam.feed.application.dto.response.comment.CreateCommentServiceResponse;

public record CreateCommentResponse(
        Long userId,
        String content
) {
    public static CreateCommentResponse from(CreateCommentServiceResponse createCommentServiceResponse) {
        return new CreateCommentResponse(
                createCommentServiceResponse.userId(),
                createCommentServiceResponse.content()
        );
    }
}
