package com.ssafy.handam.feed.domain.dto.response.comment;

import com.ssafy.handam.feed.domain.entity.Comment;

public record CreateCommentDomainResponse(
        Long commentId,
        Long feedId,
        Long userId,
        String content
) {
    public static CreateCommentDomainResponse from(Comment comment) {
        return new CreateCommentDomainResponse(
                comment.getId(),
                comment.getFeedId(),
                comment.getUserId(),
                comment.getContent());
    }
}
