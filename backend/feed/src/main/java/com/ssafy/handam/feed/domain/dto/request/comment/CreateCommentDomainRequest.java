package com.ssafy.handam.feed.domain.dto.request.comment;

import com.ssafy.handam.feed.application.dto.request.comment.CreateCommentServiceRequest;

public record CreateCommentDomainRequest(
        Long feedId,
        Long userId,
        String content
) {
    public static CreateCommentDomainRequest from(CreateCommentServiceRequest createCommentServiceRequest) {
        return new CreateCommentDomainRequest(
                createCommentServiceRequest.feedId(),
                createCommentServiceRequest.userId(),
                createCommentServiceRequest.content());
    }
}
