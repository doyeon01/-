package com.ssafy.handam.feed.infrastructure.presentation.response.feed;

public record CommentCreateResponse(
        Long id,
        Long userId,
        Long feedId,
        String content
) {
    public static CommentCreateResponse of(Long id, Long userId, Long feedId, String content) {
        return new CommentCreateResponse(id, userId, feedId, content);
    }
}
