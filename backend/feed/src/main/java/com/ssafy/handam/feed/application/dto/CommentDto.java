package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.domain.entity.Comment;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import java.time.LocalDateTime;

public record CommentDto(
        Long id,
        Long userId,
        Long feedId,
        String content,
        String username,
        String userProfileImageUrl,
        LocalDateTime createdDate
) {
    public static CommentDto of(Comment comment , UserDto userDetailDto) {
        return new CommentDto(
                comment.getId(),
                comment.getUserId(),
                comment.getFeedId(),
                comment.getContent(),
                userDetailDto.name(),
                userDetailDto.profileImageUrl(),
                comment.getCreatedDate()
        );
    }
}
