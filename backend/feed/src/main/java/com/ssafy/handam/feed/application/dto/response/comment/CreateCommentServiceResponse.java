package com.ssafy.handam.feed.application.dto.response.comment;

import com.ssafy.handam.feed.domain.dto.response.comment.CreateCommentDomainResponse;

public record CreateCommentServiceResponse(
        Long userId,
        String content
) {
    public static CreateCommentServiceResponse from(CreateCommentDomainResponse createCommentDomainResponse) {
        return new CreateCommentServiceResponse(
                createCommentDomainResponse.userId(),
                createCommentDomainResponse.content());
    }
}