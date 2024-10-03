package com.ssafy.handam.feed.infrastructure.presentation.response.feed;

import com.ssafy.handam.feed.application.dto.CommentDto;
import java.util.List;

public record CommentsResponse(List<CommentDto> comments) {

    public static CommentsResponse of(List<CommentDto> comments) {
        return new CommentsResponse(comments);
    }
}
