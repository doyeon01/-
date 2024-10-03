package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.domain.entity.Comment;

public record AccompanyBoardCommentDto(
        Long id,
        Long userId,
        Long accompanyBoardArticleId,
        String name,
        String profileImageUrl,
        String content
) {

    public static AccompanyBoardCommentDto from(Comment comment, UserDetailDto userDetailDto) {
        return new AccompanyBoardCommentDto(
                comment.getId(),
                comment.getUserId(),
                comment.getAccompanyBoardArticleId(),
                userDetailDto.name(),
                userDetailDto.profileImageUrl(),
                comment.getContent()
        );
    }
}
