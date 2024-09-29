package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Comment;

public record AccompanyBoardCommentDto(
        Long id,
        Long userId,
        Long accompanyBoardArticleId,
        String content
) {

    public static AccompanyBoardCommentDto of(Comment comment) {
        return new AccompanyBoardCommentDto(
                comment.getId(),
                comment.getUserId(),
                comment.getAccompanyBoardArticleId(),
                comment.getContent()
        );
    }
}
